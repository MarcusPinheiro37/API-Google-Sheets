import { config } from 'dotenv';
import axios from 'axios';
import accessToken from '../auth/accessToken.js';
config();
accessToken();
export default async () => {
    const configs = { 
        method: 'GET',
        url: 'https://www.googleapis.com/drive/v3/files',
        params: {
            supportsAllDrives: true,
            includeItemsFromAllDrives: true,
            q: '\'1-x3FgEUBmM2g9r2HIDaRdKHbdm_gDu2h\' in parents', // query correta
        },
        headers: {
            Authorization: process.env.ACCESS_TOKEN
        }
    };
    try {
        const response = await axios(configs);
        // console.log('Lista Planilhas check');
        return response.data.files;
    } catch (error) {
        console.error('Erro ao buscar dados: ', error.data );
    }
};