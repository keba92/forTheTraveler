# forTheTraveler

v.0.8.2

### Данное SPA является итоговым проектом IT-Academy по курсу "Веб приложение на Javascript".

## Технические нюансы веб-приложения:

- Данные о курсах валют получены от API "Национального банка Республики Беларусь" (nbrb.by).
- Запросы к API осуществляются в отдельном потоке с помощью Worker.
- Для визуализации графиков используется библиотека Highcharts.
- Стилизация некоторых элементов SPA выполнена с помощью библиотеки Bootstrap.
- Для придания некоторой нативности данному приложению, был использован Service Worker.
- Для анализа качества кода, был использован ESLint с конфигурациями eslint-config-airbnb-base.

## Навигация по веб-приложению:

- Вкладка "Главная страница" - содержится краткая информация о данном веб-приложении.
- Вкладка "Список курсов валют" - таблица с курсами валют на выбранную дату.
- Вкладка "Конвертер валют" - интерфес для конвертации между двумя выбранными валютами.
- Вкладка "Анализ валют" - анализ изменения курса валюты за выбранный промежуток времени.

Link : [Netlify](https://forthetraveler.netlify.app/)