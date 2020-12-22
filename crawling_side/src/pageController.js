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
    fs.writeFile("test_result/test1222_rocket.json", JSON.stringify({...rocketpunchDataResult},null,4), "utf8", (err, data) => {
        if (err) {
        console.error(err);
      } else {
        console.log("//////////////////////////////////////\n//////////////////////////////////////\n rocketpunch data result created!\n//////////////////////////////////////\n//////////////////////////////////////\n");
      }
    });
    fs.writeFile("test_result/test1222_prog.json", JSON.stringify({...programmersDataResult},null,4), "utf8", (err, data) => {
        if (err) {
        console.error(err);
      } else {
        console.log("//////////////////////////////////////\n//////////////////////////////////////\n programmers data result created!\n//////////////////////////////////////\n//////////////////////////////////////\n");
      }
    });
    
    fullDataResult = fullDataResult.concat(programmersDataResult).concat(rocketpunchDataResult);

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const hour = today.getHours();
    const minute = today.getMinutes();
    const time = year + '.' + month + '.' + date + ' ' + hour + ':' + minute;

    ////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////  K E E P !  ////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    let skillCount = {
        "date": time,
        "language":{},
        "database":{},
        "web_app_FW_lib":{"frontEnd":{}, "backEnd":{},"testing":{},"mobile":{}},
        "web_app_etc" : {},
        "ML_data":{},
        "etc":{},
        "ambiguity":{},
        "korean": {}
    };

    const language = ['JAVA','JAVASCRIPT','PYTHON','SWIFT','PHP','KOTLIN',
                      'TYPESCRIPT','C++','C#','OBJECTIVEC','C','GO','GOLANG','RUBY',
                      'SCALA','HASKELL','RUST','DART','PERL','ELIXIR'];
    const database = ['MYSQL','MONGODB','REDIS','MARIADB','POSTGRESQL','FIREBASE','MSSQL','ORACLE','ORACLEDATABASE','AURORADB','APACHECOUCHDB','AWSDYNAMODB'];

    const web_app_FW_lib_frontEnd = ['BOOTSTRAP','REACT','VUE','ANGULAR','EMBER','EXT','PREACT','SVELTE'];
    const web_app_FW_lib_backEnd = ['SPRING','SPRINGFRAMEWORK','MYBATIS','DJANGO','FLASK','DRF','DJANGORESTFRAMEWORK','RUBYONRAILS','LARAVEL','CODEIGNITER','NODE','NEXT','EXPRESS','NUXT','GATSBY','KOA','ASPNET','NEST','NET'];
    const web_app_FW_lib_testing = ['SELENIUM','JEST','CYPRESS','MOCHA','STORYBOOK','APPIUM','ESPRESSO','PUPPETEER'];
    const web_app_FW_lib_mobile = ['REACTNATIVE','FLUTTER','ELECTRON'];
    const web_app_etc = ['JQUERY','WEBPACK','GRAPHQL','REDUX','SASS','JSP','BABEL','D3','STYLEDCOMPONENTS','LESS','SPRINGDATAJPA','QUERYDSL','REDUXSAGA','VUEX','THREE','CHART','SEQUELIZE','REDUXTHUNK','APOLLO','APOLLOSERVER','APOLLOCLIENT','SPRINGBATCH','HIBERNATE','MATERIALUI','MOBX','GULP','REQUIRE'];
    const ML_data = ['TENSORFLOW','PYTORCH','KERAS','APACHEHADOOP','HADOOP','PANDAS','SAS','SCIPY','NUMPY'];
    // RX는 RXJS의미함, stateofJS2019 에서는 other utilites에 포함되었음
    const ambiguity = ['HTML','CSS','HTML5','CSS3','SQL','RX','RXJAVA','RXSWIFT','SHELL','XML','XAML','ACTIONSCRIPT'];
  

    // 값을 json에 넣을 때 완성된 문자열로 카운팅하려면, 검증이 너무 복잡할것 같다..
    // 일단 다 대문자로 파일에 넣고, 나중에 client level에서 적절한 case와 '.' ' '등을 붙여서 output!
    for(const post of fullDataResult) {
        for(skill of post['techStack']){
            //regular expression 정리!
            skill = skill.toUpperCase().replace(/[.]/g,'').replace(/[ ]/g,'').replace(/[-]/g,'').replace(/\([^]+\)/,'').replace('JS','');
            if(language.includes(skill)) {
                if(!skillCount['language'].hasOwnProperty(skill)) {
                    skillCount['language'][skill] = 1;
                } else {
                    skillCount['language'][skill] += 1;
                }
            } else if (database.includes(skill)) {
                if(!skillCount['database'].hasOwnProperty(skill)) {
                    skillCount['database'][skill] = 1;
                } else {
                    skillCount['database'][skill] += 1;
                }
            } else if (web_app_FW_lib_frontEnd.includes(skill)) {
                if(!skillCount['web_app_FW_lib']['frontEnd'].hasOwnProperty(skill)){
                    skillCount['web_app_FW_lib']['frontEnd'][skill] = 1;
                } else {
                    skillCount['web_app_FW_lib']['frontEnd'][skill] += 1;
                }
            } else if (web_app_FW_lib_backEnd.includes(skill)) {
                if(!skillCount['web_app_FW_lib']['backEnd'].hasOwnProperty(skill)){
                    skillCount['web_app_FW_lib']['backEnd'][skill] = 1;
                } else {
                    skillCount['web_app_FW_lib']['backEnd'][skill] += 1;
                }
            } else if (web_app_FW_lib_testing.includes(skill)) {
                if(!skillCount['web_app_FW_lib']['testing'].hasOwnProperty(skill)){
                    skillCount['web_app_FW_lib']['testing'][skill] = 1;
                } else {
                    skillCount['web_app_FW_lib']['testing'][skill] += 1;
                }
            } else if (web_app_FW_lib_mobile.includes(skill)) {
                if(!skillCount['web_app_FW_lib']['mobile'].hasOwnProperty(skill)){
                    skillCount['web_app_FW_lib']['mobile'][skill] = 1;
                } else {
                    skillCount['web_app_FW_lib']['mobile'][skill] += 1;
                }
            } else if (web_app_etc.includes(skill)) {
                if(!skillCount['web_app_etc'].hasOwnProperty(skill)) {
                    skillCount['web_app_etc'][skill] = 1;
                } else {
                    skillCount['web_app_etc'][skill] += 1;
                }
            } else if (ML_data.includes(skill)) {
                if(!skillCount['ML_data'].hasOwnProperty(skill)) {
                    skillCount['ML_data'][skill] = 1;
                } else {
                    skillCount['ML_data'][skill] += 1;
                }
            } else if (ambiguity.includes(skill)) {
                if(!skillCount['ambiguity'].hasOwnProperty(skill)) {
                    skillCount['ambiguity'][skill] = 1;
                } else {
                    skillCount['ambiguity'][skill] += 1;
                }
            } else if(/[가-힣]/.test(skill)) {
                if(!skillCount['korean'].hasOwnProperty(skill)) {
                    skillCount['korean'][skill] = 1;
                } else {
                    skillCount['korean'][skill] += 1;
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

    fs.writeFile("test_result/test1222.json", JSON.stringify(skillCount,null,4), "utf8", (err, data) => {
        if (err) {
        console.error(err);
      } else {
        console.log("created!");
      }
    });
}

module.exports = (browserInstance) => scrapeAll(browserInstance);