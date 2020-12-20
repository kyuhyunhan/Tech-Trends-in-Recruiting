const { scraper } = require("./programmersScraper");

const scraperObject = {
    url: 'https://www.rocketpunch.com/jobs?job=1',
    async scraper(browser) {
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);

        let scrapedData = [];

        async function scrapeCurrentPage() {
            await page.waitForSelector('#company-list');

            // 다음 버튼 을 이용해서 재귀적 탐색
            let checkArrowBtns = await page.$$eval('.pagination > a', arr => {
                return arr.map(a => a.className);
            });
            let arrowBtns = await page.$$eval('.pagination > a', arr => {
                return arr.map(a => a.href);
            })
            if(checkArrowBtns[1] !== 'disabled item') {
                await page.goto(arrowBtns[1]);
                return scrapeCurrentPage();
            }
            await page.close();
            return scrapedData;
        }

        let data = await scrapeCurrentPage();
        return data;
    }
}

module.exports = scraperObject;
// 1. 다음 버튼을 인식하면서 마지막 페이지까지 넘기도록. 마지막에 에러 없이 멈추기 => OK!
// 2. 각 공고의 url을 확보해서 해당 페이지 연결했다가 닫기
// 2-1. 각 공고의 회사명 확보하기
// 3. 해당 페이지에서 '개발' '개발자' '엔지니어' '프로그래머' 'developer' 'engineer' '디벨로퍼' 'cto' 를 
//    포함한 공고들만의 공고명과 url을 확보해서 해당 페이지만 연결 후 close (영어는 toUpperCase()?)
// 3-1. 공고명은 postTitle에 배열로 저장
// 4. 구인 페이지에서 리스트 추출해서 techStack에 저장하기.