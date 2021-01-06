import { setToArray } from '../data_modifier';

export default function modifyLanguage(data) {
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
            })
            .filter((elem) => elem.value > 1);
    data['language'] = modifiedLanguageData;
    return data;
}