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
    try {
      myWorker.postMessage(JSON.stringify('get_cur_data'));
      myWorker.onmessage = (e) => {
        const data = JSON.parse(e.data);
        sessionStorage.setItem('startAnalizCur', JSON.stringify(data));
        createOptionsConvert(data, selectAnaliz);
      };
    } catch (error) {
      const sessionData = sessionStorage.getItem('startAnalizCur');
      const funData = JSON.parse(sessionData);
      createOptionsConvert(funData, selectAnaliz);
    }
  }
  startDate.setAttribute('max', today);
  endDate.setAttribute('max', today);
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
  if (intervalRates === '28') {
    startDateRates.type = 'month';
    endDateRates.type = 'month';
  } else if (intervalRates === '365') {
    const today = new Date().getFullYear();
    startDateRates.type = 'number';
    endDateRates.type = 'number';
    endDateRates.hasAttribute('required');
    endDateRates.setAttribute('max', today);
    endDateRates.setAttribute('min', '1992');
    startDateRates.setAttribute('max', today);
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
    if (dateEndRates.length === 4) {
      rangeDate(`${dateStartRates}-01-01`, `${dateEndRates}-12-31`);
    } else if (intervalRates === '28') {
      rangeDate(`${dateStartRates}-01`, `${dateEndRates}-31`);
    } else {
      rangeDate(dateStartRates, dateEndRates);
    }
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
    if (interval !== '365' && interval !== '28') {
      while (data[0].length > interval) {
        arrDates.push(data[0][interval - 1]);
        const newArr = el.data.slice(0, interval);
        const result = newArr.reduce((sum, current) => (sum + current), 0);
        rates.push(Number((result / interval).toFixed(3)));
        data[0].splice(0, interval);
        el.data.splice(0, interval);
      }
      return { name: el.name, data: rates };
    } else if (interval === '28') {
      while (data[0].length >= interval) {
        const year = dates[0].slice(0, 4);
        const mounth = dates[0].slice(6, 7);
        const newInterval = new Date(year, mounth, 0).getDate();
        if (el.data.length < newInterval * 2 - 1) {
          arrDates.push(data[0][newInterval - 2]);
          const newArr = el.data.slice(0, newInterval);
          const result = newArr.reduce((sum, current) => (sum + current), 0);
          rates.push(Number((result / newInterval).toFixed(3)));
          data[0].splice(0, newInterval);
          el.data.splice(0, newInterval);
        } else {
          arrDates.push(data[0][newInterval - 1]);
          const newArr = el.data.slice(0, newInterval);
          const result = newArr.reduce((sum, current) => (sum + current), 0);
          rates.push(Number((result / newInterval).toFixed(3)));
          data[0].splice(0, newInterval);
          el.data.splice(0, newInterval);
        }
      }
      newDate = arrDates.map((elem) => {
        const day = new Date(elem);
        const optionDate = { year: 'numeric', month: 'long' };
        return day.toLocaleString('ru-RU', optionDate);
      });
      return { name: el.name, data: rates };
      // eslint-disable-next-line no-else-return
    } else {
      let i = Number(start);
      while (i <= Number(end)) {
        arrYears.push(i);
        i += 1;
      }
      let j = 0;
      while (j < arrYears.length) {
        const sdate = new Date(`${arrYears[j]}-01-01`);
        const edate = new Date(`${arrYears[j]}-12-31`);
        // eslint-disable-next-line max-len
        const newInterval = Math.round((Date.parse(edate) - Date.parse(sdate)) / (1000 * 60 * 60 * 24)) + 1;
        if (newInterval > el.data.length) {
          const newArr = el.data.slice(0, el.data.length);
          const result = newArr.reduce((sum, current) => (sum + current), 0);
          rates.push(Number((result / el.data.length).toFixed(3)));
          el.data.splice(0, el.data.length);
          j++;
        } else {
          const newArr = el.data.slice(0, newInterval);
          const result = newArr.reduce((sum, current) => (sum + current), 0);
          rates.push(Number((result / newInterval).toFixed(3)));
          el.data.splice(0, newInterval);
          j++;
        }
      }
      return { name: el.name, data: rates };
    }
  });
  switch (interval) {
    case '1':
      return [arrDates, res];
    case '7':
      return [arrDates, res];
    case '28':
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
    for (let i = 0; i < arrReturn.length; i++) {
      if (!arrReturn[i]) arrReturn[i] = 0;
    }
    resultCur.push({
      turboThreshold: dates.length,
      name: key,
      data: arrReturn
    });
  }
  return [dates, resultCur];
}
