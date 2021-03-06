async function start(req, res) {
    const AssistantV2 = require('watson-developer-cloud/assistant/v2');
    const assistant = require('../data/assistant.json');
    const Chat = require('../models/Chat');
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

    const Conversation = new Chat(service, assistantId, messageText);
    const { placeOrder } = require('../models/order.js');

    //Async function (working with promises)

    if(sessionId === ''){
        sessionId = await Conversation.createSession();
    }
    const answer = await Conversation.sendMessage(sessionId);
    let send = await Conversation.responseHandler(answer);
    if(send.action){
        if(send.action === 'show_weather'){
           send = await weather.check(chatbotResource, res);
        } else if(send.action === 'order'){
            send.data = await placeOrder(send.info);
        }
    }
    return send;
}

module.exports = {
   start
};