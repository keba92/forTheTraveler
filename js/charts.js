function createGraf(data){
    
    Highcharts.chart('container', {
        
        title: {
            text: `Изменение курса`
        },
    
        yAxis: {
            title: {
                text: 'Стоимость валюты'
            }
        },
    
        xAxis: {
            title: {
                text: 'Дата'
            }
        },
    
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
    
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                }
            }
        },
    
        series: [{
            name: selectAnaliz.value,
            data: data
        }],
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 1500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    
    });   
}