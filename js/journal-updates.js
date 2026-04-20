initJournalFeedPage({
    dataUrl: '../data/journal_updates.json',
    listSelector: '#journal-updates-list',
    statusSelector: '#journal-updates-status',
    updatedAtSelector: '#tracked-updated-at',
    journalNamesSelector: '#tracked-journal-names',
    articleSummarySelector: '#tracked-article-summary',
    journalFiltersSelector: '#journal-filter-buttons',
    fallbackJournals: [
        { id: 'rse', short_name: 'RSE' },
        { id: 'isprs-jprs', short_name: 'ISPRS JPRS' },
        { id: 'ijgis', short_name: 'IJGIS' },
        { id: 'annals-aag', short_name: 'Annals AAG' }
    ]
});
