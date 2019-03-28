const express = require('express');
const router = express.Router();
const axios = require('axios');
const querystring = require('querystring')

router.post('/', (req, res) => {
    const credentials = querystring.stringify({
        i: req.body.email,
        p: req.body.password
      })
    axios.post('https://msc-wardrobe.w3ibm.mybluemix.net/login', credentials)
    .then(response => {
        res.json(response.data);
    })
    .catch(err => {
        console.error(err);
        res.json({error: true, msg: 'Internal server error!'});
    })
});

module.exports = router;