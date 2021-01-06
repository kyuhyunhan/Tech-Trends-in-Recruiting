import modifyLanguage from './sub/language_modifier';
import modifyDatabase from './sub/db_modifier';
import modifyFETop3 from './sub/fetop3_modifier';
import modifyFESML from './sub/fesml_modifier';
import modifyFEEtc from './sub/feetc_modifier';
import modifyBE from './sub/be_modifier';
import modifyCPM from './sub/cpm_modifier';
import modifyMLData from './sub/mldata_modifier';

export function setToArray(rawData) {
    const arrayData = Object.keys(rawData)
            .map((key) => {
                return {name:key, value:rawData[key]}
            })
            .sort((a,b) => {
                return b.value - a.value;
            })
    return arrayData;
}

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