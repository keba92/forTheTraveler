radioInput.forEach((el) => {
  el.addEventListener('click', () => {
    radioInput.forEach((elem) => {
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
  dates = rangeDate(startDate.value, endDate.value);
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

function rangeDate(sDate, eDate) {
  const dStart = Date.parse(sDate);
  const dEnd = Date.parse(eDate);
  const aDates = [];
  for (let i = dStart; i <= dEnd; i += 24 * 60 * 6 * 1000) {
    aDates.push(new Date(i).toISOString().substr(0, 10));
  }
  return aDates;
}
