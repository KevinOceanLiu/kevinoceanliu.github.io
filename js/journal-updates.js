const DATA_URL = '../data/journal_updates.json';

const listElement = document.querySelector('#journal-updates-list');
const statusElement = document.querySelector('#journal-updates-status');
const updatedAtElement = document.querySelector('#tracked-updated-at');
const startDateElement = document.querySelector('#tracked-start-date');
const journalNamesElement = document.querySelector('#tracked-journal-names');

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
        statusElement.textContent = 'No journal updates from the last year are available right now.';
        listElement.innerHTML = '';
        return;
    }

    statusElement.textContent = `${articles.length} articles loaded from the last year.`;

    listElement.innerHTML = articles
        .map((article) => `
            <article class="journal-entry">
                <div class="journal-entry-tags">
                    <span class="journal-tag">Journal</span>
                    <span class="journal-tag-value">${escapeHtml(article.journal_short_name || article.journal_name || 'Unknown journal')}</span>
                    <span class="journal-tag">Date</span>
                    <span class="journal-tag-value">${escapeHtml(article.published_date_display || article.published_date || 'Unknown date')}</span>
                </div>
                <p class="journal-entry-title-line">
                    <a href="${escapeHtml(article.link)}" target="_blank" rel="noreferrer">${escapeHtml(article.title)}</a>
                </p>
            </article>
        `)
        .join('');
}

async function loadJournalUpdates() {
    try {
        const response = await fetch(DATA_URL, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`Failed to load journal data: ${response.status}`);
        }

        const payload = await response.json();

        updatedAtElement.textContent = formatUpdatedAt(payload.generated_at);
        startDateElement.textContent = payload.range_start || '2026-03-01';
        journalNamesElement.textContent = (payload.journals || [])
            .map((journal) => journal.short_name || journal.name)
            .join(', ');

        renderArticles(payload);
    } catch (error) {
        statusElement.textContent = 'Unable to load journal updates right now.';
        listElement.innerHTML = '';
        updatedAtElement.textContent = 'Unavailable';
        journalNamesElement.textContent = 'Unavailable';
        console.error(error);
    }
}

loadJournalUpdates();
