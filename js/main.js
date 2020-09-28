const listCur = document.querySelector('#listCur');
const convert = document.querySelector('#convert');
const analiz = document.querySelector('#analizCur');
 
 document.querySelector('.menu').addEventListener('click', e =>{
    switch (e.target.id){
        case 'main':
            console.log('main');
            break;
        case 'cur':
            analiz.style.display = 'none';
            convert.style.display = 'none';
            listCur.style.display = 'block';
            startCurTable();
            break;
        case 'convers':
            analiz.style.display = 'none';
            listCur.style.display = 'none';
            convert.style.display = 'block';
            startConvert();
            break;
        case 'analiz':
            convert.style.display = 'none';
            listCur.style.display = 'none';
            analiz.style.display = 'block';
            break;
    }
 });
