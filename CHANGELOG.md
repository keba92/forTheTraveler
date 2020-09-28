# Changelog
All notable changes to this project will be documented in this file.

The format is based on forthetraveler.netlify.app(https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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