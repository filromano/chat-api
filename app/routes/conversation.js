const conversation = require('../controllers/conversation');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  const send = await conversation.start(req, res)
  res.json(send);
});

module.exports = router;