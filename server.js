const express = require('express');
const app = express();
var cors = require('cors');

app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false
}));

app.post('/token', async (req, res) => {

    const oauth = {
        clientId: 'f6cbc12c329f6997d83a',
        clientSecret: '991dee0eb6311e7a977d285e2f34418d2178f819',
        authorizeUrl: 'https://github.com/login/oauth/authorize',
        tokenUrl: 'https://github.com/login/oauth/access_token',
        apiBaseUrl: 'https://api.github.com/',
        redirectUrl: 'https://oauth2-github.herokuapp.com'
    }

    
    const response = await fetch(oauth.tokenUrl + '?' + new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: oauth.clientId,
        client_secret: oauth.clientSecret,
        redirect_uri: oauth.redirectUrl,
        code: req.query.code
    }), {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/vnd.github.v3+json, application/json',
            'Content-Type': 'application/json',
            'User-Agent': oauth.redirectUrl
        }
    });

    const json = await response.json();

    res.json(json);
    
    
});

app.use(express.static('public'));

app.listen(process.env.PORT || 3000, () => console.log('Server is running...'));
