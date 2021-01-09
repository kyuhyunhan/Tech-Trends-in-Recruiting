const scraperObject = {
    url: 'https://programmers.co.kr/job',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.setDefaultNavigationTimeout(0);
        await page.goto(this.url);

        let scrapedData = [];
        let companies = [];

        async function scrapeCurrentPage(){
            await page.waitForSelector('#tab_position');
            
            //get the links to each posts
            let urls = await page.$$eval('.list-positions > li', posts => {
                postsUrls = posts.map(post => post.querySelector('.item-body > h5 > a').href);
                return postsUrls; 
            });

            // get info from a single post page
            let pagePromise = (link) => new Promise(async(resolve, reject) => {
                let dataObj = {};
                let newPage = await browser.newPage();
                await newPage.setDefaultNavigationTimeout(0);
                await newPage.goto(link);

                dataObj['source'] = 'programmers';
                dataObj['postCompany'] = await newPage.$eval('header > div> h4', el => el.textContent);
                dataObj['postTitle'] = await newPage.$eval('header > div > h2', el => {
                    return el.textContent.replace(/\s+/g,'');
                });
                dataObj['techStack'] = await newPage.$$eval('.heavy-use > td > code', stack => {
                    stack = stack.map(tech => tech.textContent);
                    return stack;
                });

                resolve(dataObj);

                await newPage.close();
            })

            for (const link of urls) {
                let currentPageData = await pagePromise(link);
                scrapedData.push(currentPageData);
                if(!companies.includes(currentPageData['postCompany'])) {
                    companies.push(currentPageData['postCompany']);
                }
            }
            
            // [다음] 버튼 href value를 이용해서 마지막 페이지까지 재귀적으로 탐색
            let tmp = await page.$$eval('#paginate > nav > ul > li', lis => {
                return lis.map(li => li.querySelector('a').href)
            });
            if(/#/.test(tmp[tmp.length-1]) == false) {
                await page.click('#paginate > nav > ul > .next');
                return scrapeCurrentPage();
            }
            await page.close();

            // 배열의 제일 마지막에 회사 수를 포함해 보낸다.
            return [...scrapedData, {'progCompanyCount': companies.length}];
        }
        let data = await scrapeCurrentPage();
        return data;
    }
}

module.exports = scraperObject;