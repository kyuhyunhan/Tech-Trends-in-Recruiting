const pageScraper = require('./pageScraper');
const fs = require('fs');

async function scrapeAll(browserInstance) {
    let browser;
    let dataResult;
    try {
        browser = await browserInstance;
        dataResult = await pageScraper.scraper(browser);
    } catch (err) {
        console.log('an error occured in pageController.js => ', err);
    }

    let skillCount = {};
    for(const post of dataResult) {
        for (skill of post['techStack']){
            if(!skillCount.hasOwnProperty(skill)){
                skillCount[skill] = 1;
            } else {
                skillCount[skill] += 1;
            }
        }
    }
    fs.writeFile("test.json", JSON.stringify(skillCount), "utf8", (err, data) => {
        if (err) {
        console.error(err);
      } else {
        console.log("created!");
      }
    });
}

module.exports = (browserInstance) => scrapeAll(browserInstance);