module.exports = function(application){
  application.post('/conversation/', function(req, res){
    application.app.controllers.conversation.start(application, req, res);
  });
}