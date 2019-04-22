const mongoose = require('mongoose');
const settings = require('../app/data/settings');
const config = require('config');

module.exports = function() {  
    let db;
    if(settings.env === 'development'){
        db = config.get('db');
    } else {
        db = 'mongodb+srv://' + config.get('dbuser') + ':' + config.get('dbpassword') + '@' + config.get('db');
    }
    mongoose.connect(db, { useNewUrlParser: true })
        .then(() => console.log(`Connected to ${db}...`))
        .catch(err => console.log(err))
}