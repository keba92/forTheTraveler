const objId ={};
const nameCur = {};
onmessage = function(e){
    const check = JSON.parse(e.data);
    const urlDate = `https://www.nbrb.by/api/exrates/rates?ondate=${check}&periodicity=0`;
    if (!Array.isArray(check.current)){
        fetchData(urlDate);
    } else {
        check.current.forEach(async function (el){
            const urlPeriod = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${objId[el]}?startDate=${check.start}&endDate=${check.end}`;
            fetchData(urlPeriod,el);
        })
    }   
}

function fetchData(url,name = false){
    fetch(url)
        .then(response=> response.json())
        .then(data=> postMessage( JSON.stringify( dataPreparation(data,name) ) ))
        .catch((error) =>console.log(error))
}

function dataPreparation (data,name){
    const arr = [];
    data.forEach(el=>{
        const obj = {
            'Cur_Abbreviation' : el['Cur_Abbreviation'], 
            'Cur_Name' : el['Cur_Name'],
            'Cur_Scale' : el['Cur_Scale'],
            'Cur_OfficialRate': el['Cur_OfficialRate']
        }
        arr.push(obj);
        objId[el['Cur_Abbreviation']] = el['Cur_ID'];
        nameCur[el['Cur_Abbreviation']] = el['Cur_Name'];
    })
    if (name) return [arr,nameCur[name]];
    return arr;
}