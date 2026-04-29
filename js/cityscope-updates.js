initJournalFeedPage({
    dataUrl: '../data/cityscope_updates.json',
    listSelector: '#cityscope-updates-list',
    statusSelector: '#cityscope-updates-status',
    updatedAtSelector: '#tracked-updated-at',
    journalNamesSelector: '#tracked-journal-names',
    articleSummarySelector: '#tracked-article-summary',
    journalFiltersSelector: '#journal-filter-buttons',
    fallbackJournals: [
        { id: 'nature-cities', short_name: 'Nature Cities' },
        { id: 'computers-environment-urban-systems', short_name: 'Computers, Environment and Urban Systems' },
        { id: 'landscape-urban-planning', short_name: 'Landscape and Urban Planning' },
        { id: 'cities', short_name: 'Cities' },
        { id: 'urban-studies', short_name: 'Urban Studies' }
    ]
});
