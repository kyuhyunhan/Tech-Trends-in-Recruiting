module.exports = function skillCounter(fullDataResult) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const hour = today.getHours();
    const minute = today.getMinutes();
    const time = year + '.' + month + '.' + date + ' ' + hour + ':' + minute;

    let skillCount =  {
        "date": time,
        "language": {},
        "FE": {
            "top3Framework":{},
            "stateMgmtLibs":{},
            "FEEtc":{}
        },
        "BE":{
            "JS":{},
            "Java":{},
            "Python":{},
            "Ruby":{},
            "PHP":{},
            "BEEtc":{}
        },
        "cross_platform_mobile":{},
        "database": {},
        "ML_data":{},
        "ambiguity":{},
        "JS_testing":{},
        "etc":{}
    }

    // SWIFT개발경험자, 코틀린, 파이썬, 자바스크립트, 자바개발자
    // 스칼라, C언어, 'JAVASCRIPT,TYPESCRIPT', GOLANG
    const language =['JAVASCRIPT','JAVA','PYTHON','PHP','TYPESCRIPT','SWIFT','KOTLIN','C++','C#',
                     'OBJECTIVEC','C','GO','RUBY','SCALA','HASKELL','RUST','DART','PERL','ELIXIR'];
    // 리액트, 리엑트, VUEFRAMEWORK
    const FE_top3Framework = ['REACT','VUE','ANGULAR'];
    // REACTREDUX, APOLLOCLIENT, GRAPHQL/APOLLO, REACTAPOLLO
    const FE_stateMgmtLibs = ['REDUX','MOBX','APOLLO','VUEX',];
    const FE_FEEtc = ['BOOTSTRAP','JQUERY','WEBPACK','GRAPHQL','SASS','BABEL','D3','STYLEDCOMPONENTS',
                      'LESS','REDUXSAGA','THREE','CHART','REDUXTHUNK','MATERIALUI','GULP','REQUIRE'];
    const BE_JS = ['NODE','EXPRESS','SEQUELIZE','KOA'];
    // SPRINGFRAMEWORK, JPA:HIBERNATE, JAVA/P, 웹개발/P
    const BE_Java = ['SPRING','MYBATIS','JPA','QUERYDSL','HIBERNATE','SPRINGBATCH','SPRINGBOOT','JSP','SPRINGDATAJPA'];
    // DRF, PYTHONDJANGO
    const BE_Python = ['DJANGO','FLASK','DJANGORESTFRAMEWORK'];
    const BE_Ruby = ['RUBYONRAILS'];
    const BE_PHP = ['LARAVEL','CODEIGNITER'];
    const BE_BEEtc = ['ASPNET','NET'];
    // REACTNATIVE앱개발, 리액트네이티브, FLUTTER&DART, 플러터
    const cross_platform_mobile = ['REACTNATIVE','FLUTTER','ELECTRON'];
    // ORACLEDATABASE
    const database = ['MYSQL','MONGODB','REDIS','MARIADB','POSTGRESQL','FIREBASE','MSSQL','ORACLE',
                      'AURORADB','APACHECOUCHDB','AWSDYNAMODB'];
    // APACHEHADOOP, R통계, R데이터분석, 텐서플로우
    const ML_data = ['TENSORFLOW','R','PYTORCH','KERAS','HADOOP','PANDAS','SAS','SCIPY','NUMPY'];
    // RX 는 RXJS이다, stateofJS2019 에서는 other utilites에 포함되었음
    const ambiguity = ['HTML','CSS','HTML5','CSS3','SQL','RXJS','RXJAVA','RXSWIFT','SHELL','XML','XAML','ACTIONSCRIPT'];
    const JS_testing = ['SELENIUM','JEST','CYPRESS','MOCHA','STORYBOOK','APPIUM','ESPRESSO','PUPPETEER'];
    
    // 값을 json에 넣을 때 완성된 문자열로 카운팅하려면, 검증이 너무 복잡할것 같다..
    // 일단 다 대문자로 파일에 넣고, 나중에 client level에서 적절한 case와 '.' ' '등을 붙여서 output!
    for (const post of fullDataResult) {
        for (skill of post['techStack']) {
            // regular expression 정리
            skill = skill.toUpperCase().replace(/[.]/g,'').replace(/[ ]/g,'').replace(/[-]/g,'').replace(/\([^]+\)/,'').replace('JS','');
            // 예외 문자 처리 -- 더 좋은 방법은?
            switch(skill) {
                case 'SWIFT개발경험자': skill = 'SWIFT'; break;
                case '코틀린': skill = 'KOTLIN'; break;
                case '파이썬': skill = 'PYTHON'; break;
                case '자바스크립트': skill = 'JAVASCRIPT'; break;
                case '자바개발자': skill = 'JAVA'; break;
                case '스칼라': skill = 'SCALA'; break;
                case 'C언어': skill = 'C'; break;
                case 'JAVASCRIPT,TYPESCRIPT': skill = 'TYPESCRIPT'; break;
                case 'GOLANG': skill = 'GO'; break;
                case '리액트': skill = 'REACT'; break;
                case '리엑트': skill = 'REACT'; break;
                case 'VUEFRAMEWORK': skill = 'VUE'; break;
                case 'REACTREDUX': skill = 'REDUX'; break;
                case 'APOLLOCLIENT': skill = 'APOLLO'; break;
                case 'GRAPHQL/APOLLO': skill = 'APOLLO'; break;
                case 'REACTAPOLLO': skill = 'APOLLO'; break;
                case 'SPRINGFRAMEWORK': skill = 'SPRING'; break;
                case 'JPA:HIBERNATE': skill = 'JPA'; break;
                case 'JAVA/P': skill = 'JSP'; break;
                case 'P': skill = 'JSP'; break;
                case '웹개발/P': skill = 'JSP'; break;
                case 'DRF': skill = 'DJANGORESTFRAMEWORK'; break;
                case 'PYTHONDJANGO': skill = 'DJANGO'; break;
                case 'REACTNATIVE앱개발': skill = 'REACTNATIVE'; break;
                case '리액트네이티브': skill = 'REACTNATIVE'; break;
                case '플러터': skill = 'FLUTTER'; break;
                case 'FLUTTER&DART': skill = 'FLUTTER'; break;
                case 'ORACLEDATABASE': skill = 'ORACLE'; break;
                case 'APACHEHADOOP': skill = 'HADOOP'; break;
                case 'R통계': skill = 'R'; break;
                case 'R데이터분석': skill = 'R'; break;
                case '텐서플로우': skill = 'TENSORFLOW'; break;
                case 'RX': skill = 'RXJS'; break;
            }

            if(language.includes(skill)) {
                if(!skillCount['language'].hasOwnProperty(skill)) {
                    skillCount['language'][skill] = 1;
                } else {
                    skillCount['language'][skill] += 1;
                }
            } else if (FE_top3Framework.includes(skill)) {
                if(!skillCount['FE']['top3Framework'].hasOwnProperty(skill)) {
                    skillCount['FE']['top3Framework'][skill] = 1;
                } else {
                    skillCount['FE']['top3Framework'][skill] += 1;
                }
            } else if (FE_stateMgmtLibs.includes(skill)) {
                if(!skillCount['FE']['stateMgmtLibs'].hasOwnProperty(skill)) {
                    skillCount['FE']['stateMgmtLibs'][skill] = 1;
                } else {
                    skillCount['FE']['stateMgmtLibs'][skill] += 1;
                }
            } else if (FE_FEEtc.includes(skill)) {
                if(!skillCount['FE']['FEEtc'].hasOwnProperty(skill)){
                    skillCount['FE']['FEEtc'][skill] = 1;
                } else {
                    skillCount['FE']['FEEtc'][skill] += 1;
                }
            } else if (BE_JS.includes(skill)) {
                if(!skillCount['BE']['JS'].hasOwnProperty(skill)){
                    skillCount['BE']['JS'][skill] = 1;
                } else {
                    skillCount['BE']['JS'][skill] += 1;
                }
            } else if (BE_Java.includes(skill)) {
                if(!skillCount['BE']['Java'].hasOwnProperty(skill)){
                    skillCount['BE']['Java'][skill] = 1;
                } else {
                    skillCount['BE']['Java'][skill] += 1;
                }
            } else if (BE_Python.includes(skill)) {
                if(!skillCount['BE']['Python'].hasOwnProperty(skill)){
                    skillCount['BE']['Python'][skill] = 1;
                } else {
                    skillCount['BE']['Python'][skill] += 1;
                }
            } else if (BE_Ruby.includes(skill)) {
                if(!skillCount['BE']['Ruby'].hasOwnProperty(skill)){
                    skillCount['BE']['Ruby'][skill] = 1;
                } else {
                    skillCount['BE']['Ruby'][skill] += 1;
                }
            } else if (BE_PHP.includes(skill)) {
                if(!skillCount['BE']['PHP'].hasOwnProperty(skill)){
                    skillCount['BE']['PHP'][skill] = 1;
                } else {
                    skillCount['BE']['PHP'][skill] += 1;
                }
            } else if (BE_BEEtc.includes(skill)) {
                if(!skillCount['BE']['BEEtc'].hasOwnProperty(skill)){
                    skillCount['BE']['BEEtc'][skill] = 1;
                } else {
                    skillCount['BE']['BEEtc'][skill] += 1;
                }
            } else if (cross_platform_mobile.includes(skill)) {
                if(!skillCount['cross_platform_mobile'].hasOwnProperty(skill)){
                    skillCount['cross_platform_mobile'][skill] = 1;
                } else {
                    skillCount['cross_platform_mobile'][skill] += 1;
                }
            } else if (database.includes(skill)) {
                if(!skillCount['database'].hasOwnProperty(skill)){
                    skillCount['database'][skill] = 1;
                } else {
                    skillCount['database'][skill] += 1;
                }
            } else if (ML_data.includes(skill)) {
                if(!skillCount['ML_data'].hasOwnProperty(skill)){
                    skillCount['ML_data'][skill] = 1;
                } else {
                    skillCount['ML_data'][skill] += 1;
                }
            } else if (ambiguity.includes(skill)) {
                if(!skillCount['ambiguity'].hasOwnProperty(skill)){
                    skillCount['ambiguity'][skill] = 1;
                } else {
                    skillCount['ambiguity'][skill] += 1;
                }
            } else if (JS_testing.includes(skill)) {
                if(!skillCount['JS_testing'].hasOwnProperty(skill)){
                    skillCount['JS_testing'][skill] = 1;
                } else {
                    skillCount['JS_testing'][skill] += 1;
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

    return skillCount;
}