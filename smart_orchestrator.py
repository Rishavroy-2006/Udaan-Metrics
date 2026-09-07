import os
import subprocess
import random
import time
from datetime import datetime, timezone, timedelta

IST = timezone(timedelta(hours=5, minutes=30))

# -----------------------------------------------------------------------
# Carrier → scraper path mapping (add new carriers here only)
# -----------------------------------------------------------------------
SCRAPERS = {
    "6E": {
        "name":   "IndiGo",
        "prefix": "indigo_raw",
        "script": "indigo/indigo_scraper_uc.py",
    },
    "AI": {
        "name":   "Air India",
        "prefix": "air_india_raw",
        "script": "air_india/air_india_scraper.py",
    },
    "SG": {
        "name":   "SpiceJet",
        "prefix": "spicejet_raw",
        "script": "spicejet/spicejet_scraper.py",
    },
    "QP": {
        "name":   "Akasa Air",
        "prefix": "akasa_raw",
        "script": "akasa/akasa_scraper.py",
    },
    "MMT": {
        "name":   "MakeMyTrip",
        "prefix": "makemytrip_raw",
        "script": "makemytrip/makemytrip_scraper.py",
    },
    "GO": {
        "name":   "Goibibo",
        "prefix": "goibibo_raw",
        "script": "goibibo/goibibo_scraper.py",
    },
}

REQUIRED_WINDOWS = {1, 7, 15, 30, 45}

# Inter-scraper cooling period in seconds (jitter applied on top)
INTER_SCRAPER_COOLDOWN = 60


def get_missing_targets(prefix: str, today_str: str) -> dict:
    """Return a dict mapping advance-purchase-day (int) -> list of missing routes."""
    raw_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                           "udaan_data", "raw", today_str)
    
    # Initialize all as missing
    missing = {w: ["DEL-BOM", "DEL-BLR", "BOM-BLR", "DEL-CCU", "BLR-HYD", "MAA-DEL"] for w in REQUIRED_WINDOWS}

    if not os.path.exists(raw_dir):
        return missing

    import pandas as pd
    import glob

    files = glob.glob(os.path.join(raw_dir, f"{prefix}_*.csv"))
    if not files:
        return missing
        
    found_routes = {w: set() for w in REQUIRED_WINDOWS}
    
    for fname in files:
        try:
            df = pd.read_csv(fname)
            if all(col in df.columns for col in ['advance_purchase_days', 'origin', 'destination', 'status']):
                df = df[~df['status'].isin(['error', 'parse_error'])]
                df['route'] = df['origin'] + "-" + df['destination']
                
                for window in REQUIRED_WINDOWS:
                    if window in df['advance_purchase_days'].values:
                        routes = df[df['advance_purchase_days'] == window]['route'].unique()
                        found_routes[window].update(routes)
        except Exception:
            pass
            
    # Remove found routes from missing
    for w in REQUIRED_WINDOWS:
        missing[w] = [r for r in missing[w] if r not in found_routes[w]]
        if not missing[w]:
            del missing[w]
            
    return missing


import json

def run_scraper(script: str, missing_targets: dict) -> bool:
    """
    Invoke a scraper for the given missing routes using --targets.
    Returns True on success, False on error.
    """
    if not missing_targets:
        return True

    windows_str = ",".join(str(w) for w in sorted(missing_targets.keys()))
    targets_json = json.dumps(missing_targets)
    
    base = os.path.dirname(os.path.abspath(__file__))

    print(f"\n{'='*62}")
    print(f"  🚀  {script}  →  windows: {windows_str}")
    print(f"{'='*62}")

    # Try xvfb-run first (CI / Linux); fall back for macOS dev machines
    for cmd in (
        ["xvfb-run", "--auto-servernum", "python3", script, "--targets", targets_json],
        ["python3", script, "--targets", targets_json],
    ):
        try:
            subprocess.run(cmd, cwd=base, check=True)
            
            # Post-run verification: did it actually produce usable quotes?
            import glob, pandas as pd
            today_str = datetime.now(IST).strftime("%Y-%m-%d")
            raw_dir = os.path.join(base, "udaan_data", "raw", today_str)
            
            prefix = ""
            for k, v in SCRAPERS.items():
                if v["script"] == script:
                    prefix = v["prefix"]
                    break
                    
            if prefix and os.path.exists(raw_dir):
                files = glob.glob(os.path.join(raw_dir, f"{prefix}_*.csv"))
                if files:
                    latest_file = max(files, key=os.path.getmtime)
                    try:
                        df = pd.read_csv(latest_file)
                        if len(df[df['status'] == 'ok']) == 0:
                            print(f"  ❌  {script} produced 0 usable quotes! Marking as FAILED.")
                            return False
                    except Exception:
                        pass
                        
            return True
            
        except FileNotFoundError:
            if cmd[0] == "xvfb-run":
                print("  xvfb-run not found — running without virtual display (macOS mode).")
                continue
            print(f"  ❌  Script not found: {script}")
            return False
        except subprocess.CalledProcessError as e:
            print(f"  ❌  {script} exited with code {e.returncode}")
            return False

    return False

def main():
    now = datetime.now(IST)
    today_str = now.strftime("%Y-%m-%d")

    print(f"\n{'='*62}")
    print(f"  Udaan Metrics Smart Orchestrator  —  {now.strftime('%Y-%m-%d %H:%M IST')}")
    print(f"{'='*62}")
    print(f"  Required windows: T+{', T+'.join(str(w) for w in sorted(REQUIRED_WINDOWS))}")

    # ---------------------------------------------------------------
    # 1. Audit what is already on disk for today
    # ---------------------------------------------------------------
    status = {}
    all_done = True
    for code, cfg in SCRAPERS.items():
        missing_targets = get_missing_targets(cfg["prefix"], today_str)
        completed = REQUIRED_WINDOWS - set(missing_targets.keys())
        status[code] = {"completed": completed, "missing_targets": missing_targets}
        
        print(f"\n  [{cfg['name']:12s} ({code})]  "
              f"done={sorted(completed) or '—'}   "
              f"missing={sorted(missing_targets.keys()) or '—'}")
        if missing_targets:
            all_done = False

    if all_done:
        print("\n  ✅  All data already collected for today. Nothing to do.")
        return

    # ---------------------------------------------------------------
    # 2. Run scrapers in fixed order with inter-scraper cooldowns.
    #    Longest scrapers (IndiGo, Air India) run first so the most
    #    critical T+1/T+7 data lands earliest.
    # ---------------------------------------------------------------
    RUN_ORDER = ["6E", "AI", "SG", "QP", "MMT", "GO"]
    results   = {}

    for i, code in enumerate(RUN_ORDER):
        cfg     = SCRAPERS[code]
        missing_targets = status[code]["missing_targets"]

        if not missing_targets:
            print(f"\n  ⏭   {cfg['name']} — already complete, skipping.")
            results[code] = True
            continue

        ok = run_scraper(cfg["script"], missing_targets)
        results[code] = ok

        # Cooldown between scrapers (skip after the last active one)
        remaining_with_work = [c for c in RUN_ORDER[i+1:] if status[c]["missing_targets"]]
        if remaining_with_work:
            jitter = random.uniform(-10, 10)
            wait   = max(30, INTER_SCRAPER_COOLDOWN + jitter)
            print(f"\n  ⏳  Cooling off {wait:.0f}s before next airline...")
            time.sleep(wait)

    # ---------------------------------------------------------------
    # 3. Final summary
    # ---------------------------------------------------------------
    print(f"\n{'='*62}")
    print("  ORCHESTRATOR SUMMARY")
    print(f"{'='*62}")
    for code in RUN_ORDER:
        cfg  = SCRAPERS[code]
        miss = status[code]["missing_targets"]
        if not miss:
            print(f"  ✅  {cfg['name']:12s} — was already complete")
        elif results.get(code):
            print(f"  ✅  {cfg['name']:12s} — scraped T+{sorted(miss.keys())} successfully")
        else:
            print(f"  ❌  {cfg['name']:12s} — FAILED for T+{sorted(miss.keys())}")
            
    print(f"\n{'='*62}")
    print("  TRIGGERING INDEX COMPUTATION & DATA PIPELINES")
    print(f"{'='*62}")
    try:
        print("Running legacy CSV index generator (compute_daily_index.py)...")
        subprocess.run(["python3", "compute_daily_index.py", "--date", today_str], check=True)
    except Exception as e:
        print(f"  ❌  Failed to trigger compute_daily_index.py: {e}")
        
    try:
        print("\nRunning master parquet analytics pipeline (core/run_pipeline.py)...")
        env = os.environ.copy()
        env["PYTHONPATH"] = "."
        subprocess.run(["python3", "core/run_pipeline.py"], env=env, check=True)
    except Exception as e:
        print(f"  ❌  Failed to trigger core/run_pipeline.py: {e}")
        
    print()


if __name__ == "__main__":
    main()
