const conversation = require('../controllers/conversation');
const express = require('express');
const router = express.Router();

router.post('/', function(req, res){
  console.log('aqui');
  conversation.start(req, res);
});

module.exports = router;