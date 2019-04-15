const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/answer',function(req, res, next) {
	var redirect_url = req.session.originalUrl;
	passport.authenticate('openidconnect', {
		successRedirect: redirect_url,
		failureRedirect: '/user/login/failure',
	})(req,res,next);
});

module.exports = router;