import { config } from 'dotenv';
import axios from 'axios';
import qs from 'qs';
import modificaEnv from '../utils/modificaEnv.js';
config();
export default async () => {
    const formData = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        refresh_token: process.env.REFRESH_TOKEN,
        grant_type: 'refresh_token',
    };
    const configs = {
        method: 'POST', // Definindo explicitamente o método como POST
        url: 'https://www.googleapis.com/oauth2/v4/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // Definindo o Content-Type para o corpo da requisição ser enviado corretamente
        },
        data: qs.stringify(formData),
        fetchWithFullResponse: false
    };

    const result = await axios(configs);
    const tokenType = result.data.token_type;
    const accessToken = result.data.access_token;
    modificaEnv({tokenType, accessToken});
};