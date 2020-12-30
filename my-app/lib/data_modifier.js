export default function modifyData(data) {
    let modifiedData;
    modifiedData = modifyLanguage(data);
    modifiedData = modifyDatabase(data);
    modifiedData = modifyFETop3(data);
    modifiedData = modifyFESML(data);
    modifiedData = modifyFEEtc(data);
    modifiedData = modifyBE(data);
    modifiedData = modifyCPM(data);
    modifiedData = modifyMLData(data);
    return modifiedData;
}
function setToArray(rawData) {
    const arrayData = Object.keys(rawData)
            .map((key) => {
                return {name:key, value:rawData[key]}
            })
            .sort((a,b) => {
                return b.value - a.value;
            })
    return arrayData;
}
function modifyMLData(data) {
    const rawMLData = data['ML_data'];
    const modifiedMLData = setToArray(rawMLData);
    data['ML_data'] = modifiedMLData;
    return data;
}


function modifyCPM(data) {
    const rawCPMData = data['cross_platform_mobile'];
    const modifiedCPMData = setToArray(rawCPMData);
    data['cross_platform_mobile'] = modifiedCPMData;
    return data;
}

function modifyBE(data) {
    const rawBEData = data['BE'];
    const modifiedBEData = Object.keys(rawBEData).map((key) =>{
        return {name:key, children:[]};
    })

    const rawJSData = data['BE']['JS'];
    const modifiedJSData = Object.keys(rawJSData).map((key) =>{
        return {name:key, size:rawJSData[key]}
    })
    const rawJavaData = data['BE']['Java'];
    const modifiedJavaData = Object.keys(rawJavaData).map((key) =>{
        return {name:key, size:rawJavaData[key]}
    })
    const rawPythonData = data['BE']['Python'];
    const modifiedPythonData = Object.keys(rawPythonData).map((key) =>{
        return {name:key, size:rawPythonData[key]}
    })
    const rawRubyData = data['BE']['Ruby'];
    const modifiedRubyData = Object.keys(rawRubyData).map((key) =>{
        return {name:key, size:rawRubyData[key]}
    })
    const rawPHPData = data['BE']['PHP'];
    const modifiedPHPData = Object.keys(rawPHPData).map((key) =>{
        return {name:key, size:rawPHPData[key]}
    })
    const rawEtcData = data['BE']['BEEtc'];
    const modifiedEtcData = Object.keys(rawEtcData).map((key) =>{
        return {name:key, size:rawEtcData[key]}
    })
    for(let object of modifiedBEData) {
        if(object.name == 'JS') {
            object.children = modifiedJSData;
        } else if (object.name == 'Java') {
            object.children = modifiedJavaData;
        } else if (object.name == 'Python') {
            object.children = modifiedPythonData;
        } else if (object.name == 'Ruby') {
            object.children = modifiedRubyData;
        } else if (object.name = 'PHP') {
            object.children = modifiedPHPData;
        } else {
            object.children = modifiedEtcData;
        }
    }
    data['BE'] = modifiedBEData;
    return data;
}

function modifyFEEtc(data) {
    const rawFEEtcData = data['FE']['FEEtc'];
    const modifiedFEEtcData = Object.keys(rawFEEtcData)
        .map((key) => {
            return {label:key, value:rawFEEtcData[key]}
        })
        .sort((a,b) => {
            return b.value - a.value;
        })
        .map((elem) => {
            switch(elem['label']) {
                case 'WEBPACK':
                    elem['label'] = 'Webpack'; break;
                case 'GRAPHQL':
                    elem['label'] = 'GraphQL'; break;
                case 'JQUERY':
                    elem['label'] = 'jQuery'; break;
                case 'SASS':
                    elem['label'] = 'Sass'; break;
                case 'LESS':
                    elem['label'] = 'Less.js'; break;
                case 'REDUXSAGA':
                    elem['label'] = 'Redux-Saga'; break;
                case 'GULP':
                    elem['label'] = 'Gulp'; break;
                case 'STYLEDCOMPONENTS':
                    elem['label'] = 'Styled-Components'; break;
                case 'CHART':
                    elem['label'] = 'Chart.js'; break;
                case 'BABEL':
                    elem['label'] = 'Babel'; break;
                case 'REQUIRE':
                    elem['label'] = 'Require.js'; break;
                case 'THREE':
                    elem['label'] = 'Three.js'; break;
                case 'BOOTSTRAP':
                    elem['label'] = 'Bootstrap'; break;
                case 'REDUXTHUNK':
                    elem['label'] = 'Redux-Thunk'; break;
                case 'MATERIALUI':
                    elem['label'] = 'Material-UI'; break;
            }
            return elem;
        })
        .filter((elem) => elem.value > 10)
    data['FE']['FEEtc'] = modifiedFEEtcData;
    return data;
}

function modifyFESML(data) {
    const rawFESMLData = data['FE']['stateMgmtLibs'];
    const modifiedFESMLData = setToArray(rawFESMLData)
        .map((elem) => {
            switch(elem['name']) {
                case 'REDUX':
                    elem['name'] = 'Redux'; break;
                case 'APOLLO':
                    elem['name'] = 'Apollo'; break;
                case 'VUEX':
                    elem['name'] = 'VueX'; break;
                case 'MOBX':
                    elem['name'] = 'MobX'; break;
            }
            return elem;
        })
    data['FE']['stateMgmtLibs'] = modifiedFESMLData;
    return data;
}

function modifyFETop3(data) {
    const rawFETop3Data = data['FE']['top3Framework'];
    const modifiedFETop3Data = setToArray(rawFETop3Data)
            .map((elem) => {
                switch(elem['name']) {
                    case 'REACT':
                        elem['name'] = 'React.js'; break;
                    case 'VUE':
                        elem['name'] = 'Vue.js'; break;
                    case 'ANGULAR':
                        elem['name'] = 'Angular.js'; break;
                }
                return elem;
            });
    data['FE']['top3Framework'] = modifiedFETop3Data;
    return data;
}

function modifyDatabase(data) {
    const rawDatabaseData = data['database'];
    const modifiedDatabaseData = setToArray(rawDatabaseData)
            .map((elem) => {
                switch(elem['name']) {
                    case 'MYSQL':
                        elem['name'] = 'MySQL'; break;
                    case 'MONGODB':
                        elem['name'] = 'MongoDB'; break;
                    case 'AWSDYNAMODB':
                        elem['name'] = 'AWS DynamoDB'; break;
                    case 'FIREBASE':
                        elem['name'] = 'Firebase'; break;
                    case 'REDIS':
                        elem['name'] = 'Redis'; break;
                    case 'MARIADB':
                        elem['name'] = 'MariaDB'; break;
                    case 'AURORADB':
                        elem['name'] = 'AuroraDB'; break;
                    case 'ORACLE':
                        elem['name'] = 'Oracle'; break;
                    case 'POSTGRESQL':
                        elem['name'] = 'PostgreSQL'; break;
                    case 'APACHECOUCHDB':
                        elem['name'] = 'Apache CouchDB'; break;
                }
                return elem;
            })
    data['database'] = modifiedDatabaseData;
    return data;
}

function modifyLanguage(data) {
    const rawLanguageData = data['language'];
    const modifiedLanguageData = setToArray(rawLanguageData)
            .map((elem) => {
                switch(elem['name']){
                    case 'JAVASCRIPT':
                        elem['name'] = 'JS'; break;
                    case 'JAVA':
                        elem['name'] = 'Java'; break;
                    case 'PYTHON':
                        elem['name'] = 'Python'; break;
                    case 'TYPESCRIPT':
                        elem['name'] = 'TS'; break;
                    case 'SWIFT':
                        elem['name'] = 'Swift'; break;
                    case 'KOTLIN':
                        elem['name'] = 'Kotlin'; break;
                    case 'OBJECTIVEC':
                        elem['name'] = 'Obj-C'; break;
                    case 'RUBY':
                        elem['name'] = 'Ruby'; break;
                    case 'DART':
                        elem['name'] = 'Dart'; break;
                    case 'SCALA':
                        elem['name'] = 'Scala'; break;
                    case 'ELIXIR':
                        elem['name'] = 'Elixir'; break;
                    case 'HASKELL':
                        elem['name'] = 'Haskell'; break;
                    case 'RUST':
                        elem['name'] = 'Rust'; break;
                    case 'PERL':
                        elem['name'] = 'Perl'; break;
                }
                return elem;
            });
    data['language'] = modifiedLanguageData;
    return data;
}