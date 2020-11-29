/* eslint-disable no-loop-func */
/* eslint-disable no-else-return */
const startDateRates = document.querySelector('#startDateRates');
const endDateRates = document.querySelector('#endDateRates');
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
    myWorker.postMessage(JSON.stringify('get_cur_data'));
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
  if (startDate.value && endDate.value) {
    rangeDate(startDate.value, endDate.value);
    prepData();
  } else {
    return alert('Введена некорректная дата');
  }
}

function changeDateInput() {
  const intervalRates = document.querySelector('#choise_intervalRates').value;
  if (intervalRates === '31') {
    startDateRates.type = 'month';
    endDateRates.type = 'month';
  } else if (intervalRates === '365') {
    const today = new Date().getFullYear();
    startDateRates.type = 'number';
    endDateRates.type = 'number';
    endDateRates.hasAttribute('required');
    endDateRates.setAttribute('max', today);
    startDateRates.setAttribute('min', '1992');
    startDateRates.value = '1992';
    endDateRates.value = today;
  } else {
    startDateRates.type = 'date';
    endDateRates.type = 'date';
  }
}

function pickMaxDateRate() {
  startDateRates.setAttribute('max', new Date(endDateRates.value).toISOString().split('T')[0]);
}

function pickMinDateRate() {
  endDateRates.setAttribute('min', new Date(startDateRates.value).toISOString().split('T')[0]);
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
  prepData();
}

function prepData() {
  const arrVal = [];
  const opt = document.querySelectorAll('#choiseCur option');
  opt.forEach((el) => {
    if (el.selected) arrVal.push(el.value);
  });
  if (arrVal.length === 0) return alert('Ни одна валюта не выбрана');
  const objDate = {
    current: arrVal,
    date: dates
  };
  spinnerPage.render();
  myWorker.postMessage(JSON.stringify(objDate));
  myWorker.onmessage = async (e) => {
    const data = await JSON.parse(e.data);
    const info = await correctData(data);
    await createGraf(info);
    spinnerPage.handleClear();
  };
}

function showAnalizRates() {
  const arrVal = [];
  const opt = document.querySelectorAll('#choiseCur option');
  opt.forEach((el) => {
    if (el.selected) arrVal.push(el.value);
  });
  const intervalRates = document.querySelector('#choise_intervalRates').value;
  const dateStartRates = document.querySelector('#startDateRates').value;
  const dateEndRates = document.querySelector('#endDateRates').value;
  if (dateStartRates && dateEndRates && intervalRates) {
    rangeDate(dateStartRates, dateEndRates);
    const objDate = {
      current: arrVal,
      date: dates
    };
    spinnerPage.render();
    myWorker.postMessage(JSON.stringify(objDate));
    myWorker.onmessage = async (e) => {
      const data = await JSON.parse(e.data);
      const info = await correctData(data);
      const rates = await prepRates(info, intervalRates, dateStartRates, dateEndRates);
      await createGraf(rates);
      await spinnerPage.handleClear();
    };
  } else {
    return alert('Введена некорректная дата');
  }
}

async function prepRates(data, interval, start, end) {
  const arrDates = [];
  const arrYears = [];
  let newDate = [];
  const res = data[1].map((el) => {
    const rates = [];
    if (interval !== '365') {
      while (data[0].length >= interval) {
        arrDates.push(data[0][interval - 1]);
        const newArr = el.data.slice(0, interval);
        const result = newArr.reduce((sum, current) => (sum + current), 0);
        rates.push(Number((result / interval).toFixed(3)));
        data[0].splice(0, interval);
        el.data.splice(0, interval);
      }
      if (interval === '31') {
        newDate = arrDates.map((elem) => {
          const day = new Date(elem);
          const optionDate = { year: 'numeric', month: 'long' };
          return day.toLocaleString('ru-RU', optionDate);
        });
        return { name: el.name, data: rates };
      // eslint-disable-next-line no-else-return
      } else {
        return { name: el.name, data: rates };
      }
    } else {
      while (el.data.length >= interval) {
        const newArr = el.data.slice(0, interval);
        const result = newArr.reduce((sum, current) => (sum + current), 0);
        rates.push(Number((result / interval).toFixed(3)));
        el.data.splice(0, interval);
      }
      let i = Number(start);
      while (i <= Number(end)) {
        arrYears.push(i);
        i += 1;
      }
      return { name: el.name, data: rates };
    }
  });
  switch (interval) {
    case '1':
      return [arrDates, res];
    case '7':
      return [arrDates, res];
    case '31':
      return [newDate, res];
    case '365':
      return [arrYears, res];
  }
}

function rangeDate(sDate, eDate) {
  const dStart = new Date(sDate);
  const dEnd = new Date(eDate);
  const daysLag = Math.ceil(Math.abs(dEnd.getTime() - dStart.getTime()) / (1000 * 3600 * 24));
  let dateParse = Date.parse(eDate);
  let i = 0;
  dates = [];
  while (i < daysLag + 1) {
    dates.unshift(new Date(dateParse).toISOString().substr(0, 10));
    dateParse -= 24 * 60 * 60 * 1000;
    i++;
  }
}

async function correctData(data) {
  const resultCur = [];
  for (const key in data) {
    const arrReturn = [];
    data[key].dateArr.forEach((el, index) => {
      const idx = dates.indexOf(el);
      arrReturn[idx] = data[key].resultArr[index];
    });
    resultCur.push({
      turboThreshold: dates.length + 1000,
      name: key,
      data: arrReturn
    });
  }
  return [dates, resultCur];
}
