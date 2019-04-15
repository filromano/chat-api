process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const express = require('express');
const bodyParser = require('body-parser');
const conversation = require('../app/routes/conversation');
const user = require('../app/routes/user');
const login = require('../app/routes/login');

const config = require('config');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const passport = require('passport');
const session = require('express-session');
const settings = require('../app/data/settings');
const Strategy = require('../app/middleware/strategy');

if (!config.get('jwtPrivateKey')) {
    console.error('Fatal Error: jwt is not definied.')
    process.exit(1);
}

const app = express();

//app config
app.set('trust proxy', settings.express.trustProxy);
app.use(helmet());
app.use(session(settings.session));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

//passport config
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});


passport.use(Strategy);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(function(req, res, next){
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-type");

    next();
});

app.use('/conversation', conversation);
app.use('/user', user);
app.use('/login', login);


////////////////////////////////////////////////////////////////////////////////


module.exports = app;