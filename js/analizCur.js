function pickMaxDate(){
    startDate.setAttribute('max', new Date(endDate.value).toISOString().split('T')[0]);
}
function pickMinDate(){
    endDate.setAttribute('min', new Date(startDate.value).toISOString().split('T')[0])
}
    
function startAnalizCur(){
    if (selectAnaliz.value == ''){
        spinnerPage.render()
        myWorker.postMessage(JSON.stringify('get_data'))
        myWorker.onmessage= function(e){
            const data = JSON.parse(e.data);
            createOptionsConvert(data,selectAnaliz);
            spinnerPage.handleClear()
        } 
    }
    startDate.setAttribute('max', today);
    endDate.setAttribute('max', today);
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