function createGraf(data){
    
    Highcharts.chart('container', {
        
        title: {
            text: `Изменение курса`
        },

        subtitle: {
            text: 'Источник: Национальный банк Республики Беларусь'
        },
    
        yAxis: {
            title: {
                text: 'Стоимость валюты'
            }
        },
    
        xAxis: {
            categories: data[0],
            labels: {
                rotation: -45
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
    
        series: data[1],
    
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