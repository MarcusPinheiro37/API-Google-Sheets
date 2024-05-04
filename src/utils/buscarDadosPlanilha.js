// utils/buscarDadosPlanilha.js
import { config } from 'dotenv';
import axios from 'axios';
import accessToken from '../auth/accessToken.js';
import listaPlanilhas from './listaPlanilhas.js';
import findPlanilha from './findPlanilha.js';
import formataPlanilha from './formataPlanilha.js';
import salvaPlanillhaJSON from './salvaPlanillhaJSON.js';
import url from 'url';
import { join, dirname } from 'path';

const caminhoAtual = url.fileURLToPath(import.meta.url);
const caminho = join(dirname(caminhoAtual), '../../dados');

config();
accessToken();

async function buscarDadosPlanilhaCompleta(dados) {
    const {nomePlanilha, nomeTabela, rangeTabela} = dados;
    try {
        const planilhas = await listaPlanilhas();
        const dados = { planilhas, nomePlanilha };
        const planilhaID = await findPlanilha(dados);

        const response = await axios({
            method: 'GET',
            url: `https://sheets.googleapis.com/v4/spreadsheets/${planilhaID}/values/${nomeTabela}`,
            params: {
                range: `${nomeTabela}${rangeTabela}`
            },
            headers: {
                Authorization: process.env.ACCESS_TOKEN
            }
        });

        const tabelaFormatada = formataPlanilha(response.data.values);
        return salvaPlanillhaJSON({ localNome: `${caminho}/${nomeTabela}.json`, arquivo: tabelaFormatada });
    } catch (error) {
        console.error('Erro ao buscar dados da planilha: ', error);
    }
}

export { buscarDadosPlanilhaCompleta };
