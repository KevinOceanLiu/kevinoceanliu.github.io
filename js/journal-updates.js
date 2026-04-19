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
        .filter((article) => isWithinLastYear(article.published_date));
    const journals = Array.isArray(payload.journals) ? payload.journals : [];

    if (!articles.length) {
        statusElement.textContent = 'No journal updates from the last year are available right now.';
        listElement.innerHTML = '';
        return;
    }

    statusElement.textContent = `${articles.length} articles loaded from the last year.`;

    listElement.innerHTML = journals
        .map((journal) => {
            const journalArticles = articles.filter((article) => article.journal_id === journal.id);
            const articleMarkup = journalArticles.length
                ? journalArticles.map((article) => {
                    const keywords = Array.isArray(article.keywords) && article.keywords.length
                        ? escapeHtml(article.keywords.join(', '))
                        : 'No keywords available.';
                    const abstract = article.abstract
                        ? escapeHtml(article.abstract)
                        : 'Abstract not available from the current metadata sources.';

                    return `
                        <article class="journal-entry">
                            <p>${escapeHtml(article.published_date_display || article.published_date || 'Unknown date')}</p>
                            <p><a href="${escapeHtml(article.link)}" target="_blank" rel="noreferrer">${escapeHtml(article.title)}</a></p>
                            <details class="journal-entry-details">
                                <summary>Abstract / Keywords / Link</summary>
                                <p>${abstract}</p>
                                <p>Keywords: ${keywords}</p>
                                <p><a href="${escapeHtml(article.doi_url || article.link)}" target="_blank" rel="noreferrer">Link</a></p>
                            </details>
                        </article>
                    `;
                }).join('')
                : '<p class="journal-empty-line">No articles available currently.</p>';

            return `
                <section class="journal-group">
                    <p class="journal-group-title">${escapeHtml(journal.short_name || journal.name)}</p>
                    ${articleMarkup}
                </section>
            `;
        })
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
