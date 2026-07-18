(function () {
    function loadVisitorTracker() {
        if (document.getElementById('goatcounter')) {
            return;
        }

        const script = document.createElement('script');
        script.id = 'goatcounter';
        script.dataset.goatcounter = 'https://liuhaiyang.goatcounter.com/count';
        script.async = true;
        script.src = 'https://gc.zgo.at/count.js';

        document.body.appendChild(script);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadVisitorTracker);
    } else {
        loadVisitorTracker();
    }
}());
