const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const state = {
    sequence: [],
    currentIndex: -1,
    level: 2,
    seconds: 3,
    letterCount: 1,
    score: 0,
    attempted: 0,
    history: [],
    hasSavedCurrentRun: false,
    timer: null,
    running: false,
    answeredCurrent: false
};

const currentLetter = document.querySelector('#current-letter');
const gameStatus = document.querySelector('#game-status');
const levelSelect = document.querySelector('#nback-level');
const secondsSelect = document.querySelector('#seconds-count');
const letterCountSelect = document.querySelector('#letter-count');
const answerInput = document.querySelector('#answer-input');
const startButton = document.querySelector('#start-game');
const resetButton = document.querySelector('#reset-game');
const historyToggle = document.querySelector('#history-toggle');
const form = document.querySelector('#nback-form');
const scoreStat = document.querySelector('#score-stat');
const accuracyStat = document.querySelector('#accuracy-stat');
const historyPanel = document.querySelector('#game-history');
const historyList = document.querySelector('#history-list');

function randomLetter() {
    return letters[Math.floor(Math.random() * letters.length)];
}

function randomLetterGroup() {
    return Array.from({ length: state.letterCount }, randomLetter).join('');
}

function expectedAnswer() {
    const targetIndex = state.currentIndex - state.level;
    return targetIndex >= 0 ? state.sequence[targetIndex] : null;
}

function setRunningControls(isRunning) {
    answerInput.disabled = !isRunning;
    levelSelect.disabled = isRunning;
    secondsSelect.disabled = isRunning;
    letterCountSelect.disabled = isRunning;
    startButton.disabled = isRunning;
    startButton.classList.toggle('is-running', isRunning);
}

function updateStats() {
    const accuracy = state.attempted ? Math.round((state.score / state.attempted) * 100) : 0;

    scoreStat.textContent = String(state.score);
    accuracyStat.textContent = `${accuracy}%`;
}

function currentAccuracy() {
    return state.attempted ? Math.round((state.score / state.attempted) * 100) : 0;
}

function renderHistory() {
    historyList.innerHTML = '';

    state.history.forEach((entry, index) => {
        const item = document.createElement('li');
        item.textContent = `${index + 1}. ${entry.score}/${entry.attempted} - ${entry.accuracy}% - n=${entry.level}, sec=${entry.seconds}, letters=${entry.letterCount}`;
        historyList.append(item);
    });
}

function saveCurrentRun() {
    if (!state.attempted || state.hasSavedCurrentRun) {
        return;
    }

    state.history.unshift({
        score: state.score,
        attempted: state.attempted,
        accuracy: currentAccuracy(),
        level: state.level,
        seconds: state.seconds,
        letterCount: state.letterCount
    });

    state.hasSavedCurrentRun = true;
    renderHistory();
}

function gradeCurrentAnswer() {
    if (!state.running || state.answeredCurrent) {
        return;
    }

    const expected = expectedAnswer();
    const answer = answerInput.value.trim().toUpperCase();
    const round = state.currentIndex + 1;

    state.answeredCurrent = true;

    if (!expected) {
        gameStatus.textContent = String(round);
        return;
    }

    state.attempted += 1;

    if (answer === expected) {
        state.score += 1;
        gameStatus.textContent = String(round);
    } else {
        gameStatus.textContent = String(round);
    }

    updateStats();
}

function finishGame() {
    clearInterval(state.timer);
    state.timer = null;
    state.running = false;
    setRunningControls(false);
    answerInput.value = '';
    updateStats();
}

function showNextLetter() {
    if (state.currentIndex >= 0 && !state.answeredCurrent) {
        gradeCurrentAnswer();
    }

    state.currentIndex += 1;
    state.sequence.push(randomLetterGroup());
    state.answeredCurrent = false;
    currentLetter.textContent = state.sequence[state.currentIndex];
    answerInput.value = '';
    answerInput.focus();

    gameStatus.textContent = String(state.currentIndex + 1);

    updateStats();
}

function startGame() {
    saveCurrentRun();
    clearInterval(state.timer);
    state.sequence = [];
    state.currentIndex = -1;
    state.level = Number(levelSelect.value);
    state.seconds = Number(secondsSelect.value);
    state.letterCount = Number(letterCountSelect.value);
    answerInput.maxLength = state.letterCount;
    state.score = 0;
    state.attempted = 0;
    state.hasSavedCurrentRun = false;
    state.running = true;
    state.answeredCurrent = true;
    setRunningControls(true);
    showNextLetter();
    state.timer = setInterval(showNextLetter, state.seconds * 1000);
}

function resetGame() {
    saveCurrentRun();
    clearInterval(state.timer);
    state.sequence = [];
    state.currentIndex = -1;
    state.score = 0;
    state.attempted = 0;
    state.hasSavedCurrentRun = false;
    state.running = false;
    state.answeredCurrent = false;
    state.letterCount = Number(letterCountSelect.value);
    answerInput.maxLength = state.letterCount;
    currentLetter.textContent = '?';
    answerInput.value = '';
    setRunningControls(false);
    gameStatus.textContent = '';
    state.seconds = Number(secondsSelect.value);
    updateStats();
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
});

answerInput.addEventListener('input', () => {
    answerInput.value = answerInput.value.toUpperCase().replace(/[^A-Z]/g, '');

    if (answerInput.value.length >= state.letterCount) {
        gradeCurrentAnswer();
    }
});

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);
historyToggle.addEventListener('click', () => {
    historyPanel.hidden = !historyPanel.hidden;
});
secondsSelect.addEventListener('change', resetGame);
letterCountSelect.addEventListener('change', resetGame);

resetGame();
