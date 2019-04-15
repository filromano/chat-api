const settings = require('../../data/settings');
const OpenIDConnectStrategy = require('passport-idaas-openidconnect')
                                                            .IDaaSOIDCStrategy;

////////////////////////////////////////////////////////////////////////////////

const CACertPathList = Array.isArray(settings.oidc.jwtCertificate) ?
                                        settings.oidc.jwtCertificate :
                                        [].push(settings.oidc.jwtCertificate);

const openIdConnectionStrategyOptions = {
     authorizationURL : settings.oidc.authorizationUrl,
     tokenURL : settings.oidc.tokenUrl,
     clientID : settings.oidc.clientId,
     scope: 'openid',
     response_type: 'code',
     clientSecret : settings.oidc.clientSecret,
     callbackURL : settings.oidc.callbackUrl,
     skipUserProfile: true,
     issuer: settings.oidc.issuerId,
     addCACert: true,
     CACertPathList
};

const openIDConnectStrategyCallback = (iss, sub, profile, accessToken, refreshToken, params, done) => {
   process.nextTick(() => {
       profile.accessToken = accessToken;
       profile.refreshToken = refreshToken;
       done(null, profile);
   });
};

const Strategy = new OpenIDConnectStrategy(openIdConnectionStrategyOptions, openIDConnectStrategyCallback);

module.exports = Strategy;
