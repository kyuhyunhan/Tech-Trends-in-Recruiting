import { setToArray } from '../data_modifier';

export default function modifyFEEtc(data) {
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
                case 'D3':
                    elem['label'] = 'D3.js'; break;
            }
            return elem;
        })
        .slice(0,10);
    data['FE']['FEEtc'] = modifiedFEEtcData;
    return data;
}
