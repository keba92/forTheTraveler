/* eslint-disable new-parens */
let infoData;
function startConvert() {
  if (selectS.value === '' || selectV === '') {
    spinnerPage.render();
    myWorker.postMessage(JSON.stringify('get_data'));
    myWorker.onmessage = (e) => {
      const data = JSON.parse(e.data);
      createOptionsConvert(data, selectS);
      createOptionsConvert(data, selectV);
      setTimeout(spinnerPage.handleClear, 2000);
    };
  }
}

function createOptionsConvert(optData, select) {
  // eslint-disable-next-line max-len
  const unique = optData.filter(((set) => (el) => !set.has(el.Cur_Abbreviation) && set.add(el.Cur_Abbreviation))(new Set()));
  unique.map((el) => {
    const option = document.createElement('option');
    option.text = el.Cur_Name;
    option.value = el.Cur_Abbreviation;
    select.appendChild(option);
  });
}

function dataGet() {
  if (selectS.value && selectV.value) {
    if (!infoData) {
      myWorker.postMessage(JSON.stringify('get_data'));
      myWorker.onmessage = (e) => {
        const data = JSON.parse(e.data);
        infoData = data;
        dataForCalculate(data);
      };
    } else {
      dataForCalculate(infoData);
    }
  } else {
    return alert('Выберите валюты для конвертации');
  }
}

function dataForCalculate(data) {
  const inputSum = document.querySelector('#summa').value;
  const inputItogo = document.querySelector('#itogo');
  let val1;
  let val2;
  data.forEach((el) => {
    if (el.Cur_Abbreviation === selectS.value) {
      val1 = el.Cur_OfficialRate / el.Cur_Scale;
    } else if (el.Cur_Abbreviation === selectV.value) {
      val2 = el.Cur_OfficialRate / el.Cur_Scale;
    }
  });
  const itogo = Math.ceil(((val1 * Number(inputSum)) / val2) * 100) / 100;
  inputItogo.value = itogo;
}
