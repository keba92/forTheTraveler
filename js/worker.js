const objId ={};
onmessage = function(e){
    const check = JSON.parse(e.data);
    const urlDate = `https://www.nbrb.by/api/exrates/rates?ondate=${check}&periodicity=0`;
    const urlPeriod = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${objId[check.current]}?startDate=${check.start}&endDate=${check.end}`;
    if (typeof(check)=="string"){
        fetchData(urlDate);
    } else {
        fetchData(urlPeriod);
    }  
}

function fetchData(url){
    console.log(url)
    fetch(url)
        .then(response=>response.json())
        .then(data=>{
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
            })
            return postMessage(JSON.stringify(arr));
        })
        .catch((error) =>console.log(error))
}