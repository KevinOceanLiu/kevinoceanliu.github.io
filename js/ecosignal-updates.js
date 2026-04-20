initJournalFeedPage({
    dataUrl: '../data/ecosignal_updates.json',
    listSelector: '#ecosignal-updates-list',
    statusSelector: '#ecosignal-updates-status',
    updatedAtSelector: '#tracked-updated-at',
    journalNamesSelector: '#tracked-journal-names',
    articleSummarySelector: '#tracked-article-summary',
    journalFiltersSelector: '#journal-filter-buttons',
    fallbackJournals: [
        { id: 'journal-of-ecology', short_name: 'Journal of Ecology' },
        { id: 'journal-of-applied-ecology', short_name: 'Journal of Applied Ecology' },
        { id: 'nature-ecology-evolution', short_name: 'Nature Ecology & Evolution' },
        { id: 'ecology-letters', short_name: 'Ecology Letters' },
        { id: 'global-change-biology', short_name: 'Global Change Biology' },
        { id: 'american-naturalist', short_name: 'The American Naturalist' }
    ]
});
