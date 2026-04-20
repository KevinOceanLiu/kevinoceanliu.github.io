initJournalFeedPage({
    dataUrl: '../data/earthfront_updates.json',
    listSelector: '#earthfront-updates-list',
    statusSelector: '#earthfront-updates-status',
    updatedAtSelector: '#tracked-updated-at',
    journalNamesSelector: '#tracked-journal-names',
    articleSummarySelector: '#tracked-article-summary',
    journalFiltersSelector: '#journal-filter-buttons',
    fallbackJournals: [
        { id: 'one-earth', short_name: 'One Earth' },
        { id: 'nature-sustainability', short_name: 'Nature Sustainability' },
        { id: 'nature-geoscience', short_name: 'Nature Geoscience' },
        { id: 'nature-climate-change', short_name: 'Nature Climate Change' }
    ]
});
