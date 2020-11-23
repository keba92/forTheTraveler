const spinner = document.querySelector('.spinner');
const arrNav = document.querySelectorAll('a');
const myWorker = new Worker('./js/worker.js');
const table = document.querySelector('#table');
const date = document.querySelector('#dateCur');
const selectS = document.querySelector('#from');
const selectV = document.querySelector('#to');
const selectAnaliz = document.querySelector('#choiseCur');
const startDate = document.querySelector('#startDate');
const endDate = document.querySelector('#endDate');
const today = new Date().toISOString().split('T')[0];
const radioInput = document.querySelectorAll('div p input[name="timeRates"]');
const radioInputTime = document.querySelectorAll('div p input[name="time"]');
const choiseDateRate = document.querySelectorAll('div input[class="rate"]');
const startDateRates = document.querySelector('#startDateRates');
const endDateRates = document.querySelector('#endDateRates');
let dates;

document.querySelectorAll('a').forEach((el) => {
  el.addEventListener('click', (e) => {
    arrNav.forEach((element) => {
      document.querySelector(`#${element.name}`).style.display = 'none';
    });
    document.querySelector(`#${e.target.name}`).style.display = 'block';
    switch (e.target.id) {
      case 'cur':
        startCurTable();
        break;
      case 'convers':
        startConvert();
        break;
      case 'analiz':
        startAnalizCur();
        break;
    }
  });
});
