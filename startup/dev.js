const fs = require('fs');
const https = require('https');
const settings = require('../app/data/settings');
const serverPort = settings.server.port;
const app = require('./server');

const httpsOtions = {
    key: fs.readFileSync(settings.ssl.keyLocation),
    cert: fs.readFileSync(settings.ssl.certLocation),
    passphrase: settings.ssl.passphrase,
    requestCert: false,
    rejectUnauthorized: false
};

const server = https.createServer(httpsOtions, app).listen(serverPort, () => {
    const host = server.address().address;
    const port = server.address().port;
    let msg = 'Listening at http://'+host+':'+port+" on "+serverPort+" mode";
    console.log(msg);
});