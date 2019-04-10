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

    async responseHandler(answer){
        if (answer.response.output.intents.length > 0) {
            console.log('Detected intent: #' + answer.response.output.intents[0].intent);
        }

        let send;
        if(answer.response.output.actions){
            const actions = answer.response.output.actions;
            console.log(actions[0]);
            if(actions[0].name === 'show_weather'){
                send = {
                    action: 'show_weather'
                }
            } else if (actions[0].name === 'display_time'){
                send = {
                    text: 'The current time is ' + new Date().toLocaleTimeString() + '.',
                    sessionId: answer.sessionId
                }
            } else if (actions[0].name === 'order'){
                send = {
                    action: "order",
                    info: {
                        date: actions[0].parameters.date,
                        number: actions[0].parameters.number,
                        location: actions[0].parameters.location,
                        quantity: actions[0].parameters.quantity,
                    },
                    text: answer.response.output.generic[0].text,
                    sessionId: answer.sessionId
                }
            }
        } else if (answer.response.output.generic.length != 0) {
            send = {
                text: answer.response.output.generic[0].text,
                sessionId: answer.sessionId
            };
            //console.log(answer.response.output.generic[0].text);
        }
        return send;
}
}
    

module.exports = Chat;