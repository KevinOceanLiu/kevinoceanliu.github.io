const JOURNAL_FEED_FIXED_START = new Date(2026, 0, 1, 0, 0, 0, 0);

function initJournalFeedPage(config) {
    const {
        dataUrl,
        listSelector,
        statusSelector,
        updatedAtSelector,
        journalNamesSelector,
        articleSummarySelector,
        journalFiltersSelector,
        rangeFiltersSelector
    } = config;

    const listElement = document.querySelector(listSelector);
    const statusElement = statusSelector ? document.querySelector(statusSelector) : null;
    const updatedAtElement = document.querySelector(updatedAtSelector);
    const journalNamesElement = document.querySelector(journalNamesSelector);
    const articleSummaryElement = document.querySelector(articleSummarySelector);
    const journalFiltersElement = document.querySelector(journalFiltersSelector);
    const rangeFiltersElement = document.querySelector(rangeFiltersSelector);

    const state = {
        payload: null,
        selectedJournalIds: new Set(),
        selectedRangeId: 'auto'
    };

    const rangePresets = [
        {
            id: 'auto',
            label: 'Auto',
            getRange: () => {
                const end = new Date();
                const start = new Date(end);
                start.setFullYear(start.getFullYear() - 1);
                start.setHours(0, 0, 0, 0);
                return {
                    start: JOURNAL_FEED_FIXED_START > start ? new Date(JOURNAL_FEED_FIXED_START) : start,
                    end
                };
            }
        },
        {
            id: 'since-20260101',
            label: 'Since 2026-01-01',
            getRange: () => ({
                start: new Date(JOURNAL_FEED_FIXED_START),
                end: new Date()
            })
        },
        {
            id: '30d',
            label: '30D',
            getRange: () => buildRecentRange(30)
        },
        {
            id: '90d',
            label: '90D',
            getRange: () => buildRecentRange(90)
        },
        {
            id: '180d',
            label: '180D',
            getRange: () => buildRecentRange(180)
        },
        {
            id: '1y',
            label: '1Y',
            getRange: () => {
                const end = new Date();
                const start = new Date(end);
                start.setFullYear(start.getFullYear() - 1);
                start.setHours(0, 0, 0, 0);
                return { start, end };
            }
        }
    ];

    function buildRecentRange(days) {
        const end = new Date();
        const start = new Date(end);
        start.setDate(start.getDate() - days);
        start.setHours(0, 0, 0, 0);
        return { start, end };
    }

    function escapeHtml(value) {
        return String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#39;');
    }

    function parseDateValue(value) {
        if (!value) {
            return null;
        }

        if (value instanceof Date) {
            return new Date(value.getTime());
        }

        if (typeof value === 'string') {
            const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
            if (match) {
                const [, year, month, day] = match;
                return new Date(Number(year), Number(month) - 1, Number(day), 12, 0, 0, 0);
            }
        }

        const parsed = new Date(value);
        return Number.isNaN(parsed.getTime()) ? null : parsed;
    }

    function formatUpdatedAt(value) {
        const parsed = parseDateValue(value);
        if (!parsed) {
            return value || 'Unavailable';
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
        const parsed = parseDateValue(value);
        if (!parsed) {
            return typeof value === 'string' && value ? value : 'Unavailable';
        }

        return parsed.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    function getActiveRange() {
        const preset = rangePresets.find((item) => item.id === state.selectedRangeId) || rangePresets[0];
        return preset.getRange();
    }

    function isArticleVisible(article, range) {
        const publishedAt = parseDateValue(article.published_date);
        if (!publishedAt) {
            return false;
        }

        if (!state.selectedJournalIds.has(article.journal_id)) {
            return false;
        }

        return publishedAt >= range.start && publishedAt <= range.end;
    }

    function renderJournalFilters(journals) {
        const hasAllSelected = journals.length > 0 && state.selectedJournalIds.size === journals.length;

        journalFiltersElement.innerHTML = [
            `<button type="button" class="journal-filter-button ${hasAllSelected ? 'is-active' : ''}" data-filter-kind="journal" data-journal-id="__all__">All journals</button>`,
            ...journals.map((journal) => {
                const isActive = state.selectedJournalIds.has(journal.id);
                return `<button type="button" class="journal-filter-button ${isActive ? `is-active journal-tag-${escapeHtml(journal.id)}` : ''}" data-filter-kind="journal" data-journal-id="${escapeHtml(journal.id)}">${escapeHtml(journal.short_name || journal.name || journal.id)}</button>`;
            })
        ].join('');
    }

    function renderRangeFilters() {
        rangeFiltersElement.innerHTML = rangePresets
            .map((preset) => `<button type="button" class="journal-filter-button ${preset.id === state.selectedRangeId ? 'is-active' : ''}" data-filter-kind="range" data-range-id="${escapeHtml(preset.id)}">${escapeHtml(preset.label)}</button>`)
            .join('');
    }

    function setStatus(message) {
        if (!statusElement) {
            return;
        }

        statusElement.textContent = message;
        statusElement.style.display = message ? 'block' : 'none';
    }

    function renderArticles() {
        if (!state.payload) {
            return;
        }

        const range = getActiveRange();
        const articles = (Array.isArray(state.payload.articles) ? state.payload.articles : [])
            .filter((article) => isArticleVisible(article, range))
            .sort((left, right) => {
                const leftDate = parseDateValue(left.published_date);
                const rightDate = parseDateValue(right.published_date);
                return (rightDate ? rightDate.getTime() : 0) - (leftDate ? leftDate.getTime() : 0);
            });

        articleSummaryElement.textContent = `${articles.length} articles, ${formatDateLabel(range.start)} to ${formatDateLabel(range.end)}.`;

        if (!articles.length) {
            const emptyMessage = state.selectedJournalIds.size
                ? 'No articles are available for the selected journals and date range.'
                : 'Select at least one journal to display articles.';

            setStatus(emptyMessage);
            listElement.innerHTML = '';
            return;
        }

        setStatus('');

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

    function renderFiltersAndArticles() {
        const journals = state.payload && Array.isArray(state.payload.journals) ? state.payload.journals : [];
        renderJournalFilters(journals);
        renderRangeFilters();
        renderArticles();
    }

    if (journalFiltersElement) {
        journalFiltersElement.addEventListener('click', (event) => {
            const button = event.target.closest('[data-filter-kind="journal"]');
            if (!button || !state.payload) {
                return;
            }

            const journals = Array.isArray(state.payload.journals) ? state.payload.journals : [];
            const journalId = button.dataset.journalId;

            if (journalId === '__all__') {
                state.selectedJournalIds = new Set(journals.map((journal) => journal.id));
            } else if (journalId) {
                const nextSelected = new Set(state.selectedJournalIds);
                if (nextSelected.has(journalId)) {
                    nextSelected.delete(journalId);
                } else {
                    nextSelected.add(journalId);
                }
                state.selectedJournalIds = nextSelected;
            }

            renderFiltersAndArticles();
        });
    }

    if (rangeFiltersElement) {
        rangeFiltersElement.addEventListener('click', (event) => {
            const button = event.target.closest('[data-filter-kind="range"]');
            if (!button) {
                return;
            }

            state.selectedRangeId = button.dataset.rangeId || 'auto';
            renderFiltersAndArticles();
        });
    }

    async function loadJournalFeed() {
        try {
            const response = await fetch(dataUrl, { cache: 'no-store' });
            if (!response.ok) {
                throw new Error(`Failed to load journal data: ${response.status}`);
            }

            const payload = await response.json();
            const journals = Array.isArray(payload.journals) ? payload.journals : [];

            state.payload = payload;
            state.selectedJournalIds = new Set(journals.map((journal) => journal.id));

            updatedAtElement.textContent = formatUpdatedAt(payload.generated_at);
            journalNamesElement.textContent = journals
                .map((journal) => journal.short_name || journal.name)
                .join(', ');

            renderFiltersAndArticles();
        } catch (error) {
            setStatus('');
            listElement.innerHTML = '';
            updatedAtElement.textContent = 'Unavailable';
            journalNamesElement.textContent = 'Unavailable';
            articleSummaryElement.textContent = 'Unavailable';
            console.error(error);
        }
    }

    loadJournalFeed();
}
