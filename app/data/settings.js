const config = require('config');
const cliId = 'NDQ2MjVhOTUtY2UyYS00';
const cliSecret = 'NzFlOGE2NGYtOWI5MC00';
const settings = {
    env: process.env.NODE_ENV || "development",
    express:{
        trustProxy: 1
    },
    oidc:{
        clientId: cliId,
        clientSecret: cliSecret,
        authorizationUrl: "https://w3id.alpha.sso.ibm.com/isam/oidc/endpoint/amapp-runtime-oidcidp/authorize",
        tokenUrl: "https://w3id.alpha.sso.ibm.com/isam/oidc/endpoint/amapp-runtime-oidcidp/token",
        issuerId: "https://w3id.alpha.sso.ibm.com/isam",
        callbackUrl: config.get("apiCallback"),
        jwtCertificate: ["/certificates/oidc_w3id_staging.cer"]
    },
    server:{
        port: process.env.PORT || 9995
    },
    session:{
        name: "ssid",
        secret: ["ADD","YOUR", "SECRETS", "HERE!"],
        resave: true,
        saveUninitialized: true
    },
    ssl:{
        keyLocation: './certificates/private_key.pem',
        certLocation: './certificates/server.pem',
        passphrase: 'filfil' //You can ommit this if our key/cert is password free
    }
}

module.exports = settings;