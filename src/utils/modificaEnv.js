import fs from 'fs';
import url from 'url';
import { join, dirname } from 'path';

const caminhoAtual = url.fileURLToPath(import.meta.url);
const env = join(dirname(caminhoAtual), '../..', '.env');
const arquivo = fs.readFileSync(env, 'utf-8');

export default function modificaEnv(dados) {
    const {accessToken = '', refreshToken = '', tokenType = 'Bearer'} = dados;
    const keysToReplace = {};

    // Adicionar tokens ao objeto apenas se eles não forem strings vazias
    if (accessToken !== '') {
        keysToReplace['ACCESS_TOKEN'] = tokenType + ' ' + accessToken;
    }
    if (refreshToken !== '') {
        keysToReplace['REFRESH_TOKEN'] = refreshToken;
    }
    const hasOwnProperty = Object.prototype.hasOwnProperty;
    
    let newContent = arquivo.split('\n').map(line => {
        const [key] = line.split('=');
        if (hasOwnProperty.call(keysToReplace, key)) {  // Usando call para verificar a propriedade
            return `${key}=${keysToReplace[key]}`;
        }
        return line;
    }).join('\n');

    try {
        fs.writeFileSync(env, newContent, 'utf-8');  // Escrever as mudanças de volta ao arquivo .env
        console.log('Arquivo .env atualizado com sucesso!');        
    } catch (error) {
        console.error('O .env não foi atualizado:', error);
    }
}