#!/usr/bin/env python3

import json
import os
import re
import sys
from datetime import datetime, timezone
from html import unescape
from html.parser import HTMLParser
from pathlib import Path
from typing import Dict, Iterable, List
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urlencode
from urllib.request import Request, urlopen


REPO_ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = REPO_ROOT / "data" / "earthfront_updates.json"
RANGE_START = "2026-03-01"
CROSSREF_API = "https://api.crossref.org/journals/{issn}/works"
USER_AGENT = os.environ.get(
    "EARTHFRONT_USER_AGENT",
    "LiuHaiyangEarthFrontMonitor/1.0 (mailto:haiyang.liu.q6@elms.hokudai.ac.jp)",
)
MAX_LANDING_FETCHES = int(os.environ.get("EARTHFRONT_MAX_ENRICH", "20"))
OPENALEX_BATCH_SIZE = int(os.environ.get("EARTHFRONT_OPENALEX_BATCH", "40"))

JOURNALS = [
    {
        "id": "one-earth",
        "name": "One Earth",
        "short_name": "One Earth",
        "issns": ["2590-3322"],
    },
    {
        "id": "pnas",
        "name": "Proceedings of the National Academy of Sciences",
        "short_name": "PNAS",
        "issns": ["1091-6490", "0027-8424"],
    },
    {
        "id": "nature-geoscience",
        "name": "Nature Geoscience",
        "short_name": "Nature Geoscience",
        "issns": ["1752-0908", "1752-0894"],
    },
    {
        "id": "nature-climate-change",
        "name": "Nature Climate Change",
        "short_name": "Nature Climate Change",
        "issns": ["1758-6798", "1758-678X"],
    },
]


class HeadMetadataParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.meta: Dict[str, List[str]] = {}
        self.ld_json_blocks: List[str] = []
        self._capture_json = False
        self._json_chunks: List[str] = []

    def handle_starttag(self, tag: str, attrs: List[tuple]) -> None:
        attrs_dict = {key.lower(): value for key, value in attrs if value is not None}
        if tag.lower() == "meta":
            key = (attrs_dict.get("name") or attrs_dict.get("property") or "").lower()
            content = attrs_dict.get("content")
            if key and content:
                self.meta.setdefault(key, []).append(content)
        if tag.lower() == "script" and attrs_dict.get("type", "").lower() == "application/ld+json":
            self._capture_json = True
            self._json_chunks = []

    def handle_data(self, data: str) -> None:
        if self._capture_json:
            self._json_chunks.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() == "script" and self._capture_json:
            joined = "".join(self._json_chunks).strip()
            if joined:
                self.ld_json_blocks.append(joined)
            self._capture_json = False
            self._json_chunks = []


def fetch_text(url: str) -> str:
    request = Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept": "application/json,text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
        },
    )
    with urlopen(request, timeout=30) as response:
        return response.read().decode("utf-8", errors="ignore")


def fetch_json(url: str) -> dict:
    return json.loads(fetch_text(url))


def normalize_text(value: str) -> str:
    return re.sub(r"\s+", " ", unescape(value or "")).strip()


def strip_tags(value: str) -> str:
    no_tags = re.sub(r"<[^>]+>", " ", value or "")
    return normalize_text(no_tags)


def clean_abstract(value: str) -> str:
    if not value:
        return ""
    value = re.sub(r"</?(jats:)?(p|title|sec|bold|italic|sup|sub|sc|xref)[^>]*>", " ", value)
    return strip_tags(value)


def date_parts_to_display(parts: List[int]) -> str:
    if not parts:
        return "Unknown date"
    if len(parts) >= 3:
        return f"{parts[0]:04d}-{parts[1]:02d}-{parts[2]:02d}"
    if len(parts) == 2:
        return f"{parts[0]:04d}-{parts[1]:02d}"
    return f"{parts[0]:04d}"


def date_parts_to_sort_key(parts: List[int]) -> str:
    year = parts[0] if len(parts) >= 1 else 1900
    month = parts[1] if len(parts) >= 2 else 1
    day = parts[2] if len(parts) >= 3 else 1
    return f"{year:04d}-{month:02d}-{day:02d}"


def extract_date_parts(item: dict) -> List[int]:
    for key in ("published-online", "published-print", "published", "issued", "created", "indexed"):
        value = item.get(key)
        if not value:
            continue
        if "date-parts" in value and value["date-parts"]:
            return value["date-parts"][0]
    return []


def split_keywords(raw_values: Iterable[str]) -> List[str]:
    seen = set()
    keywords = []
    for raw in raw_values:
        for part in re.split(r"[;,|]", raw):
            cleaned = normalize_text(part)
            if cleaned and cleaned.lower() not in seen:
                seen.add(cleaned.lower())
                keywords.append(cleaned)
    return keywords


def extract_keywords_from_item(item: dict) -> List[str]:
    keywords = []
    for field in ("subject", "keyword"):
        value = item.get(field)
        if isinstance(value, list):
            keywords.extend(value)
        elif isinstance(value, str):
            keywords.append(value)
    return split_keywords(keywords)


def extract_primary_link(item: dict) -> str:
    resource = item.get("resource", {})
    primary = resource.get("primary", {})
    if primary.get("URL"):
        return primary["URL"]
    if item.get("URL"):
        return item["URL"]
    doi = item.get("DOI")
    return f"https://doi.org/{doi}" if doi else ""


def parse_ld_json(parser: HeadMetadataParser) -> dict:
    for block in parser.ld_json_blocks:
        try:
            parsed = json.loads(block)
        except json.JSONDecodeError:
            continue
        candidates = parsed if isinstance(parsed, list) else [parsed]
        for candidate in candidates:
            if isinstance(candidate, dict):
                return candidate
    return {}


def enrich_from_landing_page(url: str) -> dict:
    try:
        html = fetch_text(url)
    except (HTTPError, URLError, TimeoutError, ValueError):
        return {}

    parser = HeadMetadataParser()
    parser.feed(html)
    meta = parser.meta
    ld_json = parse_ld_json(parser)

    abstract_candidates = []
    keyword_candidates = []

    for key in (
        "citation_abstract",
        "dc.description",
        "description",
        "og:description",
        "twitter:description",
    ):
        abstract_candidates.extend(meta.get(key, []))

    for key in ("citation_keywords", "keywords", "dc.subject", "article:tag"):
        keyword_candidates.extend(meta.get(key, []))

    if isinstance(ld_json.get("description"), str):
        abstract_candidates.append(ld_json["description"])

    ld_keywords = ld_json.get("keywords")
    if isinstance(ld_keywords, list):
        keyword_candidates.extend(str(item) for item in ld_keywords)
    elif isinstance(ld_keywords, str):
        keyword_candidates.append(ld_keywords)

    abstract = ""
    for candidate in abstract_candidates:
        cleaned = clean_abstract(candidate)
        if cleaned:
            abstract = cleaned
            break

    keywords = split_keywords(keyword_candidates)

    return {
        "abstract": abstract,
        "keywords": keywords,
    }


def rebuild_abstract(inverted_index: dict) -> str:
    if not isinstance(inverted_index, dict):
        return ""
    positioned = []
    for word, positions in inverted_index.items():
        if not isinstance(positions, list):
            continue
        for position in positions:
            if isinstance(position, int):
                positioned.append((position, word))
    if not positioned:
        return ""
    positioned.sort(key=lambda item: item[0])
    return normalize_text(" ".join(word for _, word in positioned))


def chunked(values: List[str], size: int) -> Iterable[List[str]]:
    for start in range(0, len(values), size):
        yield values[start:start + size]


def fetch_openalex_metadata(dois: List[str]) -> Dict[str, dict]:
    metadata: Dict[str, dict] = {}

    for batch in chunked(dois, max(1, OPENALEX_BATCH_SIZE)):
        filter_value = "|".join(f"https://doi.org/{doi.lower()}" for doi in batch)
        url = (
            "https://api.openalex.org/works?per-page=200&filter=doi:"
            + quote(filter_value, safe=":|/")
        )
        payload = fetch_json(url)
        for item in payload.get("results", []):
            doi_url = (item.get("doi") or "").lower()
            doi = doi_url.removeprefix("https://doi.org/")
            if not doi:
                continue

            keywords = [
                keyword.get("display_name", "")
                for keyword in item.get("keywords", [])
                if keyword.get("display_name")
            ]

            if not keywords:
                keywords = [
                    concept.get("display_name", "")
                    for concept in item.get("concepts", [])
                    if concept.get("display_name")
                ][:8]

            metadata[doi] = {
                "abstract": rebuild_abstract(item.get("abstract_inverted_index")),
                "keywords": split_keywords(keywords),
                "link": (
                    (item.get("primary_location") or {}).get("landing_page_url")
                    or (item.get("primary_location") or {}).get("pdf_url")
                    or ""
                ),
                "published_date": item.get("publication_date", ""),
            }

    return metadata


def build_crossref_url(issn: str, cursor: str) -> str:
    query = urlencode(
        {
            "filter": f"from-pub-date:{RANGE_START},type:journal-article",
            "sort": "published",
            "order": "desc",
            "rows": 100,
            "cursor": cursor,
        }
    )
    return CROSSREF_API.format(issn=issn) + "?" + query


def fetch_crossref_articles(journal: dict) -> List[dict]:
    articles_by_doi = {}

    for issn in journal["issns"]:
        cursor = "*"
        while True:
            payload = fetch_json(build_crossref_url(issn, cursor))
            message = payload.get("message", {})
            items = message.get("items", [])
            if not items:
                break

            for item in items:
                doi = item.get("DOI")
                if not doi or doi in articles_by_doi:
                    continue

                date_parts = extract_date_parts(item)
                article = {
                    "doi": doi,
                    "doi_url": f"https://doi.org/{doi}",
                    "title": normalize_text(" ".join(item.get("title", []))),
                    "journal_id": journal["id"],
                    "journal_name": journal["name"],
                    "journal_short_name": journal["short_name"],
                    "published_date": date_parts_to_sort_key(date_parts),
                    "published_date_display": date_parts_to_display(date_parts),
                    "published_parts": date_parts,
                    "link": extract_primary_link(item),
                    "abstract": clean_abstract(item.get("abstract", "")),
                    "keywords": extract_keywords_from_item(item),
                }

                if article["title"]:
                    articles_by_doi[doi] = article

            next_cursor = message.get("next-cursor")
            if not next_cursor or next_cursor == cursor:
                break
            cursor = next_cursor

    return list(articles_by_doi.values())


def load_existing_articles() -> Dict[str, dict]:
    if not DATA_PATH.exists():
        return {}
    try:
        payload = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {}
    return {
        article["doi"]: article
        for article in payload.get("articles", [])
        if isinstance(article, dict) and article.get("doi")
    }


def merge_existing_metadata(article: dict, existing: dict) -> dict:
    if not existing:
        return article
    merged = dict(existing)
    merged.update(article)
    if article.get("abstract"):
        merged["abstract"] = article["abstract"]
    if article.get("keywords"):
        merged["keywords"] = article["keywords"]
    return merged


def enrich_articles(articles: List[dict]) -> None:
    if not articles:
        return

    openalex = fetch_openalex_metadata([article["doi"] for article in articles if article.get("doi")])

    for article in articles:
        enriched = openalex.get(article["doi"].lower(), {})
        if enriched.get("abstract") and not article.get("abstract"):
            article["abstract"] = enriched["abstract"]
        if enriched.get("keywords") and not article.get("keywords"):
            article["keywords"] = enriched["keywords"]
        if enriched.get("link") and article.get("link", "").startswith("https://doi.org/"):
            article["link"] = enriched["link"]
        if enriched.get("published_date") and (
            article.get("published_date") == "1900-01-01"
            or len(article.get("published_date_display", "")) < len(enriched["published_date"])
        ):
            article["published_date"] = enriched["published_date"]
            article["published_date_display"] = enriched["published_date"]

    still_missing = [
        article for article in articles
        if (not article.get("abstract") or not article.get("keywords")) and article.get("link")
    ][:MAX_LANDING_FETCHES]

    for article in still_missing:
        enriched = enrich_from_landing_page(article["link"])
        if enriched.get("abstract") and not article.get("abstract"):
            article["abstract"] = enriched["abstract"]
        if enriched.get("keywords") and not article.get("keywords"):
            article["keywords"] = enriched["keywords"]


def save_payload(articles: List[dict]) -> None:
    articles.sort(key=lambda item: (item["published_date"], item["journal_name"], item["title"]), reverse=True)
    payload = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "range_start": RANGE_START,
        "source": "Crossref and publisher landing pages",
        "journals": [
            {
                "id": journal["id"],
                "name": journal["name"],
                "short_name": journal["short_name"],
            }
            for journal in JOURNALS
        ],
        "articles": articles,
    }
    DATA_PATH.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def main() -> int:
    existing_articles = load_existing_articles()
    combined = []

    try:
        for journal in JOURNALS:
            fetched = fetch_crossref_articles(journal)
            for article in fetched:
                combined.append(merge_existing_metadata(article, existing_articles.get(article["doi"], {})))
        enrich_articles(combined)
        save_payload(combined)
        print(f"Updated EarthFront feed with {len(combined)} articles.")
        return 0
    except (HTTPError, URLError, TimeoutError, ValueError) as error:
        if DATA_PATH.exists():
            print(f"Keeping existing EarthFront data due to fetch error: {error}")
            return 0
        print(f"Failed to update EarthFront feed: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
