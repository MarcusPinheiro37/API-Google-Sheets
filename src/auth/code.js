import { config } from 'dotenv';
import { google } from 'googleapis';
config();

async function generateAuthUrl() {
    const OAuth2Client = google.auth.OAuth2;

    const oauth2Client = new OAuth2Client(
        encodeURI(process.env.CLIENT_ID),
        encodeURI(process.env.CLIENT_SECRET),
        encodeURI(process.env.REDIRECT_URI)
    );

    const scopes = [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/spreadsheets.readonly'
    ];

    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        prompt: 'consent' 
    });

    return url;
}

generateAuthUrl().then((url) => {
    console.log('URL de autorização:', url);
}).catch((error) => {
    console.error('Erro ao criar URL:', error);
});
