const conversation = require('../controllers/conversation');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  console.log('aqui')
  const send = await conversation.start(req, res)
  res.json(send);
});

module.exports = router;