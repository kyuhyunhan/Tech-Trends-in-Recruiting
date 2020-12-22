const puppeteer = require('puppeteer');

async function startBrowser() {
    let browser;
    try {
        console.log("Opening the Browser ...");
        browser = await puppeteer.launch({  // .launch() => returns Promise
            headless: false
            // args: ["--disable-setuid-sandbox"],
            // 'ignoreHTTPSErrors': true
        });
    } catch (err) {
        console.log('Could not create a browser instance => : ', err);
    }
    return browser;
}

module.exports = {
    startBrowser
}