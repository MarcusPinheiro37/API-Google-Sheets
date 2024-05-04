export function normalizarDados(data) {
    const maxColumns = data.reduce((max, row) => Math.max(max, row.length), 0);
    return data.map(row => {
        while (row.length < maxColumns) {
            row.push(''); // Pode ser alterado para null ou outro valor padrão conforme necessário
        }
        return row;
    });
}
