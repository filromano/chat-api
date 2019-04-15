module.exports = (req, res, next) => {

	if (!req.isAuthenticated()) {
		req.session.originalUrl = req.originalUrl;
		res.redirect('/user/login');
	} else {
		return next();
	}
}