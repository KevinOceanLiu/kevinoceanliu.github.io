const SCHOLAR_USER_ID = 'Pup0q0gAAAAJ';
const SCHOLAR_URL = `https://scholar.google.com/citations?user=${SCHOLAR_USER_ID}&hl=en`;

const jsonHeaders = {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'access-control-allow-origin': '*',
};

function parseCitations(html) {
    const primaryMatch = html.match(/Citations<\/a><\/td><td class="gsc_rsb_std">(\d+)<\/td>/);

    if (primaryMatch) {
        return Number(primaryMatch[1]);
    }

    const fallbackMatch = html.match(/class="gsc_rsb_std">(\d+)<\/td>/);

    if (fallbackMatch) {
        return Number(fallbackMatch[1]);
    }

    throw new Error('Could not parse Google Scholar citation count.');
}

export async function onRequestGet() {
    try {
        const response = await fetch(SCHOLAR_URL, {
            headers: {
                'user-agent': (
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) '
                    + 'AppleWebKit/537.36 (KHTML, like Gecko) '
                    + 'Chrome/124.0 Safari/537.36'
                ),
            },
            cf: {
                cacheTtl: 0,
                cacheEverything: false,
            },
        });

        if (!response.ok) {
            throw new Error(`Google Scholar responded with ${response.status}`);
        }

        const html = await response.text();
        const citations = parseCitations(html);

        return new Response(JSON.stringify({
            citations,
            updated_at: new Date().toISOString(),
            source: 'Google Scholar',
            scholar_user_id: SCHOLAR_USER_ID,
        }), {
            headers: jsonHeaders,
        });
    } catch (error) {
        return new Response(JSON.stringify({
            error: error.message,
            source: 'Google Scholar',
            scholar_user_id: SCHOLAR_USER_ID,
        }), {
            status: 502,
            headers: jsonHeaders,
        });
    }
}
