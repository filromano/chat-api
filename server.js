var express = require('express');
var bodyParser = require('body-parser');
var AssistantV2 = require('watson-developer-cloud/assistant/v2');
var request = require('xhr-request');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(function(req, res, next){
    
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-type");

  next();
});
var port= 3000;
var service = new AssistantV2({
  iam_apikey: '3rmJmrRIzCopV4eE0hvGcaMGjHLatuk9CJ-Pnfnq99LT', // replace with API key
  version: '2018-09-20'
});

var assistantId = '6ab05819-8344-4947-b05b-3ba4ec93c6e5'; // replace with assistant ID
var sessionId;

app.listen(port);
app.post('/conversation/', function(req, res){
  // Create session.
  var sessionId = req.body.sessionId;
  var messageText = req.body.message;
  console.log(req.body);
  if(sessionId == ''){
    service.createSession({
      assistant_id: assistantId
    }, function(err, result) {
      if (err) {
        console.error(err); // something went wrong
        return;
      }
      sessionId = result.session_id;
      sendMessage(messageText); // start conversation with empty message
    });
  } else {
    sendMessage(messageText);
  }
  

  // Send message to assistant.
  function sendMessage(messageText) {
    service.message({
      assistant_id: assistantId,
      session_id: sessionId,
      input: {
        message_type: 'text',
        text: messageText
      }
    }, processResponse);
  }

  // Process the response.
  function processResponse(err, response) {
    if (err) {
      console.error(err); // something went wrong
      return;
    }

    // If an intent was detected, log it out to the console.
    if (response.output.intents.length > 0) {
      console.log('Detected intent: #' + response.output.intents[0].intent);
    }
    if(response.output.actions){
      if(response.output.actions[0].name === 'show_weather'){
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
          var weather = {
            text: "Current temperature in NY is: " + data.observation.temp + " Fahrenheit"
          }
          res.json(weather);
        })
      }
    }
    // Display the output from assistant, if any. Assumes a single text response.
    if (response.output.generic.length != 0) {
      response.output.generic[0].sessionId = sessionId;
      res.json(response.output.generic[0]);
      console.log(response.output.generic[0].text);
    }
  }
});