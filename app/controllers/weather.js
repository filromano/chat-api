module.exports.check = function(application, req, res){
    var request = require('xhr-request');
    var weatherJson = require('../data/weather.json');
    var chatbotResource = req.body.info.chatbotType;
    
    request('https://' + weatherJson[chatbotResource].username + ':' + weatherJson[chatbotResource].password + '@twcservice.mybluemix.net:443/api/weather/v1/geocode/40.69/-74.25/observations.json', {
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