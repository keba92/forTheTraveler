radioInput.forEach((el) => {
  el.addEventListener('click', () => {
    radioInput.forEach((elem) => {
      document.querySelector(`.${elem.value}`).style.display = 'none';
    });
    if (el.checked) {
      const selectCur = document.querySelector('#choiseCur');
      if (el.value === 'rates') {
        selectCur.removeAttribute('multiple');
      } else {
        selectCur.setAttribute('multiple', 'multiple');
      }
      document.querySelector(`.${el.value}`).style.display = 'block';
    }
  });
});

radioInputTime.forEach((el) => {
  el.addEventListener('click', () => {
    radioInputTime.forEach((elem) => {
      document.querySelector(`#${elem.value}`).style.display = 'none';
    });
    if (el.checked) {
      document.querySelector(`#${el.value}`).style.display = 'block';
    }
  });
});

function pickMaxDate() {
  startDate.setAttribute('max', new Date(endDate.value).toISOString().split('T')[0]);
}

function pickMinDate() {
  endDate.setAttribute('min', new Date(startDate.value).toISOString().split('T')[0]);
}

function startAnalizCur() {
  if (selectAnaliz.value === '') {
    spinnerPage.render();
    myWorker.postMessage(JSON.stringify('get_data'));
    myWorker.onmessage = (e) => {
      const data = JSON.parse(e.data);
      createOptionsConvert(data, selectAnaliz);
      setTimeout(spinnerPage.handleClear, 2000);
    };
  }
  startDate.setAttribute('max', today);
  endDate.setAttribute('max', today);
}

function showAnaliz() {
  rangeDate(startDate.value, endDate.value);
  prepData(startDate.value, endDate.value);
}

function choiseInterval() {
  const selectInterval = document.querySelector('#choise_interval').value;
  let dateNow = Date.now();
  let i = 0;
  dates = [];
  while (i < selectInterval) {
    dates.unshift(new Date(dateNow).toISOString().substr(0, 10));
    dateNow -= 24 * 60 * 60 * 1000;
    i++;
  }
  prepData(dates[0], dates[dates.length - 1]);
}

function prepData(first, last) {
  const arrVal = [];
  let arrCur = [];
  const sendArr = [];
  let tmpObj = {};
  const opt = document.querySelectorAll('#choiseCur option');
  opt.forEach((el) => {
    if (el.selected) arrVal.push(el.value);
  });
  const objDate = {
    current: arrVal,
    start: first,
    end: last,
  };
  spinnerPage.render();
  myWorker.postMessage(JSON.stringify(objDate));
  myWorker.onmessage = (e) => {
    const data = JSON.parse(e.data);
    arrCur = [];
    data[0].forEach((el) => arrCur.push(el.Cur_OfficialRate));
    tmpObj = {
      name: data[1],
      data: arrCur,
    };
    sendArr.push(tmpObj);
  };
  setTimeout(() => {
    createGraf([dates, sendArr]);
    spinnerPage.handleClear();
  }, 1800);
}

function showAnalizRates() {
  const arrVal = [];
  let rates;
  const opt = document.querySelectorAll('#choiseCur option');
  opt.forEach((el) => {
    if (el.selected) arrVal.push(el.value);
  });
  const intervalRates = document.querySelector('#choise_intervalRates');
  const dateStartRates = document.querySelector('#startDateRates');
  const dateEndRates = document.querySelector('#endDateRates');
  rangeDate(dateStartRates.value, dateEndRates.value);
  const arrDates = [];
  while (dates.length > 0) {
    arrDates.push(dates[0]);
    dates.splice(0, intervalRates.value);
  }
  const objDate = {
    current: arrVal,
    start: arrDates[0],
    end: arrDates[arrDates.length - 1],
  };
  spinnerPage.render();
  myWorker.postMessage(JSON.stringify(objDate));
  myWorker.onmessage = (e) => {
    const data = JSON.parse(e.data);
    rates = prepRates(data, arrDates, intervalRates.value, arrVal);
  };
  setTimeout(() => {
    createGraf(rates);
    spinnerPage.handleClear();
  }, 1800);
}

function prepRates(arrData, arrDates, interval, val) {
  const arrCur = [];
  const rates = [];
  arrData[0].forEach((el) => arrCur.push(el.Cur_OfficialRate));
  while (arrCur.length > interval) {
    const newArr = arrCur.slice(0, interval);
    const result = newArr.reduce((sum, current) => (sum + current), 0);
    rates.push(Number((result / interval).toFixed(3)));
    arrCur.splice(0, interval);
  }
  if (interval === '31') {
    const newDate = arrDates.map((el) => {
      const day = new Date(el);
      const optionDate = { year: 'numeric', month: 'long' };
      return day.toLocaleString('ru-RU', optionDate);
    });
    return [newDate, [{ name: val, data: rates }]];
  // eslint-disable-next-line no-else-return
  } else if (interval === '365') {
    const newDate = arrDates.map((el) => {
      const day = new Date(el);
      const optionDate = { year: 'numeric' };
      return day.toLocaleString('ru-RU', optionDate);
    });
    return [newDate, [{ name: val, data: rates }]];
  } else {
    return [arrDates, [{ name: val, data: rates }]];
  }
}

function rangeDate(sDate, eDate) {
  const dStart = new Date(sDate);
  const dEnd = new Date(eDate);
  const daysLag = Math.ceil(Math.abs(dEnd.getTime() - dStart.getTime()) / (1000 * 3600 * 24));
  let dateParse = Date.parse(eDate);
  let i = 0;
  dates = [];
  while (i < daysLag) {
    dates.unshift(new Date(dateParse).toISOString().substr(0, 10));
    dateParse -= 24 * 60 * 60 * 1000;
    i++;
  }
}
