export default async (dados) => {
    try {
        const {planilhas, nomePlanilha} = await dados;
        const idArquivo = planilhas.find((planilha) => planilha.name === nomePlanilha && planilha.mimeType === 'application/vnd.google-apps.spreadsheet');
        // console.log('findPlanilha check');
        return idArquivo.id;
    } catch (error) {
        console.error('Erro findPlanilha: ', error);
    }
};