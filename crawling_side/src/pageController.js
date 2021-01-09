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

    // 확인된 공고 수
    let rocketPostCount = rocketpunchDataResult.reduce((acc,cur) => {
                              return acc + cur['postTitle'].length
                            },0)
    const postCount = (programmersDataResult.length-1) + rocketPostCount;

    // 확인된 회사 수
    const companyCount = programmersDataResult.length-1 + rocketpunchDataResult.length;
    programmersDataResult.splice(programmersDataResult.length-1,1);



    //프로그래머스랑 로켓펀치 각각 json파일도 하나 생성해두고 넘어갈것.(데이터 확보 차원)
    fs.writeFile("test_result/test0109_rocket.json", JSON.stringify({...rocketpunchDataResult},null,4), "utf8", (err, data) => {
        if (err) {
        console.error(err);
      } else {
        console.log("//////////////////////////////////////\n//////////////////////////////////////\n rocketpunch data result created!\n//////////////////////////////////////\n//////////////////////////////////////\n");
      }
    });
    fs.writeFile("test_result/test0109_prog.json", JSON.stringify({...programmersDataResult},null,4), "utf8", (err, data) => {
        if (err) {
        console.error(err);
      } else {
        console.log("//////////////////////////////////////\n//////////////////////////////////////\n programmers data result created!\n//////////////////////////////////////\n//////////////////////////////////////\n");
      }
    });
    
    fullDataResult = fullDataResult.concat(programmersDataResult).concat(rocketpunchDataResult);
    const countedSkills = skillCounter(fullDataResult);
    countedSkills['postCount'] = postCount;
    countedSkills['companyCount'] = companyCount;

    fs.writeFile("test_result/test0109.json", JSON.stringify(countedSkills,null,4), "utf8", (err, data) => {
        if (err) {
        console.error(err);
      } else {
        console.log("\n#######################################created!#######################################\n");
      }
    });
}

module.exports = (browserInstance) => scrapeAll(browserInstance);