function createGraf(data) {
  Highcharts.chart('container', {
    title: {
      text: 'Изменение курса',
    },
    subtitle: {
      text: 'Источник: Национальный банк Республики Беларусь',
    },
    rangeSelector: {
      enabled: false
    },
    yAxis: {
      title: {
        text: 'Стоимость валюты',
      },
    },
    xAxis: {
      scrollbar: {
        enabled: true
      },
      categories: data[0],
      labels: {
        rotation: -45,
      },
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },
    series: data[1],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 2000,
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
          },
        },
      }],
    },
  });
}
