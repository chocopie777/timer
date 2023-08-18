import Noty from 'noty';

const themeBtn = document.querySelector('.theme-btn');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const hourInp = document.getElementById('hour');
const minInp = document.getElementById('min');
const secInp = document.getElementById('sec');

let hours = 0;
let minutes = 0;
let seconds = 0;
let total_time = 0;

let timerId;

let isPause = true;

let audio = new Audio('./audio/audio-on.mp3');
let audioOff = new Audio('./audio/audio-off.mp3');

hourInp.oninput = function () {
    this.value = this.value.substring(0, 2);
}
minInp.oninput = function () {
    this.value = this.value.substring(0, 2);
}
secInp.oninput = function () {
    this.value = this.value.substring(0, 2);
}

if (JSON.parse(localStorage.getItem('dark-theme')) === true) {
    document.querySelector('.main').classList.add('theme-dark');
}

themeBtn.addEventListener('click', (event) => {
    if (localStorage.getItem('dark-theme') === null) {
        localStorage.setItem('dark-theme', JSON.stringify(false));
    }
    if (JSON.parse(localStorage.getItem('dark-theme')) === false) {
        document.querySelector('.main').classList.add('theme-dark');
        localStorage.setItem('dark-theme', JSON.stringify(true));
    } else {
        document.querySelector('.main').classList.remove('theme-dark');
        localStorage.setItem('dark-theme', JSON.stringify(false));
    }
});

startBtn.addEventListener('click', (event) => {
    if ((hourInp.value === '' || parseInt(hourInp.value) === 0)
        && (minInp.value === '' || parseInt(minInp.value) === 0)
        && (secInp.value === '' || parseInt(secInp.value) === 0)) {
        clearingFields();
        new Noty({
            theme: 'metroui',
            type: 'error',
            text: 'Поля таймера пусты или равны нулю',
            layout: 'bottomCenter',
            killer: true,
            timeout: 5000
        }).show();
        return;
    }

    if ((hourInp.value < 0 || hourInp.value > 99) || (minInp.value < 0 || minInp.value > 59)
        || (secInp.value < 0 || secInp.value > 59)) {
        clearingFields();
        let text = '';
        if (hourInp.value < 0 || hourInp.value > 99) {
            text = 'Значение "Hours" должно быть меньше или равно 99';
        } else {
            text = 'Значение "Minutes" и "Seconds" должно быть меньше или равно 59'
        }
        new Noty({
            theme: 'metroui',
            type: 'error',
            text: text,
            layout: 'bottomCenter',
            killer: true,
            timeout: 5000
        }).show();
        return;
    }

    startBtn.disabled = true;
    hourInp.disabled = true;
    minInp.disabled = true;
    secInp.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;

    audio.play();

    hours = hourInp.value > 0 ? hourInp.value : 0;
    minutes = minInp.value > 0 ? minInp.value : 0;
    seconds = secInp.value > 0 ? secInp.value : 0;

    total_time = (hours * 3600) + (minutes * 60) + parseInt(seconds);

    document.querySelector('.timer-indicator').setAttribute('class', 'timer-indicator timer-indicator--start');

    lengthCheck();

    displayTime();

    timerId = setInterval(timer, 1000);
});

pauseBtn.addEventListener('click', (event) => {
    clearInterval(timerId);

    if (isPause) {
        document.querySelector('.timer-indicator').setAttribute('class', 'timer-indicator timer-indicator--pause');
        isPause = false;
    } else {
        timerId = setInterval(timer, 1000);
        document.querySelector('.timer-indicator').setAttribute('class', 'timer-indicator timer-indicator--start');
        isPause = true;
    }
    audio.play();
});
resetBtn.addEventListener('click', (event) => {
    document.querySelector('.timer-indicator').setAttribute('class', 'timer-indicator');
    total_time = 0;
    preparingToTurnOffTheTimer();
    audio.play();
});

function timer() {
    total_time -= 1;
    if (total_time > 0) {
        let temp = total_time

        hours = Math.floor(temp / 3600);
        temp -= hours * 3600;

        minutes = Math.floor(temp / 60);
        temp -= minutes * 60;

        seconds = temp;

        lengthCheck();

        displayTime();
    } else {
        document.querySelector('.timer-indicator').setAttribute('class', 'timer-indicator');
        preparingToTurnOffTheTimer();
        audioOff.play();
    }
}

function displayTime() {
    hourInp.value = hours;
    minInp.value = minutes;
    secInp.value = seconds;
}

function lengthCheck() {
    if (String(hours).length < 2) {
        hours = addZero(hours);
    }
    if (String(minutes).length < 2) {
        minutes = addZero(minutes);
    }
    if (String(seconds).length < 2) {
        seconds = addZero(seconds);
    }
}

function addZero(value) {
    return '0' + value;
}

function preparingToTurnOffTheTimer() {
    clearingFields();
    clearInterval(timerId);
    startBtn.disabled = false;
    hourInp.disabled = false;
    minInp.disabled = false;
    secInp.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
}

function clearingFields() {
    hourInp.value = '';
    minInp.value = '';
    secInp.value = '';
}