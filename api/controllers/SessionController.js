/**
 * SessionController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

	'new' : function(req, res){
		res.view('session/new');
	},

	create: function(req, res, next){
		if(!req.param('email') || !req.param('password')){
			req.session.flash = {
				err: 'Please enter both username and password'
			}

		res.redirect('session/new');
		return;
		}

		User.findOneByEmail(req.param('email')).done(function(err, user){
			if(err) return next(err);

			if(!user){
				req.session.flash = {
					err: 'No such user found in database'
				}
			res.redirect('session/new');
			return;	
			}
			console.log(user)
			if(req.param('password') == user.encryptedPassword){
				req.session.authenticated = true;
				req.session.user = user;
				res.redirect('/user/show' + user.id)
			}
			else{
				req.session.flash = {
					err: 'invalid username and password'
				}
			}
		});
	}
  
};
