import { setToArray } from '../data_modifier';

export default function modifyDatabase(data) {
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
            .filter((elem) => elem.value > 1);
    data['database'] = modifiedDatabaseData;
    return data;
}