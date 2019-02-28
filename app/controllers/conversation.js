module.exports.start = function(application, req, res){
    const AssistantV2 = require('watson-developer-cloud/assistant/v2');
    const assistant = require('../data/assistant.json');

    const info = req.body.info; // obj from vue
    const chatbotResource = info.chatbotType; //which chatbot to choose in the json
    let sessionId = info.sessionId;
    const messageText = info.message;
    console.log(info)
    const service = new AssistantV2({
      iam_apikey: assistant[chatbotResource].iam_apikey, // replace with API key
      version: assistant[chatbotResource].version
    });
    
    const assistantId = assistant[chatbotResource].assistantId; // replace with assistant ID

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
          } else if (response.output.actions[0].name === 'display_time'){
            var time = {
              text: 'The current time is ' + new Date().toLocaleTimeString() + '.'
            }
            res.json(time);
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