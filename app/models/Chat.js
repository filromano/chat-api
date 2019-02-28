class Chat{
    constructor(sessionId, service, assistantId, messageText){
        this.sessionId = sessionId
        this.service = service;
        this.assistantId = assistantId;
        this.messageText = messageText;
    }

    createSession(application, req, res) {
        let chat = this;
        chat.service.createSession({
            assistant_id: chat.assistantId
            }, function(err, result) {
            if (err) {
                console.error(err); // something went wrong
                return;
            }
            chat.sessionId = result.session_id;
            chat.sendMessage(application, req, res)
        });
    }
    
    sendMessage(application, req, res){
        let chat = this;
        chat.service.message({
            assistant_id: chat.assistantId,
            session_id: chat.sessionId,
            input: {
            message_type: 'text',
            text: chat.messageText
            }
        }, processResponse);

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
            response.output.generic[0].sessionId = chat.sessionId;
            res.json(response.output.generic[0]);
            console.log(response.output.generic[0].text);
            }
        }
    }
}
    

module.exports = function(){
    return Chat;
};