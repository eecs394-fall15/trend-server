var router = require('express').Router();
var mongoose = require('mongoose');
var User = require('../lib/models/Users')



router.route('/:userid')
	//create user
	.post(function(req, res, next){
		var b = req.body;

		var userParams = {
			userid : mongoose.Types.ObjectId(),
			age : b.age || 18,
			preferences: {
				trendPreferences : b.trendPreferences || {},
				searchHistory : []
			},
			subscriptions : b.subscriptions || []
		};

		//save User to db and return status 
		var newUser = new User(userParams);
		newUser.save(function(err, newUser){
			if(!err)
				res.sendStatus(201);
			else
				res.status(400).send(err);
		});
	})

	//read user data
	.get(function(req, res, next){
		User.findOne( {userid: req.params.userid}, { 
			//don't send back tons of personal info
			accounts : 0,
			createdOn : 0
		}, foundUser);

		function foundUser(err, user){
			if(err)
				res.status(400).send(err);
			else if (result) {
				res.send(user);
			} else 
				res.status(404).send('User not found');
		}
	})

	//update user object
	.put(function(req, res, next){
		User.findOne( {userid: req.params.userid}, { 
			//don't send back tons of personal info
			accounts : 0,
			createdOn : 0
		}, modifyUser);

		function modifyUser(err, user){
			if(err)
				res.status(400).send(err);
			else if (!result) {
				res.status(404).send('User not found');
			} else {
				//user.
				console.log('Make Modify user');
			}
		}
	})

	//delete user object
	// .delete(function(req, res, next){

	// });

module.exports.router = router;

