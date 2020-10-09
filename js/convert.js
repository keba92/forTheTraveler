const selectS = document.querySelector('#from');
const selectV = document.querySelector('#to');

function startConvert (){
    if(selectS.value == ''|| selectV == ''){
        myWorker.postMessage(JSON.stringify('get_data'))
        myWorker.onmessage= function(e){
            const data = JSON.parse(e.data);
            createOptionsConvert(data,selectS);
            createOptionsConvert(data,selectV);
        } 
    }
}

function createOptionsConvert(optData,select){
    optData.map(el=>{
        const option = document.createElement('option');
        option.text = el['Cur_Name'];
        option.value = el['Cur_Abbreviation'];
        select.appendChild(option);
    })
}

function dataForCalculate(){
    const inputSum = document.querySelector('#summa').value;
    const inputItogo = document.querySelector('#itogo');
    if(inputSum){
        myWorker.postMessage(JSON.stringify('get_data'))
        myWorker.onmessage= function(e){
            const data = JSON.parse(e.data);
            let val1, val2;
            data.forEach(el=>{
                if (el['Cur_Abbreviation']==selectS.value){
                    val1 = el['Cur_OfficialRate']/el['Cur_Scale'];
                } else if (el['Cur_Abbreviation']==selectV.value){
                    val2 = el['Cur_OfficialRate']/el['Cur_Scale'];
                }
            })
        const itogo = Math.ceil((val1*Number(inputSum))/val2*100)/100;
        inputItogo.value = itogo;
        }
    }
}
