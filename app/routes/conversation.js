const conversation = require('../controllers/conversation');
const express = require('express');
const router = express.Router();

router.post('/', function(req, res){
  conversation.start(req, res).then(send => res.json(send));
});

module.exports = router;