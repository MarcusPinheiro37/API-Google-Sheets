import { config } from 'dotenv';
import axios from 'axios';
import qs from 'qs';
import modificaEnv from '../utils/modificaEnv.js';
config();

(async() => {
    const formData = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: process.env.CODE,
        grant_type: 'authorization_code',
        redirect_uri: process.env.REDIRECT_URI
    };
    const options = {
        method: 'POST',
        url: 'https://www.googleapis.com/oauth2/v4/token',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify(formData),
        fetchWithFullResponse: false
    };
    const result = await axios(options);
    const accessToken = result.data.access_token;
    const refreshToken = result.data.refresh_token;
    modificaEnv({accessToken, refreshToken});
})();
