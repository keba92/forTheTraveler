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
            setTimeout(spinnerPage.handleClear,2000)
        } 
    }
    startDate.setAttribute('max', today);
    endDate.setAttribute('max', today);
}

let dates;

function showAnaliz(){
    dates = rangeDate(startDate.value,endDate.value);
    prepData(startDate.value,endDate.value); 
}

function choiseInterval(){
    const selectInterval = document.querySelector('#choise_interval').value;  
    let dateNow = Date.now();
    let i = 0;
    dates = [];
    while(i<selectInterval){
        dates.push(new Date(dateNow).toISOString().substr(0,10));
        dateNow-=24*60*60*1000;
        i++;
    }
    prepData(dates[dates.length-1],dates[0])
}

async function prepData(start,end){
    const arrVal = [];
    const opt = document.querySelectorAll('#choiseCur option');
    opt.forEach(el=>{
        if (el.selected) arrVal.push(el.value);
    })
    const itog = [];
    let arrCur = [];
    const objDate = {
        current : arrVal, 
        start: start,
        end: end
    };
    myWorker.postMessage(JSON.stringify(objDate))
    myWorker.onmessage = await function(e){
        const data = JSON.parse(e.data);
        arrCur = []
        data.forEach(el => arrCur.push(el['Cur_OfficialRate']));
        itog.push(arrCur);
    }
    const sendArr = [];
    let tmpObj = {};
    let i = arrVal.length-1;
    setTimeout(() => {
        while(i >= 0){
            tmpObj = {};
            tmpObj.name = arrVal.reverse().pop();
            tmpObj.data = itog.reverse().pop();
            sendArr.push(tmpObj);
            i--
        };
        createGraf([dates,sendArr]);
    }, 1000);
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

