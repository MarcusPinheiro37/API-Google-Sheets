import { buscarDadosPlanilhaCompleta } from '../../utils/buscarDadosPlanilha.js';

async function carregarDadosCartao() {
    const nomePlanilha = 'Gastos';
    const nomeTabela = 'Cartão';
    const rangeTabela = '!A:M';

    try {
        const resultado = await buscarDadosPlanilhaCompleta({nomePlanilha, nomeTabela, rangeTabela});
        console.log(`Dados ${nomeTabela} salvos com sucesso`);
        return resultado;
    } catch (error) {
        console.error(`Erro ao carregar dados de ${nomeTabela}: `, error);
    }
}

// carregarDadosCartao();

export default carregarDadosCartao;
