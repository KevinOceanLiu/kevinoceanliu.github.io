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

const questionBankSize = 100;

const islandQuestionSeeds = {
    level1: [
        { name: 'Greenland', lat: 71.7069, lng: -42.6043, radiusKm: 900 },
        { name: 'New Guinea', lat: -5.2833, lng: 141.6, radiusKm: 620 },
        { name: 'Borneo', lat: 0.9619, lng: 114.5548, radiusKm: 520 },
        { name: 'Sumatra', lat: -0.5897, lng: 101.3431, radiusKm: 520 },
        { name: 'Madagascar', lat: -18.7669, lng: 46.8691, radiusKm: 520 },
        { name: 'Honshu', lat: 36.2048, lng: 138.2529, radiusKm: 520 },
        { name: 'Iceland', lat: 64.9631, lng: -19.0208, radiusKm: 380 },
        { name: 'Great Britain', lat: 54.7024, lng: -3.2766, radiusKm: 380 },
        { name: 'Java', lat: -7.6145, lng: 110.7122, radiusKm: 300 },
        { name: 'Cuba', lat: 21.5218, lng: -77.7812, radiusKm: 300 },
        { name: 'South Island', lat: -43.9864, lng: 170.5078, radiusKm: 320 },
        { name: 'North Island', lat: -38.131, lng: 175.774, radiusKm: 260 },
        { name: 'Hispaniola', lat: 19.0, lng: -70.6667, radiusKm: 240 },
        { name: 'Sri Lanka', lat: 7.8731, lng: 80.7718, radiusKm: 220 },
        { name: 'Tasmania', lat: -42.0409, lng: 146.8087, radiusKm: 220 },
        { name: 'Hokkaido', lat: 43.2203, lng: 142.8635, radiusKm: 220 },
        { name: 'Ireland', lat: 53.4129, lng: -8.2439, radiusKm: 220 },
        { name: 'Taiwan', lat: 23.6978, lng: 120.9605, radiusKm: 180 },
        { name: 'Sicily', lat: 37.5994, lng: 14.0154, radiusKm: 170 },
        { name: 'Sardinia', lat: 40.1209, lng: 9.0129, radiusKm: 170 }
    ],
    level2: [
        { name: 'Kyushu', lat: 32.5906, lng: 130.6909, radiusKm: 170 },
        { name: 'Shikoku', lat: 33.75, lng: 133.5, radiusKm: 145 },
        { name: 'Jamaica', lat: 18.1096, lng: -77.2975, radiusKm: 120 },
        { name: 'Cyprus', lat: 35.1264, lng: 33.4299, radiusKm: 110 },
        { name: 'Bali', lat: -8.3405, lng: 115.092, radiusKm: 90 },
        { name: 'Corsica', lat: 42.0396, lng: 9.0129, radiusKm: 120 },
        { name: 'Crete', lat: 35.2401, lng: 24.8093, radiusKm: 120 },
        { name: 'Sakhalin', lat: 50.7, lng: 143.0, radiusKm: 260 },
        { name: 'Mindanao', lat: 7.6869, lng: 125.162, radiusKm: 190 },
        { name: 'Luzon', lat: 16.5662, lng: 121.2626, radiusKm: 200 },
        { name: 'Palawan', lat: 9.8349, lng: 118.7384, radiusKm: 125 },
        { name: 'Sulawesi', lat: -1.8479, lng: 120.5279, radiusKm: 250 },
        { name: 'Timor', lat: -9.2399, lng: 124.946, radiusKm: 125 },
        { name: 'Vancouver Island', lat: 49.6506, lng: -125.4494, radiusKm: 150 },
        { name: 'Prince Edward Island', lat: 46.5107, lng: -63.4168, radiusKm: 65 },
        { name: 'Gotland', lat: 57.4684, lng: 18.4867, radiusKm: 62 },
        { name: 'Mallorca', lat: 39.6953, lng: 3.0176, radiusKm: 72 },
        { name: 'Lombok', lat: -8.6509, lng: 116.3249, radiusKm: 65 },
        { name: 'Sumbawa', lat: -8.7439, lng: 117.981, radiusKm: 120 },
        { name: 'Flores', lat: -8.6574, lng: 121.0794, radiusKm: 130 }
    ],
    level3: [
        { name: 'Isle of Man', lat: 54.2361, lng: -4.5481, radiusKm: 28 },
        { name: 'Malta', lat: 35.9375, lng: 14.3754, radiusKm: 20 },
        { name: 'Ibiza', lat: 38.9067, lng: 1.4206, radiusKm: 28 },
        { name: 'Menorca', lat: 39.9496, lng: 4.1104, radiusKm: 28 },
        { name: 'Elba', lat: 42.7817, lng: 10.2867, radiusKm: 22 },
        { name: 'Rhodes', lat: 36.4341, lng: 28.2176, radiusKm: 45 },
        { name: 'Lesbos', lat: 39.1641, lng: 26.3722, radiusKm: 55 },
        { name: 'Corfu', lat: 39.6243, lng: 19.9217, radiusKm: 40 },
        { name: 'Zakynthos', lat: 37.787, lng: 20.8999, radiusKm: 24 },
        { name: 'Bornholm', lat: 55.1604, lng: 14.8669, radiusKm: 22 },
        { name: 'Guam', lat: 13.4443, lng: 144.7937, radiusKm: 24 },
        { name: 'Saipan', lat: 15.1778, lng: 145.7509, radiusKm: 18 },
        { name: 'Rarotonga', lat: -21.2292, lng: -159.7763, radiusKm: 10 },
        { name: 'Tahiti', lat: -17.6509, lng: -149.426, radiusKm: 45 },
        { name: 'Moorea', lat: -17.5388, lng: -149.8295, radiusKm: 18 },
        { name: 'Tenerife', lat: 28.2916, lng: -16.6291, radiusKm: 45 },
        { name: 'Gran Canaria', lat: 27.9202, lng: -15.5474, radiusKm: 38 },
        { name: 'Madeira', lat: 32.7607, lng: -16.9595, radiusKm: 35 },
        { name: 'Bermuda', lat: 32.3078, lng: -64.7505, radiusKm: 12 },
        { name: 'Barbados', lat: 13.1939, lng: -59.5432, radiusKm: 18 }
    ],
    level4: [
        { name: 'Aruba', lat: 12.5211, lng: -69.9683, radiusKm: 11 },
        { name: 'Bonaire', lat: 12.1784, lng: -68.2385, radiusKm: 14 },
        { name: 'Curacao', lat: 12.1696, lng: -68.99, radiusKm: 20 },
        { name: 'St Lucia', lat: 13.9094, lng: -60.9789, radiusKm: 20 },
        { name: 'Dominica', lat: 15.415, lng: -61.371, radiusKm: 20 },
        { name: 'Montserrat', lat: 16.7425, lng: -62.1874, radiusKm: 8 },
        { name: 'Anguilla', lat: 18.2206, lng: -63.0686, radiusKm: 10 },
        { name: 'St Martin', lat: 18.0708, lng: -63.0501, radiusKm: 10 },
        { name: 'Antigua', lat: 17.0608, lng: -61.7964, radiusKm: 14 },
        { name: 'Tobago', lat: 11.2504, lng: -60.6675, radiusKm: 18 },
        { name: 'Kauai', lat: 22.0964, lng: -159.5261, radiusKm: 28 },
        { name: 'Oahu', lat: 21.4389, lng: -158.0001, radiusKm: 32 },
        { name: 'Maui', lat: 20.7984, lng: -156.3319, radiusKm: 35 },
        { name: 'Lanai', lat: 20.827, lng: -156.9219, radiusKm: 16 },
        { name: 'Molokai', lat: 21.1444, lng: -157.0226, radiusKm: 24 },
        { name: 'Koh Samui', lat: 9.512, lng: 100.0136, radiusKm: 13 },
        { name: 'Phuket', lat: 7.8804, lng: 98.3923, radiusKm: 25 },
        { name: 'Ko Chang', lat: 12.0476, lng: 102.329, radiusKm: 15 },
        { name: 'Jeju', lat: 33.4996, lng: 126.5312, radiusKm: 35 },
        { name: 'Ulleungdo', lat: 37.4845, lng: 130.9057, radiusKm: 6 }
    ],
    level5: [
        { name: 'Nauru', lat: -0.5228, lng: 166.9315, radiusKm: 3 },
        { name: 'Pitcairn', lat: -25.066, lng: -130.1015, radiusKm: 3 },
        { name: 'Easter Island', lat: -27.1127, lng: -109.3497, radiusKm: 8 },
        { name: 'Lord Howe Island', lat: -31.5553, lng: 159.0821, radiusKm: 6 },
        { name: 'Norfolk Island', lat: -29.0408, lng: 167.9547, radiusKm: 5 },
        { name: 'Christmas Island', lat: -10.4475, lng: 105.6904, radiusKm: 8 },
        { name: 'Cocos Island', lat: -12.1642, lng: 96.871, radiusKm: 4 },
        { name: 'Niue', lat: -19.0544, lng: -169.8672, radiusKm: 9 },
        { name: 'Aitutaki', lat: -18.865, lng: -159.785, radiusKm: 4 },
        { name: 'Bora Bora', lat: -16.5004, lng: -151.7415, radiusKm: 5 },
        { name: 'Maupiti', lat: -16.4444, lng: -152.257, radiusKm: 3 },
        { name: 'Tubuai', lat: -23.381, lng: -149.454, radiusKm: 7 },
        { name: 'Ascension Island', lat: -7.9467, lng: -14.3559, radiusKm: 7 },
        { name: 'Tristan da Cunha', lat: -37.1052, lng: -12.2777, radiusKm: 7 },
        { name: 'St Helena', lat: -15.965, lng: -5.7089, radiusKm: 8 },
        { name: 'Saba', lat: 17.6355, lng: -63.2327, radiusKm: 3 },
        { name: 'Statia', lat: 17.489, lng: -62.9736, radiusKm: 4 },
        { name: 'Nevis', lat: 17.1554, lng: -62.5796, radiusKm: 6 },
        { name: 'Bequia', lat: 13.0123, lng: -61.2356, radiusKm: 4 },
        { name: 'Canouan', lat: 12.7058, lng: -61.3262, radiusKm: 3 }
    ]
};

const islandMeta = {
    Aitutaki: { country: 'Cook Islands', continent: 'Oceania' },
    Anguilla: { country: 'United Kingdom', continent: 'North America' },
    Antigua: { country: 'Antigua and Barbuda', continent: 'North America' },
    Aruba: { country: 'Netherlands', continent: 'North America' },
    'Ascension Island': { country: 'United Kingdom', continent: 'Africa' },
    Bali: { country: 'Indonesia', continent: 'Asia' },
    Barbados: { country: 'Barbados', continent: 'North America' },
    Bequia: { country: 'Saint Vincent and the Grenadines', continent: 'North America' },
    Bermuda: { country: 'United Kingdom', continent: 'North America' },
    Bonaire: { country: 'Netherlands', continent: 'North America' },
    Borneo: { country: 'Indonesia, Malaysia, Brunei', continent: 'Asia' },
    Bornholm: { country: 'Denmark', continent: 'Europe' },
    'Bora Bora': { country: 'French Polynesia', continent: 'Oceania' },
    'Canouan': { country: 'Saint Vincent and the Grenadines', continent: 'North America' },
    'Christmas Island': { country: 'Australia', continent: 'Asia' },
    'Cocos Island': { country: 'Australia', continent: 'Asia' },
    Corfu: { country: 'Greece', continent: 'Europe' },
    Corsica: { country: 'France', continent: 'Europe' },
    Crete: { country: 'Greece', continent: 'Europe' },
    Cuba: { country: 'Cuba', continent: 'North America' },
    Curacao: { country: 'Netherlands', continent: 'North America' },
    Cyprus: { country: 'Cyprus', continent: 'Asia' },
    Dominica: { country: 'Dominica', continent: 'North America' },
    'Easter Island': { country: 'Chile', continent: 'Oceania' },
    Elba: { country: 'Italy', continent: 'Europe' },
    Flores: { country: 'Indonesia', continent: 'Asia' },
    Gotland: { country: 'Sweden', continent: 'Europe' },
    'Gran Canaria': { country: 'Spain', continent: 'Africa' },
    'Great Britain': { country: 'United Kingdom', continent: 'Europe' },
    Greenland: { country: 'Denmark', continent: 'North America' },
    Guam: { country: 'United States', continent: 'Oceania' },
    Hispaniola: { country: 'Haiti, Dominican Republic', continent: 'North America' },
    Hokkaido: { country: 'Japan', continent: 'Asia' },
    Honshu: { country: 'Japan', continent: 'Asia' },
    Ibiza: { country: 'Spain', continent: 'Europe' },
    Iceland: { country: 'Iceland', continent: 'Europe' },
    Ireland: { country: 'Ireland, United Kingdom', continent: 'Europe' },
    'Isle of Man': { country: 'United Kingdom', continent: 'Europe' },
    Jamaica: { country: 'Jamaica', continent: 'North America' },
    Java: { country: 'Indonesia', continent: 'Asia' },
    Jeju: { country: 'South Korea', continent: 'Asia' },
    Kauai: { country: 'United States', continent: 'Oceania' },
    'Ko Chang': { country: 'Thailand', continent: 'Asia' },
    'Koh Samui': { country: 'Thailand', continent: 'Asia' },
    Kyushu: { country: 'Japan', continent: 'Asia' },
    Lanai: { country: 'United States', continent: 'Oceania' },
    Lesbos: { country: 'Greece', continent: 'Europe' },
    Lombok: { country: 'Indonesia', continent: 'Asia' },
    'Lord Howe Island': { country: 'Australia', continent: 'Oceania' },
    Luzon: { country: 'Philippines', continent: 'Asia' },
    Madagascar: { country: 'Madagascar', continent: 'Africa' },
    Madeira: { country: 'Portugal', continent: 'Africa' },
    Mallorca: { country: 'Spain', continent: 'Europe' },
    Malta: { country: 'Malta', continent: 'Europe' },
    Maupiti: { country: 'French Polynesia', continent: 'Oceania' },
    Maui: { country: 'United States', continent: 'Oceania' },
    Menorca: { country: 'Spain', continent: 'Europe' },
    Mindanao: { country: 'Philippines', continent: 'Asia' },
    Molokai: { country: 'United States', continent: 'Oceania' },
    Montserrat: { country: 'United Kingdom', continent: 'North America' },
    Moorea: { country: 'French Polynesia', continent: 'Oceania' },
    Nauru: { country: 'Nauru', continent: 'Oceania' },
    Nevis: { country: 'Saint Kitts and Nevis', continent: 'North America' },
    'New Guinea': { country: 'Indonesia, Papua New Guinea', continent: 'Oceania' },
    'New Zealand North Island': { country: 'New Zealand', continent: 'Oceania' },
    'New Zealand South Island': { country: 'New Zealand', continent: 'Oceania' },
    Niue: { country: 'Niue', continent: 'Oceania' },
    Norfolk: { country: 'Australia', continent: 'Oceania' },
    'Norfolk Island': { country: 'Australia', continent: 'Oceania' },
    'North Island': { country: 'New Zealand', continent: 'Oceania' },
    Oahu: { country: 'United States', continent: 'Oceania' },
    Palawan: { country: 'Philippines', continent: 'Asia' },
    Phuket: { country: 'Thailand', continent: 'Asia' },
    Pitcairn: { country: 'United Kingdom', continent: 'Oceania' },
    'Prince Edward Island': { country: 'Canada', continent: 'North America' },
    Rarotonga: { country: 'Cook Islands', continent: 'Oceania' },
    Rhodes: { country: 'Greece', continent: 'Europe' },
    Saba: { country: 'Netherlands', continent: 'North America' },
    Saipan: { country: 'United States', continent: 'Oceania' },
    Sakhalin: { country: 'Russia', continent: 'Asia' },
    Sardinia: { country: 'Italy', continent: 'Europe' },
    Shikoku: { country: 'Japan', continent: 'Asia' },
    Sicily: { country: 'Italy', continent: 'Europe' },
    'South Island': { country: 'New Zealand', continent: 'Oceania' },
    'Sri Lanka': { country: 'Sri Lanka', continent: 'Asia' },
    'St Helena': { country: 'United Kingdom', continent: 'Africa' },
    'St Lucia': { country: 'Saint Lucia', continent: 'North America' },
    'St Martin': { country: 'France, Netherlands', continent: 'North America' },
    Statia: { country: 'Netherlands', continent: 'North America' },
    Sulawesi: { country: 'Indonesia', continent: 'Asia' },
    Sumatra: { country: 'Indonesia', continent: 'Asia' },
    Sumbawa: { country: 'Indonesia', continent: 'Asia' },
    Tahiti: { country: 'French Polynesia', continent: 'Oceania' },
    Taiwan: { country: 'Taiwan', continent: 'Asia' },
    Tasmania: { country: 'Australia', continent: 'Oceania' },
    Tenerife: { country: 'Spain', continent: 'Africa' },
    Timor: { country: 'Timor-Leste, Indonesia', continent: 'Asia' },
    Tobago: { country: 'Trinidad and Tobago', continent: 'North America' },
    'Tristan da Cunha': { country: 'United Kingdom', continent: 'Africa' },
    Tubuai: { country: 'French Polynesia', continent: 'Oceania' },
    Ulleungdo: { country: 'South Korea', continent: 'Asia' },
    'Vancouver Island': { country: 'Canada', continent: 'North America' },
    Zakynthos: { country: 'Greece', continent: 'Europe' }
};

const targetPanel = document.querySelector('.island-target-map-panel');
const answerPanel = document.querySelector('.island-answer-map-panel');
const confirmButton = document.querySelector('#island-confirm');
const difficultyButtons = document.querySelectorAll('.island-difficulty');
const confettiLayer = document.querySelector('#confetti-layer');
const historyList = document.querySelector('#island-history-list');

const difficultySettings = {
    level1: { overlap: 0.34, targetPadding: 3 },
    level2: { overlap: 0.42, targetPadding: 2.5 },
    level3: { overlap: 0.52, targetPadding: 2.1 },
    level4: { overlap: 0.62, targetPadding: 1.8 },
    level5: { overlap: 0.72, targetPadding: 1.6 }
};

const state = {
    current: null,
    difficulty: 'level1',
    nextTimer: null,
    confettiTimer: null,
    history: [],
    decks: {}
};

let targetMap;
let answerMap;
let targetOutline;

function hashName(name) {
    return Array.from(name).reduce((hash, char) => hash + char.charCodeAt(0), 0);
}

function generatedIsland(seed, difficulty, index) {
    const labels = ['A', 'B', 'C', 'D', 'E'];
    const meta = islandMeta[seed.name] || {
        country: 'Unknown',
        continent: 'Unknown'
    };
    const radiusRanges = {
        level1: { min: 170, max: 900 },
        level2: { min: 65, max: 160 },
        level3: { min: 18, max: 60 },
        level4: { min: 8, max: 30 },
        level5: { min: 2, max: 9 }
    };
    const angle = (Math.PI * 2 * index) / labels.length + hashName(seed.name) * 0.01;
    const distanceKm = seed.radiusKm * (0.08 + index * 0.035);
    const latOffset = Math.sin(angle) * distanceKm / 111;
    const lngScale = Math.max(0.25, Math.cos(seed.lat * Math.PI / 180));
    const lngOffset = Math.cos(angle) * distanceKm / (111 * lngScale);
    const radiusFactors = [0.92, 0.82, 0.72, 0.62, 0.52];
    const radiusRange = radiusRanges[difficulty];
    const radiusKm = Math.max(
        radiusRange.min,
        Math.min(radiusRange.max, seed.radiusKm * radiusFactors[index])
    );

    return {
        id: `${difficulty}-${seed.name}-${labels[index]}`,
        name: seed.name,
        baseName: seed.name,
        difficulty,
        country: meta.country,
        continent: meta.continent,
        lat: Math.max(-85, Math.min(85, seed.lat + latOffset)),
        lng: Math.max(-180, Math.min(180, seed.lng + lngOffset)),
        radiusKm
    };
}

function buildQuestionBank(difficulty) {
    const seeds = islandQuestionSeeds[difficulty];
    const bank = [];

    while (bank.length < questionBankSize) {
        seeds.forEach((seed) => {
            for (let index = 0; index < 5 && bank.length < questionBankSize; index += 1) {
                bank.push(generatedIsland(seed, difficulty, index));
            }
        });
    }

    return bank;
}

const questionBanks = Object.fromEntries(
    Object.keys(islandQuestionSeeds).map((difficulty) => [difficulty, buildQuestionBank(difficulty)])
);

function shuffled(items) {
    const result = [...items];

    for (let index = result.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
    }

    return result;
}

function refillDeck(difficulty) {
    const deck = shuffled(questionBanks[difficulty]);

    if (state.current && deck.length > 1 && deck[0].id === state.current.id) {
        [deck[0], deck[1]] = [deck[1], deck[0]];
    }

    state.decks[difficulty] = deck;
}

function chooseIsland() {
    if (!state.decks[state.difficulty] || state.decks[state.difficulty].length === 0) {
        refillDeck(state.difficulty);
    }

    return state.decks[state.difficulty].shift();
}

function targetBounds(island) {
    return scaledIslandBounds(island, difficultySettings[state.difficulty].targetPadding);
}

function scaledIslandBounds(island, padding) {
    const latRadius = island.radiusKm / 111;
    const lngScale = Math.max(0.25, Math.cos(island.lat * Math.PI / 180));
    const lngRadius = island.radiusKm / (111 * lngScale);
    const south = Math.max(-85, island.lat - latRadius * padding);
    const north = Math.min(85, island.lat + latRadius * padding);
    const west = Math.max(-180, island.lng - lngRadius * padding);
    const east = Math.min(180, island.lng + lngRadius * padding);

    return [[south, west], [north, east]];
}

function createTileLayer() {
    return L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
        maxZoom: 10,
        subdomains: 'abcd'
    });
}

function clearPanelStates() {
    targetPanel.classList.remove('is-win', 'is-miss');
    answerPanel.classList.remove('is-win', 'is-miss');
}

function clearConfetti() {
    window.clearTimeout(state.confettiTimer);
    confettiLayer.innerHTML = '';
    confettiLayer.classList.remove('is-active', 'is-error');
}

function showNextIsland() {
    window.clearTimeout(state.nextTimer);
    clearConfetti();
    clearPanelStates();
    state.current = chooseIsland();
    targetMap.fitBounds(targetBounds(state.current), {
        animate: false,
        padding: [8, 8],
        maxZoom: 10
    });
    targetOutline.setBounds(scaledIslandBounds(state.current, 1));
}

function boundsArea(bounds) {
    const west = bounds.getWest();
    const east = bounds.getEast();
    const south = bounds.getSouth();
    const north = bounds.getNorth();
    const width = Math.max(0, east - west);
    const height = Math.max(0, north - south);
    return width * height;
}

function boundsOverlapRatio(targetBounds, answerBounds) {
    const west = Math.max(targetBounds.getWest(), answerBounds.getWest());
    const east = Math.min(targetBounds.getEast(), answerBounds.getEast());
    const south = Math.max(targetBounds.getSouth(), answerBounds.getSouth());
    const north = Math.min(targetBounds.getNorth(), answerBounds.getNorth());
    const overlapWidth = Math.max(0, east - west);
    const overlapHeight = Math.max(0, north - south);
    const targetArea = boundsArea(targetBounds);
    const answerArea = boundsArea(answerBounds);
    const referenceArea = Math.max(targetArea, answerArea);

    if (!referenceArea) {
        return 0;
    }

    return (overlapWidth * overlapHeight) / referenceArea;
}

function showFeedback(isCorrect) {
    clearConfetti();
    confettiLayer.classList.add('is-active');

    const feedback = document.createElement('div');
    feedback.className = `island-feedback ${isCorrect ? 'is-correct' : 'is-wrong'}`;

    const mark = document.createElement('span');
    mark.className = 'island-feedback-mark';
    mark.textContent = isCorrect ? '✔️' : '❌';
    feedback.append(mark);

    if (isCorrect && state.current) {
        const name = document.createElement('span');
        name.className = 'island-feedback-name';
        name.textContent = state.current.name;
        feedback.append(name);

        const meta = document.createElement('span');
        meta.className = 'island-feedback-meta';
        meta.textContent = `${state.current.country} · ${state.current.continent}`;
        feedback.append(meta);
    }

    confettiLayer.append(feedback);

    state.confettiTimer = window.setTimeout(clearConfetti, isCorrect ? 2600 : 1800);
}

function renderHistory() {
    if (!historyList) {
        return;
    }

    historyList.innerHTML = '';
    state.history.forEach((entry) => {
        const item = document.createElement('li');
        item.className = entry.isCorrect ? 'is-correct' : 'is-wrong';

        const result = document.createElement('span');
        result.className = 'island-history-result';
        result.textContent = entry.isCorrect ? 'Correct' : 'Wrong';

        const name = document.createElement('span');
        name.className = 'island-history-name';
        name.textContent = entry.name;

        const meta = document.createElement('span');
        meta.className = 'island-history-meta';
        meta.textContent = `${entry.country} · ${entry.continent}`;

        const place = document.createElement('span');
        place.className = 'island-history-place';
        place.append(name, meta);

        item.append(result, place);
        historyList.append(item);
    });
}

function recordHistory(isCorrect) {
    if (!state.current) {
        return;
    }

    state.history.unshift({
        isCorrect,
        name: state.current.name,
        country: state.current.country,
        continent: state.current.continent
    });

    renderHistory();
}

function confirmAnswer() {
    if (!state.current) {
        showFeedback(false);
        return;
    }

    clearPanelStates();

    const overlap = boundsOverlapRatio(targetMap.getBounds(), answerMap.getBounds());
    const isCorrect = overlap >= difficultySettings[state.difficulty].overlap;

    if (isCorrect) {
        targetPanel.classList.add('is-win');
        answerPanel.classList.add('is-win');
        recordHistory(true);
        showFeedback(true);
        state.nextTimer = window.setTimeout(showNextIsland, 2600);
    } else {
        answerPanel.classList.add('is-miss');
        recordHistory(false);
        showFeedback(false);
        state.nextTimer = window.setTimeout(() => {
            answerPanel.classList.remove('is-miss');
        }, 450);
    }
}

function setDifficulty(difficulty) {
    state.difficulty = difficulty;
    difficultyButtons.forEach((button) => {
        button.classList.toggle('is-active', button.dataset.difficulty === difficulty);
    });
    showNextIsland();
}

function initIslandGame() {
    if (!window.L) {
        return;
    }

    targetMap = L.map('island-target-map', {
        center: [18, 10],
        zoom: 2,
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        tap: false,
        touchZoom: false
    });

    answerMap = L.map('island-answer-map', {
        center: [18, 10],
        zoom: 2,
        minZoom: 2,
        maxZoom: 10,
        zoomControl: true,
        attributionControl: false,
        worldCopyJump: true
    });

    createTileLayer().addTo(targetMap);
    createTileLayer().addTo(answerMap);
    targetOutline = L.rectangle([[0, 0], [0, 0]], {
        color: '#000',
        weight: 2,
        opacity: 1,
        fill: false,
        interactive: false
    }).addTo(targetMap);
    difficultyButtons.forEach((button) => {
        button.addEventListener('click', () => setDifficulty(button.dataset.difficulty));
    });
    showNextIsland();
}

confirmButton.addEventListener('click', confirmAnswer);
initIslandGame();
