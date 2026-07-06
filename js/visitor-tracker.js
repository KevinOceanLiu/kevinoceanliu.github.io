(function () {
    const TRACKER_ID = 'D2VNqooHs-Re2IYCGltrggAK9kmAw3nJRSd9dMaY1oA';
    const TRACKER_WIDTH = 300;

    function loadVisitorTracker() {
        if (document.getElementById('mapmyvisitors')) {
            return;
        }

        const container = document.createElement('div');
        container.className = 'visitor-tracker';
        container.setAttribute('aria-hidden', 'true');

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.id = 'mapmyvisitors';
        script.src = `https://mapmyvisitors.com/map.js?d=${TRACKER_ID}&cl=ffffff&w=${TRACKER_WIDTH}`;

        container.appendChild(script);
        document.body.appendChild(container);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadVisitorTracker);
    } else {
        loadVisitorTracker();
    }
}());
