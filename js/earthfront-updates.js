const DATA_URL = '../data/earthfront_updates.json';

const listElement = document.querySelector('#earthfront-updates-list');
const updatedAtElement = document.querySelector('#tracked-updated-at');
const journalNamesElement = document.querySelector('#tracked-journal-names');
const articleSummaryElement = document.querySelector('#tracked-article-summary');

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

function formatUpdatedAt(value) {
    if (!value) {
        return 'Unavailable';
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
        return value;
    }

    return parsed.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    });
}

function formatDateLabel(value) {
    if (!value) {
        return 'Unavailable';
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
        return value;
    }

    return parsed.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function isWithinLastYear(value) {
    if (!value) {
        return false;
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
        return false;
    }

    const cutoff = new Date();
    cutoff.setFullYear(cutoff.getFullYear() - 1);
    cutoff.setHours(0, 0, 0, 0);

    return parsed >= cutoff;
}

function renderArticles(payload) {
    const articles = (Array.isArray(payload.articles) ? payload.articles : [])
        .filter((article) => isWithinLastYear(article.published_date))
        .sort((left, right) => {
            const leftDate = new Date(left.published_date || 0).getTime();
            const rightDate = new Date(right.published_date || 0).getTime();
            return rightDate - leftDate;
        });

    if (!articles.length) {
        articleSummaryElement.textContent = 'No articles available in the current one-year window.';
        listElement.innerHTML = '';
        return;
    }

    const newestArticle = articles[0];
    const oldestArticle = articles[articles.length - 1];
    articleSummaryElement.textContent = `${articles.length} articles, ${formatDateLabel(oldestArticle.published_date)} to ${formatDateLabel(newestArticle.published_date)}.`;

    listElement.innerHTML = articles
        .map((article) => `
            <article class="journal-entry">
                <div class="journal-entry-tags">
                    <span class="journal-tag-value journal-tag-${escapeHtml(article.journal_id || 'unknown')}">${escapeHtml(article.journal_short_name || article.journal_name || 'Unknown journal')}</span>
                    <span class="journal-tag-value">${escapeHtml(article.published_date_display || article.published_date || 'Unknown date')}</span>
                </div>
                <p class="journal-entry-title-line">
                    <a href="${escapeHtml(article.link)}" target="_blank" rel="noreferrer">${escapeHtml(article.title)}</a>
                </p>
            </article>
        `)
        .join('');
}

async function loadEarthFrontUpdates() {
    try {
        const response = await fetch(DATA_URL, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`Failed to load EarthFront data: ${response.status}`);
        }

        const payload = await response.json();

        updatedAtElement.textContent = formatUpdatedAt(payload.generated_at);
        journalNamesElement.textContent = (payload.journals || [])
            .map((journal) => journal.short_name || journal.name)
            .join(', ');

        renderArticles(payload);
    } catch (error) {
        listElement.innerHTML = '';
        updatedAtElement.textContent = 'Unavailable';
        journalNamesElement.textContent = 'Unavailable';
        articleSummaryElement.textContent = 'Unavailable';
        console.error(error);
    }
}

loadEarthFrontUpdates();
