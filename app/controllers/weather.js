module.exports.check = function(application, req, res){
    var request = require('xhr-request');
    var weatherJson = require('../data/weather.json');
    
    request('https://' + weatherJson.store.username + ':' + weatherJson.store.password + '@twcservice.mybluemix.net:443/api/weather/v1/geocode/40.69/-74.25/observations.json', {
        method: 'GET',
        json: true,
        qs: {
            units: "m",
            language: "pt-br"  
            }
        }, function (err, data) {
            if (err) {
                console.error(err); // something went wrong
                return;
            }
            var weather = {
            text: "Current temperature in NY is: " + data.observation.temp + " Fahrenheit"
        }
        res.json(weather);
    })
}