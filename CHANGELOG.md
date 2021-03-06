# Changelog
All notable changes to this project will be documented in this file.

The format is based on forthetraveler.netlify.app(https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
## [0.8.4] - 2020-12-01
### Changed

- Corrected output of average exchange rate data by months.


## [0.8.3] - 2020-12-01
### Changed

- Corrected the output of the average exchange rate data by year.


## [0.8.2] - 2020-11-30
### Changed

- Changed the function to more accurately calculate the average value of currencies.
- Fixed bug with cropped graph.


## [0.8.1] - 2020-11-29
### Changed

- Removed unused functions.


## [0.8.0] - 2020-11-29
### Changed

- Fixed bug with missing dates.
- The correct work of the serwice worker is configured.

## [0.7.9] - 2020-11-28
### Changed

- Сonverted requests to obtain data on currencies, taking into account the changing ID for currencies.
- Considered the logic of missing exchange rates for some dates.


## [0.7.8] - 2020-11-24
### Changed

- Еliminated possible errors when entering parameters that did not correspond to the requests.


## [0.7.7] - 2020-11-24
### Changed

- Еliminated possible errors when entering parameters that did not correspond to the requests.
- Work of the site as a full-fledged PWA.


## [0.7.6] - 2020-11-24
### Changed

- The list of files for loading into the cache has been expanded.
- Work of the site as a full-fledged PWA.
- Returned screen orientation view for mobile devices "landscape".


## [0.7.5] - 2020-11-23
### Changed

- Еliminated possible errors when entering parameters that did not correspond to the requests.
- Work of the site as a full-fledged PWA.


## [0.7.4] - 2020-11-23
### Changed

- Fixed errors in the manifest.json file.
- Work of the site as a full-fledged PWA.


## [0.7.3] - 2020-11-23
### Changed

- Correct manifest.


## [0.7.2] - 2020-11-23
### Changed

- Correct name.


## [0.7.1] - 2020-11-23

### Changed

- Changed serwice worker.
- Added manifest.json.
- Correct analizCur.js.


## [0.7.0] - 2020-11-18
### Added

- It became possible to view the average exchange rate for the period.
- To analyze the quality of the code, ESLint was used with the eslint-config-airbnb-base configurations.

### Changed

- Minimally changed design.
- added functionality to eliminate the difference in ID for a different period of time.


## [0.6.0] - 2020-11-03
### Added

- Added the ability to select multiple currencies for analysis, as well as the ability to select different types of periodicity.
- To analyze the quality of the code, ESLint was used with the eslint-config-airbnb-base configurations.
- Added .gitignore to filter files uploaded to github.

### Changed

- Minimally changed design.
- Fixed bugs with displaying charts (currencies were incorrectly indicated).

### Removed

- Unnecessary pictures and icons have been removed.

## [0.5.3] - 2020-10-30

### Changed

- Fixed a bug with incorrect display of charts.

## [0.5.2] - 2020-10-29

### Changed

- Correct dates in the charts.

## [0.5.1] - 2020-10-29

### Changed

- Minimally changed design.
- It became possible to select several currencies for analysis.

## [0.5.0] - 2020-10-27
### Added

- In the Currency Analysis tab, you can now select an interval.

### Changed

- The structure of the SPA menu has been changed.
- To minimize requests to the API when converting currencies, a state simulation was implemented to store the exchange rate after the first request to the API.
- Added a timeout for a spinner when loading data.

### Removed

- Scroll to content when clicking on tabs.

## [0.4.0] - 2020-10-17
### Added

- Added a spinner when loading data from API.
- Added page style.
- Added service worker.

### Changed

- Set restrictions when choosing dates in input type = date.

## [0.3.2] - 2020-10-09

- Moved "then" to a separate function in "worker.js".
- In "main.js" the tab switching function has been changed.
- In "analizCur.js" functions have been changed to avoid creating additional context.

### Changed

- Fixed a bug with drawing graphs of currency changes.

## [0.3.1] - 2020-10-07

### Changed

- Fixed a bug with drawing graphs of currency changes.

## [0.3.0] - 2020-10-07
### Added

- Added "Main page" tab;

### Changed

- Сhanged the style of the navigation menu.
- The request to the worker is formed as an object.
- Changed currency conversion table.

## [0.2.0] - 2020-09-30
### Added

- File analizCur.js, allows you to analyze the change in the exchange rate for a selected period of time.
- File charts.js, allows you to visualize graphs of currency changes.

### Changed

- Added the analiz block to index.html and included the highcharts.com library.
- Added classes to style.css for visualizing charts.
- Added the ability to get worker.js data using two urls.

## [0.1.0] - 2020-09-28
### Added

- File main.js which allows you to change the content in the SPA, depending on the selected tab.
- File worker.js, with which a request is made to the nbrb.by API to receive data.
- File curent.js, creates a table with exchange rates using data received from worker.
- File convert.js, makes it possible to convert the currencies that it receives from the worker.
- All the above files are added to the 'js' folder.
- Folder 'css' to which the style.css file with styles is added.
- Folder 'img' to which a picture with the background of the page is added.

### Changed

- Content index.html, in particular added: page menu, page blocks corresponding to menu tabs, all files from the 'js', 'css' folders are included, and the highcharts library is also connected.
- File CHANGELOG.md in accordance with the adjustments and development of the project.
- File README.md in accordance with the adjustments and development of the project.

## [0.0.2] - 2020-09-09
### Changed

- Fixed bug in link to Netlify, in file README.md.

## [0.0.1] - 2020-09-09
### Added

- Created a repository with the final project;
- Created README.md, will contain answers to general questions;
- Created index.html for testing the generated web application;
- Created CHANGELOG.md file  serve as an example of a standardized open source project CHANGELOG.