/**
 * Tweet
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
	schema : true,

  attributes: {
  	schema: true,
    tweetBy: 'STRING', //User name @userid. eg: Pinakin Mistry @pinakinmistry
    userid: 'STRING',
  	createdAt: 'DATE',
  	tweetText: {
  		type: 'STRING',
  		maxLength: 140
  	}
    
  }

};
