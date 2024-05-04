import { buscarDadosPlanilhaCompleta } from '../../utils/buscarDadosPlanilha.js';

async function carregarDadosAssinatura() {
    const nomePlanilha = 'Gastos';
    const nomeTabela = 'Assinaturas';
    const rangeTabela = '!A:M';

    try {
        const resultado = await buscarDadosPlanilhaCompleta({nomePlanilha, nomeTabela, rangeTabela});
        console.log(`Dados ${nomeTabela} salvos com sucesso`);
        return resultado;
    } catch (error) {
        console.error(`Erro ao carregar dados de ${nomeTabela}: `, error);
    }
}

// carregarDadosAssinatura();

export default carregarDadosAssinatura;
