#!/usr/bin/env python3

import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


REPO_ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = REPO_ROOT / "data" / "citations.json"
SCHOLAR_USER_ID = os.environ.get("SCHOLAR_USER_ID", "Pup0q0gAAAAJ")
SCHOLAR_URL = f"https://scholar.google.com/citations?user={SCHOLAR_USER_ID}&hl=en"


def fetch_html(url: str) -> str:
    request = Request(
        url,
        headers={
            "User-Agent": (
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/124.0 Safari/537.36"
            )
        },
    )
    with urlopen(request, timeout=30) as response:
        return response.read().decode("utf-8", errors="ignore")


def parse_citations(html: str) -> int:
    match = re.search(
        r"Citations</a></td><td class=\"gsc_rsb_std\">(\d+)</td>",
        html,
    )
    if match:
        return int(match.group(1))

    values = re.findall(r'class="gsc_rsb_std">(\d+)</td>', html)
    if values:
        return int(values[0])

    raise ValueError("Could not parse Google Scholar citation count.")


def load_existing() -> dict:
    if not DATA_PATH.exists():
        return {}
    return json.loads(DATA_PATH.read_text(encoding="utf-8"))


def save_data(citations: int) -> None:
    payload = {
        "citations": citations,
        "updated_at": datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC"),
        "source": "Google Scholar",
        "scholar_user_id": SCHOLAR_USER_ID,
    }
    DATA_PATH.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")


def main() -> int:
    try:
        html = fetch_html(SCHOLAR_URL)
        citations = parse_citations(html)
        save_data(citations)
        print(f"Updated citation count: {citations}")
        return 0
    except (HTTPError, URLError, TimeoutError, ValueError) as error:
        existing = load_existing()
        if existing:
            print(f"Keeping existing citation count due to fetch error: {error}")
            return 0
        print(f"Failed to update citation count: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
