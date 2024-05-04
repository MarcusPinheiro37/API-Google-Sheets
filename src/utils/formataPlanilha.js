import { normalizarDados } from './normalizarDados.js';

export default (table) => {
    // Assume que a primeira linha da tabela seja o cabeçalho
    const tabelaNormalizada = normalizarDados(table);
    let columnNames = tabelaNormalizada[0];

    // Pula o cabeçalho
    let dataRows = tabelaNormalizada.slice(1);

    try {
        let combinedData = dataRows.map(row => {
            let obj = {};
            columnNames.forEach((columnName, index) => {
                // Directly map column name to the corresponding row value
                obj[columnName] = row[index];
            });
            return obj;
        });
        // console.log('formataPlanilha check');
        return combinedData;
    } catch (error) {
        console.error('Erro em formataPlanilha:', error);
    }
};