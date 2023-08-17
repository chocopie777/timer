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
let date = new Date();
themeBtn.addEventListener('click', (event) => {
    document.querySelector('.main').classList.toggle('theme-dark');
});

startBtn.addEventListener('click', (event) => {
    hours = hourInp.value;
    minutes = minInp.value;
    seconds = secInp.value;
    console.log(hours)
    console.log(minutes)
    console.log(seconds)
});
pauseBtn.addEventListener('click', (event) => {

});
resetBtn.addEventListener('click', (event) => {
    console.log('r');

});