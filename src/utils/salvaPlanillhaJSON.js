import fs from 'fs';

export default async (dados) => {
    const {localNome, arquivo} = dados;
    try {
        fs.writeFileSync(localNome, JSON.stringify(arquivo, null, 4), 'utf-8');
        // console.log('O Json foi salvo com sucesso na pasta raiz!');
    } catch (error) {
        console.error('O Json não foi salvo:', error);
    }
};