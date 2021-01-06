import { setToArray } from '../data_modifier';

export default function modifyCPM(data) {
    const rawCPMData = data['cross_platform_mobile'];
    const modifiedCPMData = setToArray(rawCPMData)
                    .map((elem) => {
                        switch(elem['name']){
                            case 'REACTNATIVE':
                                elem['name'] = 'React-Native'; break;
                            case 'FLUTTER':
                                elem['name'] = 'Flutter'; break;
                            case 'ELECTRON':
                                elem['name'] = 'Electron'; break;
                        }
                        return elem;
                    });
    data['cross_platform_mobile'] = modifiedCPMData;
    return data;
}