/* eslint-disable max-len */
/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint-disable-next no-unused-expressions */
const objId = {};
const nameCur = {};
onmessage = (e) => {
  const check = JSON.parse(e.data);
  const urlDate = `https://www.nbrb.by/api/exrates/rates?ondate=${check}&periodicity=0`;
  if (check === 'get_cur_data') {
    (async () => {
      const data = await getCurrencyList();
      return postMessage(JSON.stringify(data));
    })();
  } else if (check instanceof Object) {
    newVersion(check);
  } else {
    fetchData(urlDate);
  }
};

function fetchData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      postMessage(JSON.stringify(dataPreparation(data, name)));
    })
    .catch((error) => console.log(error));
}

function dataPreparation(data) {
  const arr = [];
  data.forEach((el) => {
    const obj = {
      Cur_Abbreviation: el.Cur_Abbreviation,
      Cur_Name: el.Cur_Name,
      Cur_Scale: el.Cur_Scale,
      Cur_OfficialRate: el.Cur_OfficialRate,
    };
    arr.push(obj);
    objId[el.Cur_Abbreviation] = el.Cur_ID;
  });
  return arr;
}

function checkId(link) {
  fetch(link)
    .then((response) => response.json())
    .then((data) => {
      const keys = Object.keys(objId);
      data.forEach((el) => {
        if (keys.includes(el.Cur_Abbreviation) && el.Cur_ID !== objId[el.Cur_Abbreviation]) {
          objId[el.Cur_Abbreviation] = el.Cur_ID;
        }
      });
    })
    .catch((error) => console.log(error));
}

async function newVersion(data) {
  const sendData = {};
  for (let i = 0; i < data.current.length; i++) {
    const res = await newDate(data.current[i], data.date);
    const cur = await getCurrencyList()
      .then(filter)
      // eslint-disable-next-line no-return-await
      .then(async (obj) => await correctID(res, obj))
      .then(async (dateID) => {
        const arrID = Object.keys(dateID);
        const objResult = {
          resultArr: [],
          dateArr: []
        };
        for (let j = 0; j < arrID.length; j++) {
          while (dateID[arrID[j]].length > 0) {
            if (dateID[arrID[j]].length > 365) {
              const current = await getCurrencyData(arrID[j], dateID[arrID[j]][0], dateID[arrID[j]][364]);
              if (objResult.resultArr.length === 0) {
                objResult.resultArr = current.cur;
                objResult.dateArr = current.date;
              } else {
                objResult.resultArr = objResult.resultArr.concat(current.cur);
                objResult.dateArr = objResult.dateArr.concat(current.date);
              }
              dateID[arrID[j]].splice(0, 365);
            } else {
              const current = await getCurrencyData(arrID[j], dateID[arrID[j]][0], dateID[arrID[j]][dateID[arrID[j]].length - 1]);
              if (objResult.resultArr.length === 0) {
                objResult.resultArr = current.cur;
                objResult.dateArr = current.date;
              } else {
                objResult.resultArr = objResult.resultArr.concat(current.cur);
                objResult.dateArr = objResult.dateArr.concat(current.date);
              }
              dateID[arrID[j]].splice(0, dateID[arrID[j]].length);
            }
          }
        }
        return objResult;
      });
    sendData[nameCur[data.current[i]]] = cur;
  }
  postMessage(JSON.stringify(sendData));
}

function newDate(cur, date) {
  const promise = new Promise((resolve) => {
    const objDate = {};
    date.forEach((el) => {
      const newDay = new Date(el);
      const year = newDay.getFullYear();
      if (!objDate[year]) {
        objDate[year] = [];
        objDate[year].push(el);
      } else {
        objDate[year].push(el);
      }
    });
    return resolve([cur, objDate]);
  });
  return promise;
}

async function getCurrencyList() {
  try {
    const response = await fetch('https://www.nbrb.by/api/exrates/currencies');
    const currencyData = await response.json();
    return currencyData;
  } catch (error) { console.log(error); }
}

function filter(arr) {
  const resultArr = {};
  arr.forEach((el) => {
    nameCur[el.Cur_Abbreviation] = el.Cur_Name;
    if (!resultArr[el.Cur_Abbreviation]) {
      resultArr[el.Cur_Abbreviation] = [];
    }
    resultArr[el.Cur_Abbreviation].push({
      code: el.Cur_ID,
      startDate: el.Cur_DateStart,
      endDate: el.Cur_DateEnd,
    });
  });
  return resultArr;
}

async function correctID(date, cur) {
  const result = {};
  const obj = date[1];
  cur[date[0]].forEach((el) => {
    const dinamicID = el.code;
    const arrDate = [];
    const sdateInterval = new Date(el.startDate).getTime();
    const edateInterval = new Date(el.endDate).getTime();
    for (const key in obj) {
      obj[key].forEach((elem) => {
        const elemDate = new Date(elem).getTime();
        if (sdateInterval <= elemDate && elemDate <= edateInterval) {
          arrDate.push(elem);
        }
      });
    }
    if (arrDate.length !== 0) result[dinamicID] = arrDate;
  });
  return result;
}

function getCurrencyData(id, start, end) {
  const url = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${id}?startDate=${start}&endDate=${end}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const objResult = {
        cur: [],
        date: []
      };
      data.forEach((el) => {
        objResult.cur.push(el.Cur_OfficialRate);
        const newFormat = el.Date.split('').slice(0, 10).join('');
        objResult.date.push(newFormat);
      });
      return objResult;
    })
    .catch((error) => console.log(error));
}
