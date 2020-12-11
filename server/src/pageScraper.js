const scraperObject = {
    url: 'https://programmers.co.kr/job',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);

        await page.waitForSelector('#tab_position');

        //get the links to each posts
        let urls = await page.$$eval('.list-positions > li', posts => {
            postsUrls = posts.map(post => post.querySelector('.item-body > h5 > a').href);
            return postsUrls; 
        });

        let pagePromise = (link) => new Promise(async(resolve, reject) => {
            let dataObj = {};
            let newPage = await browser.newPage();
            await newPage.goto(link);

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
            console.log(currentPageData);
        }
    }
}

module.exports = scraperObject;