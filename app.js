const settings = require('./app/data/settings');
const https = require('https');
const fs = require('fs');
const app = require('./startup/server');

const serverPort = settings.server.port;
const httpsOtions = {
    key: fs.readFileSync(settings.ssl.keyLocation),
    cert: fs.readFileSync(settings.ssl.certLocation),
    passphrase: settings.ssl.passphrase,
    requestCert: false,
    rejectUnauthorized: false
};

var server = https.createServer(httpsOtions, app).listen(serverPort, () => {
    const host = server.address().address;
    const port = server.address().port;
    let msg = 'Listening at http://'+host+':'+port+" on "+settings.env+" mode";
    console.log(msg);
});