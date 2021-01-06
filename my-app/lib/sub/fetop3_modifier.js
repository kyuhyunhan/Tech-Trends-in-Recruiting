import { setToArray } from '../data_modifier';

export default function modifyFETop3(data) {
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
