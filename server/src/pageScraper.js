const scraperObject = {
    url: 'https://programmers.co.kr/job?page=33',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);

        let scrapedData = [];

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
                await newPage.goto(link);

                dataObj['source'] = 'programmers';
                dataObj['postTitle'] = await newPage.$eval('header > div > h2', el => {
                    return el.textContent.replace(/\s+/g,'');
                });
                dataObj['postCompany'] = await newPage.$eval('header > div> h4', el => el.textContent);
                dataObj['techStack'] = await newPage.$$eval('.heavy-use > td > code', stack => {
                    stack = stack.map(tech => tech.textContent);
                    return stack;
                });

                resolve(dataObj);

                await newPage.close();
            })

            for (const url of urls) {
                let currentPageData = await pagePromise(url);
                scrapedData.push(currentPageData);
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
            return scrapedData;
        }
        let data = await scrapeCurrentPage();
        return data;
    }
}

module.exports = scraperObject;