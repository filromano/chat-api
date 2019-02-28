module.exports.check = function(application, req, res){
    const request = require('xhr-request');
    const weatherJson = require('../data/weather.json');
    const chatbotResource = req.body.info.chatbotType; // which weather we should look for in the json
    
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