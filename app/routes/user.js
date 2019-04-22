const express = require('express');
const router = express.Router();
const passport = require('passport');
const ensureAuthenticated = require('../middleware/ensure-authenticated');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const config = require('config');
const { User } = require('../models/login');

router.get('/', ensureAuthenticated, async (req, res) => {
    
    var claims = req.user['_json'];
    console.log(claims);
    let user = new User({
        name: claims.firstName,
        email: claims.emailAddress
    });
    user = await user.save();
    const token = jwt.sign({ _id: user._id}, config.get('jwtPrivateKey'));
    res.redirect(config.get('front') + '/?token=' + token);
    
    // using strapi
    /* axios.post(config.get('db') + '/connecteds', {
        name: claims.firstName,
        email: claims.emailAddress
    })
    .then(response => {
        console.log(response);
        const token = jwt.sign({ _id: response.data._id}, config.get('jwtPrivateKey'));
        res.redirect(config.get('front') + '/?token=' + token);
        //res.send('<h2>Hello' + claims.firstName + claims.familyName + '<br/>Welcome to IBMid Demo router</h2><br/>Your token is:' + token);
    })
    .catch(err => { console.error(err) }) */
    
});

router.get('/login', passport.authenticate('openidconnect', {}));

router.get('/login/failure', function(req, res) {
	res.send('login failed');
});

module.exports = router;
