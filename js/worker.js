onmessage = function(e){
    const check = JSON.parse(e.data);
    const url = `https://www.nbrb.by/api/exrates/rates?ondate=${check}&periodicity=0`;
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
            })
            return postMessage(JSON.stringify(arr));
        })
        .catch((error) =>console.log(error))
}