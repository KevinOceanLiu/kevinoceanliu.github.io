(function () {
    function loadVisitorTracker() {
        if (document.getElementById('flagcounter')) {
            return;
        }

        const container = document.createElement('div');
        container.className = 'visitor-tracker';
        container.setAttribute('aria-hidden', 'true');

        const link = document.createElement('a');
        link.href = 'https://info.flagcounter.com/qfkW';
        link.id = 'flagcounter';
        link.tabIndex = -1;

        const image = document.createElement('img');
        image.src = 'https://s01.flagcounter.com/count2/qfkW/bg_FFFFFF/txt_000000/border_CCCCCC/columns_2/maxflags_10/viewers_0/labels_0/pageviews_0/flags_0/percent_0/';
        image.alt = 'Flag Counter';
        image.decoding = 'async';

        link.appendChild(image);
        container.appendChild(link);
        document.body.appendChild(container);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadVisitorTracker);
    } else {
        loadVisitorTracker();
    }
}());
