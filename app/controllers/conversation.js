module.exports.start = (application, req, res) => {
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
    const Chat = new application.app.models.Chat(sessionId, service, assistantId, messageText);


    if(sessionId == ''){
      Chat.createSession(application, req, res);
     } else {
      Chat.sendMessage(application, req, res);
    }
}