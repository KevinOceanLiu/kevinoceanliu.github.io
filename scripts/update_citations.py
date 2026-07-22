#!/usr/bin/env python3

import json
import os
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


REPO_ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = REPO_ROOT / "data" / "citations.json"
SCHOLAR_USER_ID = os.environ.get("SCHOLAR_USER_ID", "Pup0q0gAAAAJ")
SCHOLAR_URL = f"https://scholar.google.com/citations?user={SCHOLAR_USER_ID}&hl=en"
MAX_ATTEMPTS = 3
RETRY_DELAY_SECONDS = 8


class CitationFetchError(RuntimeError):
    """Raised when Google Scholar does not return a verifiable profile page."""


def fetch_html(url: str) -> str:
    request = Request(
        url,
        headers={
            "User-Agent": (
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/124.0 Safari/537.36"
            ),
            "Accept-Language": "en-US,en;q=0.9",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
    )
    with urlopen(request, timeout=30) as response:
        return response.read().decode("utf-8", errors="ignore")


def parse_citations(html: str) -> int:
    blocked_markers = (
        "Our systems have detected unusual traffic",
        "not a robot",
        "captcha",
        "sorry/index",
    )
    if any(marker.lower() in html.lower() for marker in blocked_markers):
        raise CitationFetchError("Google Scholar returned a bot-protection page.")

    if SCHOLAR_USER_ID not in html:
        raise CitationFetchError("Google Scholar response did not contain the expected profile.")

    match = re.search(
        r"<a[^>]*>\s*Citations\s*</a>\s*</td>\s*"
        r"<td[^>]*class=[\"'][^\"']*\bgsc_rsb_std\b[^\"']*[\"'][^>]*>"
        r"\s*([\d,]+)\s*</td>",
        html,
        flags=re.IGNORECASE | re.DOTALL,
    )
    if match:
        return int(match.group(1).replace(",", ""))

    raise CitationFetchError("Could not find the total Citations row on the Google Scholar profile.")


def save_data(citations: int) -> None:
    payload = {
        "citations": citations,
        "updated_at": datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC"),
        "source": "Google Scholar",
        "source_url": SCHOLAR_URL,
        "scholar_user_id": SCHOLAR_USER_ID,
    }
    DATA_PATH.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")


def main() -> int:
    last_error = None

    for attempt in range(1, MAX_ATTEMPTS + 1):
        try:
            html = fetch_html(SCHOLAR_URL)
            citations = parse_citations(html)
            save_data(citations)
            print(f"Verified Google Scholar citation count: {citations}")
            return 0
        except (CitationFetchError, HTTPError, URLError, TimeoutError, ValueError) as error:
            last_error = error
            if attempt < MAX_ATTEMPTS:
                delay = RETRY_DELAY_SECONDS * attempt
                print(
                    f"Citation check attempt {attempt}/{MAX_ATTEMPTS} failed: {error}. "
                    f"Retrying in {delay} seconds...",
                    file=sys.stderr,
                )
                time.sleep(delay)

    print(
        f"Failed to verify Google Scholar after {MAX_ATTEMPTS} attempts: {last_error}",
        file=sys.stderr,
    )
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
