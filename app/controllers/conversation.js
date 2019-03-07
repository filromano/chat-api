function start(req, res) {
    new Promise((resolve, reject) => {
      const AssistantV2 = require('watson-developer-cloud/assistant/v2');
      const assistant = require('../data/assistant.json');
      const chat = require('../models/Chat');
      const info = req.body.info; // obj from vue
      const chatbotResource = info.chatbotType; //which chatbot to choose in the json
      let sessionId = info.sessionId;
      const messageText = info.message;
      const service = new AssistantV2({
        iam_apikey: assistant[chatbotResource].iam_apikey, // replace with API key
        version: assistant[chatbotResource].version
      });
      const assistantId = assistant[chatbotResource].assistantId; // replace with assistant ID

      const Chat = new chat(service, assistantId, messageText);
      const weather = require('../controllers/weather');
      if(sessionId == ''){
        Chat.createSession()
          .then(sessionId => Chat.sendMessage(sessionId))
          .then(answer => Chat.responseHandler(answer))
          .then(send => res.json(send));
      } else {
        Chat.sendMessage(sessionId)
          .then(answer => Chat.responseHandler(answer))
          .then(send => {
            if(send.action){
              if(send.action == 'show_weather'){
                weather.check(chatbotResource, res)
              }
            } else {
              res.json(send)
            }
          });
      }
    });
}

module.exports = {
  start
};