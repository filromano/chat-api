var request = require('xhr-request')
 
request('https://b9eae2fb-e9e9-475c-8561-0549f39e21a3:aE7Uql75X7@twcservice.mybluemix.net:443/api/weather/v1/geocode/40.69/-74.25/observations.json', {
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
  console.log('Temperature: ', data.observation.temp)
})