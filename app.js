const settings = require('./app/data/settings');
let app;
if(settings.env === 'development'){
    app = require('./startup/dev');
} else {
    app = require('./startup/prod');
}