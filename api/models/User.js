/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

//var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
  	
  	schema: true,

  	name: {
  		type: 'string',
  		required: true
  	},
  	sex: {
  		type: 'string',
  		required: false
  	},
  	email: {
  		type: 'string',
  		email: true,
  		required: false,
  		unique: true
  	},
  	password:{
  		type: 'string'
  	}

  	// 'toJSON' : function () {
  	// 	var obj = this.toObject();
  	// 	delete obj.encryptedPassword;
  	// 	delete obj.password;
  	// 	delete obj._csrf;
  	// 	return obj;
  	// },

    // beforeCreate: function (values, next) {
    // var bcrypt = require('bcrypt');
    // // This checks to make sure the password and password confirmation match before creating record
    // // console.log('=========================================')
    // // if (!values.password) {
    // //   return next({err: ["Password doesn't match password confirmation."]});
    // // }

    // // bcrypt.hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
    // //   if (err) return next(err);
    // //   values.encryptedPassword = encryptedPassword;
    // //   // values.online= true;
    // //   console.log('=========================================')
    // //   console.log(encryptedPassword)
    // //   next();
    // // });

    //  bcrypt.genSalt(10, function(err, salt) {
    //   if (err) return next(err);

    //   bcrypt.hash(values.encryptedPassword, salt, function(err, hash) {
    //     if (err) return next(err);
        
    //     values.encryptedPassword = hash;
    //     console.log(hash);
    //     console.log('inside create')
    //     next();
    //   });
    // });
  // }
    
  }

};
