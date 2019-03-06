class Chat{
    constructor(service, assistantId, messageText){
        this.service = service;
        this.assistantId = assistantId;
        this.messageText = messageText;
    }

    createSession() {
        let chat = this;
        return new Promise((resolve, reject) => {
            chat.service.createSession({
                assistant_id: chat.assistantId
                }, (err, result) => {
                if (err) {
                    console.error(err); // something went wrong
                    return;
                }
                resolve(result.session_id);
            });
        });
        
    }
    
    sendMessage(sessionId){
        let chat = this;
        return new Promise((resolve, reject) => {
            chat.service.message({
                assistant_id: chat.assistantId,
                session_id: sessionId,
                input: {
                message_type: 'text',
                text: chat.messageText
                }
            }, (err, response) => {
                if (err) {
                console.error(err); // something went wrong
                return;
                }
                const answer = {
                    response,
                    sessionId
                };
                console.log(answer)
                resolve(answer)        
            });
        });
        
    }

    responseHandler(application, req, res, answer){
        // If an intent was detected, log it out to the console.
        if (answer.response.output.intents.length > 0) {
            console.log('Detected intent: #' + answer.response.output.intents[0].intent);
        }
        if(answer.response.output.actions){
            if(answer.response.output.actions[0].name === 'show_weather'){
                application.app.controllers.weather.check(application, req, res);
            } else if (answer.response.output.actions[0].name === 'display_time'){
                var time = {
                text: 'The current time is ' + new Date().toLocaleTimeString() + '.'
                }
                res.json(time);
            }
        }
        // Display the output from assistant, if any. Assumes a single text response.
        if (answer.response.output.generic.length != 0) {
            answer.response.output.generic[0].sessionId = answer.sessionId;
            res.json(answer.response.output.generic[0]);
            console.log(answer.response.output.generic[0].text);
        }
    }
}
    

module.exports = Chat;