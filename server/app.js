const browserObject = require('./src/browser');
const scraperController = require('./src/pageController');

let browserInstance = browserObject.startBrowser(); // Promise인 Browser Instance를 생성

scraperController(browserInstance);