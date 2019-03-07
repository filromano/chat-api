module.exports = function(application){
  const conversation = require('../controllers/conversation');
  application.post('/conversation/', function(req, res){
   conversation.start(application, req, res);
  });
}