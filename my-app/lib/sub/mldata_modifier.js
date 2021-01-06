import { setToArray } from '../data_modifier';

export default function modifyMLData(data) {
    const rawMLData = data['ML_data'];
    const modifiedMLData = setToArray(rawMLData)
                    .map((elem) => {
                        switch(elem['name']){
                            case 'TENSORFLOW':
                                elem['name'] = 'T.F'; break;
                            case 'PYTORCH':
                                elem['name'] = 'PyTorch'; break;
                            case 'HADOOP':
                                elem['name'] = 'Hadoop'; break;
                            case 'KERAS':
                                elem['name'] = 'Keras'; break;
                            case 'PANDAS':
                                elem['name'] = 'Pandas'; break;
                            case 'NUMPY':
                                elem['name'] = 'NumPy'; break;
                        }
                        return elem;
                    })
                    .slice(0,5);
    data['ML_data'] = modifiedMLData;
    return data;
}