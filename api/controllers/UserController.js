/**
 * UserController
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
    
  'new' : function (req, res) {
  	res.view();
  },

  'create' : function (req, res, next){
    var name = req.param("name");
    var userid = req.param("userid");
    var password = req.param("password");
    var email = req.param("email");
    var sex = req.param("sex");
    var hasher = require("password-hash");
    password = hasher.generate(password);
    
  	User.create({name: name, userid: userid, password: password, email: email, sex: sex, following: [], followers: [], tweetCount: 0}, function userCreated(err, user){
  		
  		if(err) {
  			req.session.flash = {
  				err: err
  			}
  			return res.redirect('user/new')
  		}
  		
  		//res.json(user);
  		//req.session.flash = {}
      else {
        console.log('inside create');
        req.session.authenticated = true;
        console.log(req.session.authenticated);
        req.session.user = user;
        res.redirect('/user/show/'+user.id);
     }
  	});
  },

  'show' : function (req, res, next){
    User.findOne(req.param('id'), function foundUser(err, user) {
      if(err)  return next(err);
      if(!user) return next();
      Tweet.find(function foundTweets(err, tweets){
        if(err) return next(err);
        res.view({
          user: user,
          tweets: tweets
        })
      })
    })
  },
  'search' : function (req, res, next){
    User.findOneByName(req.param('name'), function foundUser(err, users) {
      if(err)  return next(err);
      if(!users) return next();
      console.log('user found')
      console.log(users);
      res.json({
        users: users
      });
    })
  },

  'follow' : function (req, res, next){
    var followingId = req.param('id');
    User.findOneById(followingId, function userUpdate(err, user){
      if(err)  return next(err);
      if(!user) return next();
      console.log('Following user ...')
      console.log(user);
      var myId = req.session.user.id;
      user.followers.push(myId);
      user.save(function(err){
        console.log(err);
        if(err) return next(err);
        console.log("Added myself in followinger's followers' list. Adding followinger's is my following list...");
        User.findOneById(myId, function userUpdate(err, user){
          if(err)  return next(err);
          if(!user) return next();
          console.log('Updaing my following list ...');
          user.following.push(followingId);
          user.save(function(err){
            console.log(err);
            if(err) return next(err);
            console.log("Added myself in followinger's followers' list. Adding followinger's is my following list...");
          });
        });
      });
      res.json({
        message: 'following the selected user'
      }); 
    });
  },

  index: function (req, res, next){
    console.log('inside index')
    console.log(req.session.authenticated)
     if (req.session.authenticated == true) {
      
      User.find(function foundUsers(err, users){
        if(err) return next(err);
        res.view({
          users: users
        })
      })
    }
    else{
      res.redirect('session/new');
    }  
  },

  edit : function (req, res, next){
    User.findOne(req.param('id'), function foundUser(err, user) {
      if(err)  return next(err);
      if(!user) return next('User Doesnt exist');
      res.view({
        user: user
      });
    })
  },

  update : function (req, res, next){
    User.update(req.param('id'), req.params.all(), function userUpdate(err, user){
      
      if(err) {
        return res.redirect('user/edit/' + req.param('id'))
      }
      res.redirect('/user/show/' + req.param('id'))
    });
  },

  destroy : function (req, res, next){
    User.findOne(req.param('id'), function foundUser(err, user) {
      if(err)  return next(err);
      if(!user) return next('User Doesnt exist');
      
      User.destroy(req.param('id'), function userDestroyed(err){
        if(err) return next(err);
      });

      res.redirect('/user');
    });
  },

};
