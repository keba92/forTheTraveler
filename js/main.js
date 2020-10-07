const listCur = document.querySelector('#listCur');
const convert = document.querySelector('#convert');
const analiz = document.querySelector('#analizCur');
const main = document.querySelector('#mainPage');
 
 document.querySelector('.menu').addEventListener('click', e =>{
    switch (e.target.id){
        case 'cur':
            analiz.style.display = 'none';
            convert.style.display = 'none';
            main.style.display = 'none';
            listCur.style.display = 'block';
            startCurTable();
            break;
        case 'convers':
            analiz.style.display = 'none';
            listCur.style.display = 'none';
            main.style.display = 'none';
            convert.style.display = 'block';
            startConvert();
            break;
        case 'analiz':
            convert.style.display = 'none';
            listCur.style.display = 'none';
            main.style.display = 'none';
            analiz.style.display = 'block';
            startAnalizCur();
            break;
        case 'main':
            convert.style.display = 'none';
            listCur.style.display = 'none'; 
            analiz.style.display = 'none';
            main.style.display = 'block';
            break;
    }
 });
