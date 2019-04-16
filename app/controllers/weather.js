function check(chatbotResource, res) {
    return new Promise((resolve, reject) => {
        const request = require('xhr-request');
        const weatherJson = require('../data/weather.json');
        
        request('https://' + weatherJson[chatbotResource].username + ':' + weatherJson[chatbotResource].password + '@twcservice.mybluemix.net:443/api/weather/v1/geocode/40.69/-74.25/observations.json', {
            method: 'GET',
            json: true,
            qs: {
                units: "m",
                language: "pt-br"  
                }
        }, (err, data) => {
            if (err) {
                console.error(err); // something went wrong
                return;
            }
            const send = {
            text: "Current temperature in NY is: " + data.observation.temp + " Fahrenheit"
            }
            resolve(send);
        })
    })
}

module.exports = {
    check
}