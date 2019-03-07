function start(req, res) {
    return new Promise((resolve, reject) => {
      const AssistantV2 = require('watson-developer-cloud/assistant/v2');
      const assistant = require('../data/assistant.json');
      const chat = require('../models/Chat');
      const weather = require('../controllers/weather');

      const info = req.body.info; // obj from vue
      const chatbotResource = info.chatbotType; //which chatbot to choose in the json
      const messageText = info.message;
      const service = new AssistantV2({
        iam_apikey: assistant[chatbotResource].iam_apikey, // replace with API key
        version: assistant[chatbotResource].version
      });
      const assistantId = assistant[chatbotResource].assistantId; // replace with assistant ID

      let sessionId = info.sessionId;

      const Chat = new chat(service, assistantId, messageText);

      if(sessionId == ''){
        Chat.createSession()
          .then(sessionId => Chat.sendMessage(sessionId))
          .then(answer => Chat.responseHandler(answer))
          .then(send => resolve(send));
      } else {
        Chat.sendMessage(sessionId)
          .then(answer => Chat.responseHandler(answer))
          .then(send => {
            if(send.action){
              if(send.action == 'show_weather'){
                weather.check(chatbotResource, res)
              }
            } else {
              resolve(send)
            }
          });
      }
    });
}

module.exports = {
  start
};