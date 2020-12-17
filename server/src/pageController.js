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
    console.log(dataResult);

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const hour = today.getHours();
    const minute = today.getMinutes();
    const time = year + '.' + month + '.' + date + ' ' + hour + ':' + minute;

    let skillCount = {
        "date": time,
        "language":{},
        "database":{},
        "libs":{"JS":{}, "Python":{}, "Java":{}, "PHP":{}, "Ruby":{},"testing":{},"mobile":{}},
        "data":{},
        "etc":{}
    };

    const language = ['JAVA','JAVASCRIPT','PYTHON','HTML','CSS','SWIFT','PHP','KOTLIN',
                      'TYPESCRIPT','C++','C#','OBJECTIVE-C','SQL','C','GO','.NET','RUBY',
                      'SCALA','HASKELL','RUST','DART','PERL','ELIXIR'];
    const lib_JS = ['NODE','REACT','VUE','JQUERY','ANGULAR','REDUX','NUXT','NEXT','EXPRESS',
                   'REDUX-SAGA','D3','STYLED-COMPONENTS','LESS','RX','VUEX','GATSBY','KOA','EMBER',
                   'EXT','THREE'];
    const lib_Java = ['SPRING'];
    const lib_Python = ['DJANGO','FLASK','DRF'];
    const lib_Ruby = ['RUBYONRAILS'];
    const lib_PHP = ['LARAVEL','CODEIGNITER'];
    const lib_testing = ['SELENIUM','JEST','CYPRESS','MOCHA','STORYBOOK','APPIUM','ESPRESS'];
    const lib_mobile = ['REACTNATIVE','FLUTTER'];
    const database = ['MYSQL','MONGODB','REDIS','MARIADB','POSTGRESQL','FIREBASE','MSSQL','ORACLE','ORACLEDATABASE','AURORADB','APACHECOUCHDB'];
    const data = ['TENSORFLOW','PYTORCH','KERAS','APACHEHADOOP','PANDAS','SAS','SCIPY','NUMPY'];
  
    // 값을 json에 넣을 때 완성된 문자열로 카운팅하려면, 검증이 너무 복잡할것 같다..
    // 일단 다 대문자로 파일에 넣고, 나중에 client level에서 적절한 case와 '.' ' '등을 붙여서 output!
    for(const post of dataResult) {
        for(skill of post['techStack']){
            skill = skill.toUpperCase().replace('.','').replace(/ /g,'').replace('JS','').replace(/\([^]+\)/,'');
            if(language.includes(skill)) {
                if(!skillCount['language'].hasOwnProperty(skill)) {
                    skillCount['language'][skill] = 1;
                } else {
                    skillCount['language'][skill] += 1;
                }
            } else if (lib_JS.includes(skill)) {
                if(!skillCount['libs']['JS'].hasOwnProperty(skill)){
                    skillCount['libs']['JS'][skill] = 1;
                } else {
                    skillCount['libs']['JS'][skill] += 1;
                }
            } else if (lib_Java.includes(skill)) {
                if(!skillCount['libs']['Java'].hasOwnProperty(skill)){
                    skillCount['libs']['Java'][skill] = 1;
                } else {
                    skillCount['libs']['Java'][skill] += 1;
                }
            } else if (lib_Python.includes(skill)) {
                if(!skillCount['libs']['Python'].hasOwnProperty(skill)){
                    skillCount['libs']['Python'][skill] = 1;
                } else {
                    skillCount['libs']['Python'][skill] += 1;
                }
            } else if (lib_Ruby.includes(skill)) {
                if(!skillCount['libs']['Ruby'].hasOwnProperty(skill)){
                    skillCount['libs']['Ruby'][skill] = 1;
                } else {
                    skillCount['libs']['Ruby'][skill] += 1;
                }
            } else if (lib_PHP.includes(skill)) {
                if(!skillCount['libs']['PHP'].hasOwnProperty(skill)){
                    skillCount['libs']['PHP'][skill] = 1;
                } else {
                    skillCount['libs']['PHP'][skill] += 1;
                }
            } else if (lib_testing.includes(skill)) {
                if(!skillCount['libs']['testing'].hasOwnProperty(skill)){
                    skillCount['libs']['testing'][skill] = 1;
                } else {
                    skillCount['libs']['testing'][skill] += 1;
                }
            } else if (lib_mobile.includes(skill)) {
                if(!skillCount['libs']['mobile'].hasOwnProperty(skill)){
                    skillCount['libs']['mobile'][skill] = 1;
                } else {
                    skillCount['libs']['mobile'][skill] += 1;
                }
            } else if (database.includes(skill)) {
                if(!skillCount['database'].hasOwnProperty(skill)) {
                    skillCount['database'][skill] = 1;
                } else {
                    skillCount['database'][skill] += 1;
                }
            } else if (data.includes(skill)) {
                if(!skillCount['data'].hasOwnProperty(skill)) {
                    skillCount['data'][skill] = 1;
                } else {
                    skillCount['data'][skill] += 1;
                }
            } else {
                if(!skillCount['etc'].hasOwnProperty(skill)) {
                    skillCount['etc'][skill] = 1;
                } else {
                    skillCount['etc'][skill] += 1;
                }
            }
        }
    }

    fs.writeFile("test1217.json", JSON.stringify(skillCount), "utf8", (err, data) => {
        if (err) {
        console.error(err);
      } else {
        console.log("created!");
      }
    });
}

module.exports = (browserInstance) => scrapeAll(browserInstance);