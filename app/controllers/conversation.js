module.exports.start = function(application, req, res){
    var AssistantV2 = require('watson-developer-cloud/assistant/v2');
    var assistant = require('../data/assistant.json');

    var chatbotResource = req.body.chatbotType;
    var sessionId = req.body.sessionId;
    var messageText = req.body.message;
    
    var service = new AssistantV2({
      iam_apikey: assistant[chatbotResource].iam_apikey, // replace with API key
      version: assistant[chatbotResource].version
    });
    
    var assistantId = assistant[chatbotResource].assistantId; // replace with assistant ID
    var sessionId;

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
            application.app.controllers.weather.check(application, req, res);
          }
        }
        // Display the output from assistant, if any. Assumes a single text response.
        if (response.output.generic.length != 0) {
          response.output.generic[0].sessionId = sessionId;
          res.json(response.output.generic[0]);
          console.log(response.output.generic[0].text);
        }
    }
}