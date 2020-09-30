const selectAnaliz = document.querySelector('#choiseCur');
const startDate = document.querySelector('#startDate');
const endDate = document.querySelector('#endDate');
function startAnalizCur(){
    myWorker.postMessage(JSON.stringify('1'))
    myWorker.onmessage= function(e){
        const data = JSON.parse(e.data);
        createOptionsConvert(data,selectAnaliz);
    } 
}

function showAnaliz(){
    const arrCur = [];
    const objDate = [selectAnaliz.value,startDate.value,endDate.value]
    myWorker.postMessage(JSON.stringify(objDate))
    myWorker.onmessage = function(e){
        const dateArr = datesInRange(new Date(startDate.value), new Date(endDate.value));
        const data = JSON.parse(e.data);
        data.forEach((el,idx) => arrCur.push([dateArr[idx],el['Cur_OfficialRate']]));
        createGraf(arrCur);
    }
}

function datesInRange(dStrStart, dStrEnd) {
    const aDates = [];
    aDates.push(dStrStart);
    if(dStrStart <= dStrEnd) {
        for(let d = dStrStart; d <= dStrEnd; d.setDate(d.getDate() + 1)) {
            aDates.push(d);
        }
    }
    return aDates;
}