const selectAnaliz = document.querySelector('#choiseCur');
const startDate = document.querySelector('#startDate');
const endDate = document.querySelector('#endDate');
function startAnalizCur(){
    if (selectAnaliz.value == ''){
        myWorker.postMessage(JSON.stringify('get_data'))
        myWorker.onmessage= function(e){
            const data = JSON.parse(e.data);
            createOptionsConvert(data,selectAnaliz);
        } 
    }
}

function showAnaliz(){
    const arrCur = [];
    const objDate = {
        current : selectAnaliz.value, 
        start: startDate.value,
        end:endDate.value
    }
    myWorker.postMessage(JSON.stringify(objDate))
    myWorker.onmessage = function(e){
        const data = JSON.parse(e.data);
        const date = rangeDate(startDate.value,endDate.value);
        data.forEach(el => arrCur.push(el['Cur_OfficialRate']));
        createGraf([date,arrCur]);
    }
}

function rangeDate(sDate,eDate){
    const dStart = Date.parse(sDate);
    const dEnd = Date.parse(eDate);
    const aDates = [];
    for(let i=dStart; i<=dEnd; i=i+24*60*60*1000){
        aDates.push(new Date(i).toISOString().substr(0,10));
    }
    return aDates;
}