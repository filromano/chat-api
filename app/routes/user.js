const express = require('express');
const router = express.Router();
const passport = require('passport');
const ensureAuthenticated = require('../middleware/ensure-authenticated');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const config = require('config');

router.get('/', ensureAuthenticated, function(req, res) {
    
    var claims = req.user['_json'];
    console.log(claims);
    axios.post('http://localhost:1337/connecteds', {
        name: claims.firstName,
        email: claims.emailAddress
    })
    .then(response => {
        console.log(response);
        const token = jwt.sign({ _id: response.data._id}, config.get('jwtPrivateKey'));
        res.redirect('http://localhost:8080/?token=' + token);
        //res.send('<h2>Hello' + claims.firstName + claims.familyName + '<br/>Welcome to IBMid Demo router</h2><br/>Your token is:' + token);
    })
    .catch(err => { console.error(err) })
    
});

router.get('/login', passport.authenticate('openidconnect', {}));

router.get('/login/failure', function(req, res) {
	res.send('login failed');
});

module.exports = router;
