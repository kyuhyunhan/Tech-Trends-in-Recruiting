const scraperObject = {
    url: 'https://www.rocketpunch.com/jobs?job=1&page=49',
    async scraper(browser) {
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.setDefaultNavigationTimeout(0);
        await page.goto(this.url);

        let scrapedData = [];

        // 각 페이지는 currentPage 내부는 eachPost
        async function scrapeCurrentPage() {
            await page.waitForSelector('#company-list');

            let currentPageUrls = await page.$$eval('#company-list > .company > .content > .company-name > a', arr => {
                return arr.map(a => a.href);
            })
            currentPageUrls = currentPageUrls.filter(link => link !== '');

            let eachPostData = (link) => new Promise(async(resolve, reject) => {
                let dataObj = {};
                let newPage = await browser.newPage();
                await newPage.setDefaultNavigationTimeout(0);
                await newPage.goto(link);

                dataObj['source'] = 'rocketpunch';
                dataObj['postCompany'] = await newPage.$eval('#company-name', el => el.textContent);
                dataObj['postTitle'] = [];
                dataObj['techStack'] =[];

                // get neededTitles!
                let neededTitles = await newPage.$$eval('#company-jobs > .items > .small-job-card > .content > .job-title > a', arr => {
                    return arr
                            .map(a => a.textContent)
                            .filter(text => /개발|엔지니어|프로그래머|디벨로퍼|프론트|백엔드|develop|engineer|cto/i.test(text));
                });
                dataObj['postTitle'] = [...neededTitles];


                // 개발 관련 채용 공고 url 
                let neededLinksTexts = await newPage.$$eval('#company-jobs > .items > .small-job-card > .content > .job-title > a', arr =>{
                    let filteredTitle = arr
                                        .map(a => a.textContent)
                                        .filter(text => /개발|엔지니어|프로그래머|디벨로퍼|프론트|백엔드|develop|engineer|cto/i.test(text));
                    arr = arr.filter(a => {
                        let title = a.textContent;
                        if(filteredTitle.includes(title)) {
                            return true;
                        } else {
                            return false;
                        }
                    })
                    .map(a => a.href);
                    return arr;
                })

                let detailPostData = (url) => new Promise(async(resolve, reject) => {
                    let detailPage = await browser.newPage();
                    await detailPage.setDefaultNavigationTimeout(0);
                    await detailPage.goto(url);
                    
                    let partialTechStack = await detailPage.$$eval('#wrap > .job-content > .row > .job-specialties > a', stack => {
                        stack = stack.map(tech => tech.textContent);
                        return stack;
                    });
                    resolve(partialTechStack);
                    await detailPage.close();
                })

                for(const url of neededLinksTexts) {
                    let tmp = await detailPostData(url);
                    dataObj['techStack'] = dataObj['techStack'].concat(tmp);
                }

                resolve(dataObj);
                await newPage.close();
            })


            for(const link of currentPageUrls) {
                let currentPageData = await eachPostData(link);
                scrapedData.push(currentPageData);
            }

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
// 2. 각 공고의 url을 확보해서 해당 페이지 연결했다가 닫기 => OK!
// 2-1. 각 공고의 회사명 확보하기 => OK!
// 3. 해당 페이지에서 '개발' '개발자' '엔지니어' '프로그래머' 'developer' 'engineer' '디벨로퍼' 'cto' 를 
//    포함한 공고들만의 공고명과 url을 확보해서 해당 페이지만 연결 후 close => OK!
// 3-1. 공고명은 postTitle에 배열로 저장 => OK!
// 4. 구인 페이지에서 리스트 추출해서 techStack에 저장하기. => OK!