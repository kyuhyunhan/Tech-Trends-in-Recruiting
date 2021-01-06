export default function modifyBE(data) {
    const rawBEData = data['BE'];
    const modifiedBEData = Object.keys(rawBEData).map((key) =>{
        if(key=='BEEtc'){
            return {name:'기타', children:[]};
        }
        return {name:key, children:[]};
    })

    const rawJSData = data['BE']['JS'];
    const modifiedJSData = Object.keys(rawJSData).map((key) =>{
        switch (key) {
            case 'NODE':
                return {name:'Node.js', size:rawJSData[key]};
            case 'SEQUELIZE':
                return {name:'Sequelize.js', size:rawJSData[key]};
            case 'EXPRESS':
                return {name:'Express.js', size:rawJSData[key]};
            case 'KOA':
                return {name:'Koa.js', size:rawJSData[key]};
            default:
                return {name:key, size:rawJSData[key]};
        }
    })
    const rawJavaData = data['BE']['Java'];
    const modifiedJavaData = Object.keys(rawJavaData).map((key) =>{
        switch (key) {
            case 'SPRING':
                return {name:'Spring', size:rawJavaData[key]};
            case 'SPRINGBOOT':
                return {name:'SpringBoot', size:rawJavaData[key]};
            case 'HIBERNATE':
                return {name:'Hibernate', size:rawJavaData[key]};
            case 'QUERYDSL':
                return {name:'QueryDSL', size:rawJavaData[key]};
            case 'SPRINGDATAJPA':
                return {name:'SpringDataJPA', size:rawJavaData[key]};
            case 'MYBATIS':
                return {name:'MyBatis', size:rawJavaData[key]};
            default:
                return {name:key, size:rawJavaData[key]};
        }
    })
    const rawPythonData = data['BE']['Python'];
    const modifiedPythonData = Object.keys(rawPythonData).map((key) =>{
        switch (key) {
            case 'DJANGO':
                return {name:'Django', size:rawPythonData[key]};
            case 'FLASK':
                return {name:'Flask', size:rawPythonData[key]};
            case 'DJANGORESTFRAMEWORK':
                return {name:'DRF(DjangoRestFramework)', size: rawPythonData[key]};
            default:
                return {name:key, size:rawPythonData[key]}
        }
    })
    const rawRubyData = data['BE']['Ruby'];
    const modifiedRubyData = Object.keys(rawRubyData).map((key) =>{
        switch(key) {
            case 'RUBYONRAILS':
                return {name:'RubyOnRails', size:rawRubyData[key]};
            default:
                return {name:key, size:rawRubyData[key]};
        }
    })
    const rawPHPData = data['BE']['PHP'];
    const modifiedPHPData = Object.keys(rawPHPData).map((key) =>{
        switch (key) {
            case 'CODEIGNITER':
                return {name:'CodeIgniter', size:rawPHPData[key]};
            case 'LARAVEL':
                return {name:'Laravel', size:rawPHPData[key]};
            default:
                return {name:key, size:rawPHPData[key]};
        }
    })
    const rawEtcData = data['BE']['BEEtc'];
    const modifiedEtcData = Object.keys(rawEtcData).map((key) =>{
        switch (key) {
            case 'NET':
                return {name:'.NET', size:rawEtcData[key]};
            case 'ASPNET':
                return {name:'ASP.NET', size: rawEtcData[key]};
            default:
                return {name:key, size:rawEtcData[key]};
        }
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
        } else if (object.name == 'PHP') {
            object.children = modifiedPHPData;
        } else {
            object.children = modifiedEtcData;
        }
    }
    data['BE'] = modifiedBEData;
    return data;
}