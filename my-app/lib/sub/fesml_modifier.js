import { setToArray } from '../data_modifier';

export default function modifyFESML(data) {
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
