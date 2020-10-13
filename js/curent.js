const myWorker = new Worker('./js/worker.js');
const table = document.querySelector('#table');
const date = document.querySelector('#dateCur');

function getDate(){
    return date.valueAsDate = new Date();
}

function getDataCur(){
    if (date.value != ''){
        myWorker.postMessage(JSON.stringify(date.value))
        myWorker.onmessage= function(e){
           changeGenerateTable(JSON.parse(e.data));
        } 
    }else{
        getDate()
        myWorker.postMessage(JSON.stringify('get_data'))
        myWorker.onmessage= function(e){
           generateTable(JSON.parse(e.data));
        }
    }
}

function startCurTable (){
    if (!table.hasChildNodes()){
        getDataCur();
        generateTableHead();
    }    
} 

function generateTableHead() {
    const thead = table.createTHead();
    const row = thead.insertRow();
    const thName = ['Аббревиатура валюты','Наименование валюты','Количество единиц иностранной валюты', 'Установленый курс валют, руб.']
    thName.forEach(el => {
        const th = document.createElement("th");
        const text = document.createTextNode(el);
        th.appendChild(text);
        row.appendChild(th);
    })
}

function changeGenerateTable(data){
    const total = table.rows.length;
    for(let i=0; i<total; i++){
        let obj = data[i-1];
        if(i > 0){
            table.rows[i].cells[3].innerHTML = obj['Cur_OfficialRate'];
        }
    }
}


function generateTable(data) {
    data.forEach(el=>{
        const row = table.insertRow();
        for (key in el) {
            const cell = row.insertCell();
            const text = document.createTextNode(el[key]);
            cell.appendChild(text);
        }
    })
}
