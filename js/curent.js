function getDate() {
  const today = new Date().toISOString().split('T')[0];
  date.setAttribute('max', today);
  return date.valueAsDate = new Date();
}

function getDataCur() {
  if (date.value !== '') {
    spinnerPage.render();
    myWorker.postMessage(JSON.stringify(date.value));
    myWorker.onmessage = (e) => {
      changeGenerateTable(JSON.parse(e.data));
      setTimeout(spinnerPage.handleClear, 2000);
    };
  } else {
    spinnerPage.render();
    getDate();
    myWorker.postMessage(JSON.stringify('get_data'));
    myWorker.onmessage = (e) => {
      generateTable(JSON.parse(e.data));
      setTimeout(spinnerPage.handleClear, 2000);
    };
  }
}

function startCurTable() {
  if (!table.hasChildNodes()) {
    getDataCur();
    generateTableHead();
  }
}

function generateTableHead() {
  const thead = table.createTHead();
  thead.classList.add('thead-dark');
  const row = thead.insertRow();
  const thName = [
    'Аббревиатура валюты',
    'Наименование валюты',
    'Количество единиц иностранной валюты',
    'Установленный курс валют, руб.',
  ];
  thName.forEach((el) => {
    const th = document.createElement('th');
    const text = document.createTextNode(el);
    th.appendChild(text);
    row.appendChild(th);
  });
}

function changeGenerateTable(data) {
  const total = table.rows.length;
  for (let i = 0; i < total; i++) {
    const obj = data[i - 1];
    if (i > 0) {
      table.rows[i].cells[3].innerHTML = obj.Cur_OfficialRate;
    }
  }
}

function generateTable(data) {
  data.forEach((el) => {
    const row = table.insertRow();
    for (key in el) {
      const cell = row.insertCell();
      const text = document.createTextNode(el[key]);
      cell.appendChild(text);
    }
  });
}
