const skillCounter = require('./skillCounter');
const programmersScraper = require('./programmersScraper');
const rocketpunchScraper = require('./rocketpunchScraper');
const fs = require('fs');

async function scrapeAll(browserInstance) {
    let browser;
    let fullDataResult=[];
    let programmersDataResult;
    let rocketpunchDataResult;
    try {
        browser = await browserInstance;
        programmersDataResult = await programmersScraper.scraper(browser);
        rocketpunchDataResult = await rocketpunchScraper.scraper(browser);
    } catch (err) {
        console.log('an error occured in pageController.js => ', err);
    }

    //프로그래머스랑 로켓펀치 각각 json파일도 하나 생성해두고 넘어갈것.(데이터 확보 차원)
    fs.writeFile("test_result/test1224_rocket.json", JSON.stringify({...rocketpunchDataResult},null,4), "utf8", (err, data) => {
        if (err) {
        console.error(err);
      } else {
        console.log("//////////////////////////////////////\n//////////////////////////////////////\n rocketpunch data result created!\n//////////////////////////////////////\n//////////////////////////////////////\n");
      }
    });
    fs.writeFile("test_result/test1224_prog.json", JSON.stringify({...programmersDataResult},null,4), "utf8", (err, data) => {
        if (err) {
        console.error(err);
      } else {
        console.log("//////////////////////////////////////\n//////////////////////////////////////\n programmers data result created!\n//////////////////////////////////////\n//////////////////////////////////////\n");
      }
    });
    
    fullDataResult = fullDataResult.concat(programmersDataResult).concat(rocketpunchDataResult);
    const countedSkills = skillCounter(fullDataResult);

    fs.writeFile("test_result/test1224.json", JSON.stringify(countedSkills,null,4), "utf8", (err, data) => {
        if (err) {
        console.error(err);
      } else {
        console.log("created!");
      }
    });
}

module.exports = (browserInstance) => scrapeAll(browserInstance);