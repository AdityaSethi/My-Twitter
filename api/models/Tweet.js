/**
 * Tweet
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	tweetBy: 'STRING', //User name | userid. eg: Pinakin Mistry | pinakinmistry
  	createdAt: 'DATE',
  	tweetText: {
  		type: 'STRING',
  		maxLength: 140
  	}
    
  }

};
