const islandData = [
    { name: 'Iceland', lat: 64.9631, lng: -19.0208, radiusKm: 380 },
    { name: 'Madagascar', lat: -18.7669, lng: 46.8691, radiusKm: 520 },
    { name: 'Sri Lanka', lat: 7.8731, lng: 80.7718, radiusKm: 220 },
    { name: 'Taiwan', lat: 23.6978, lng: 120.9605, radiusKm: 180 },
    { name: 'Hokkaido', lat: 43.2203, lng: 142.8635, radiusKm: 220 },
    { name: 'Sicily', lat: 37.5994, lng: 14.0154, radiusKm: 170 },
    { name: 'Sardinia', lat: 40.1209, lng: 9.0129, radiusKm: 170 },
    { name: 'Borneo', lat: 0.9619, lng: 114.5548, radiusKm: 520 },
    { name: 'Sumatra', lat: -0.5897, lng: 101.3431, radiusKm: 520 },
    { name: 'Java', lat: -7.6145, lng: 110.7122, radiusKm: 300 },
    { name: 'New Guinea', lat: -5.2833, lng: 141.6, radiusKm: 620 },
    { name: 'Tasmania', lat: -42.0409, lng: 146.8087, radiusKm: 220 },
    { name: 'Cuba', lat: 21.5218, lng: -77.7812, radiusKm: 300 },
    { name: 'Jamaica', lat: 18.1096, lng: -77.2975, radiusKm: 120 },
    { name: 'Hispaniola', lat: 19.0, lng: -70.6667, radiusKm: 240 },
    { name: 'New Zealand North Island', lat: -38.131, lng: 175.774, radiusKm: 260 },
    { name: 'New Zealand South Island', lat: -43.9864, lng: 170.5078, radiusKm: 320 },
    { name: 'Greenland', lat: 71.7069, lng: -42.6043, radiusKm: 900 },
    { name: 'Great Britain', lat: 54.7024, lng: -3.2766, radiusKm: 380 },
    { name: 'Ireland', lat: 53.4129, lng: -8.2439, radiusKm: 220 },
    { name: 'Cyprus', lat: 35.1264, lng: 33.4299, radiusKm: 110 },
    { name: 'Bali', lat: -8.3405, lng: 115.092, radiusKm: 90 },
    { name: 'Honshu', lat: 36.2048, lng: 138.2529, radiusKm: 520 },
    { name: 'Kyushu', lat: 32.5906, lng: 130.6909, radiusKm: 170 }
];

const targetPanel = document.querySelector('.island-target-map-panel');
const answerPanel = document.querySelector('.island-answer-map-panel');

const mapStyles = [
    {
        featureType: 'all',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
    },
    {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [{ visibility: 'off' }]
    },
    {
        featureType: 'poi',
        stylers: [{ visibility: 'off' }]
    },
    {
        featureType: 'road',
        stylers: [{ visibility: 'off' }]
    },
    {
        featureType: 'transit',
        stylers: [{ visibility: 'off' }]
    }
];

const state = {
    current: null,
    answerMarker: null,
    nextTimer: null
};

let targetMap;
let answerMap;

function chooseIsland() {
    const next = islandData[Math.floor(Math.random() * islandData.length)];
    if (state.current && islandData.length > 1 && next.name === state.current.name) {
        return chooseIsland();
    }
    return next;
}

function targetZoom(island) {
    if (island.radiusKm >= 800) return 3;
    if (island.radiusKm >= 500) return 4;
    if (island.radiusKm >= 260) return 5;
    if (island.radiusKm >= 150) return 6;
    return 7;
}

function distanceKm(a, b) {
    const earthRadiusKm = 6371;
    const lat1 = a.lat * Math.PI / 180;
    const lat2 = b.lat * Math.PI / 180;
    const deltaLat = (b.lat - a.lat) * Math.PI / 180;
    const deltaLng = (b.lng - a.lng) * Math.PI / 180;
    const haversine = Math.sin(deltaLat / 2) ** 2
        + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) ** 2;
    return 2 * earthRadiusKm * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

function clearPanelStates() {
    targetPanel.classList.remove('is-win', 'is-miss');
    answerPanel.classList.remove('is-win', 'is-miss');
}

function clearAnswerMarker() {
    if (state.answerMarker) {
        state.answerMarker.setMap(null);
        state.answerMarker = null;
    }
}

function showNextIsland() {
    window.clearTimeout(state.nextTimer);
    clearAnswerMarker();
    clearPanelStates();
    state.current = chooseIsland();
    targetMap.setCenter({ lat: state.current.lat, lng: state.current.lng });
    targetMap.setZoom(targetZoom(state.current));
}

function handleAnswerClick(event) {
    if (!state.current || !event.latLng) {
        return;
    }

    clearAnswerMarker();
    clearPanelStates();

    const clicked = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
    };
    const target = {
        lat: state.current.lat,
        lng: state.current.lng
    };
    const isCorrect = distanceKm(clicked, target) <= state.current.radiusKm;

    state.answerMarker = new google.maps.Marker({
        position: event.latLng,
        map: answerMap,
        clickable: false
    });

    if (isCorrect) {
        targetPanel.classList.add('is-win');
        answerPanel.classList.add('is-win');
        state.nextTimer = window.setTimeout(showNextIsland, 900);
    } else {
        answerPanel.classList.add('is-miss');
        state.nextTimer = window.setTimeout(() => {
            answerPanel.classList.remove('is-miss');
        }, 450);
    }
}

function createMap(elementId, options = {}) {
    return new google.maps.Map(document.querySelector(`#${elementId}`), {
        center: { lat: 18, lng: 10 },
        zoom: 2,
        minZoom: 2,
        maxZoom: 10,
        mapTypeId: 'terrain',
        disableDefaultUI: true,
        clickableIcons: false,
        keyboardShortcuts: false,
        gestureHandling: options.gestureHandling || 'greedy',
        draggable: options.draggable,
        scrollwheel: options.scrollwheel,
        disableDoubleClickZoom: options.disableDoubleClickZoom,
        styles: mapStyles,
        restriction: {
            latLngBounds: {
                north: 85,
                south: -85,
                west: -180,
                east: 180
            },
            strictBounds: false
        }
    });
}

function initIslandGame() {
    targetMap = createMap('island-target-map', {
        draggable: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        gestureHandling: 'none'
    });

    answerMap = createMap('island-answer-map', {
        draggable: true,
        scrollwheel: true,
        disableDoubleClickZoom: false,
        gestureHandling: 'greedy'
    });

    answerMap.addListener('click', handleAnswerClick);
    showNextIsland();
}

window.initIslandGame = initIslandGame;
