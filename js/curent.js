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
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    const row = table.insertRow();
    const obj = data[i - 1];
    if (i > 0 && data.length - total < data.length - i) {
      table.rows[i].cells[0].innerHTML = obj.Cur_Abbreviation;
      table.rows[i].cells[1].innerHTML = obj.Cur_Name;
      table.rows[i].cells[2].innerHTML = obj.Cur_Scale;
      table.rows[i].cells[3].innerHTML = obj.Cur_OfficialRate;
    } else if (data.length - total >= data.length - i) {
      for (const key in obj) {
        const cell = row.insertCell();
        const text = document.createTextNode(obj[key]);
        cell.appendChild(text);
      }
    }
  }
}

function generateTable(data) {
  data.forEach((el) => {
    const row = table.insertRow();
    for (const key in el) {
      const cell = row.insertCell();
      const text = document.createTextNode(el[key]);
      cell.appendChild(text);
    }
  });
}
