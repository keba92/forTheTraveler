 const arrNav = document.querySelectorAll('a')
 arrNav.forEach(el=>{
    el.addEventListener('click', e =>{
        document.querySelector(`#${e.target.name}`).style.display = 'block';
        arrNav.forEach(elem =>{
            if(elem.name !== e.target.name ){
                document.querySelector(`#${elem.name}`).style.display = 'none';
                switch (e.target.id){
                    case 'cur':
                        startCurTable();
                        break;
                    case 'convers':
                        startConvert();
                        break;
                    case 'analiz':
                        startAnalizCur();
                        break;
                }
            }
        })
    })
 });