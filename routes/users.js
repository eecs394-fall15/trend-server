var router = require('express').Router();
var mongoose = require('mongoose');
var User = require('../lib/models/Users')


function cleanTrendPrefs(postStr){
	if (typeof postStr !== 'string')
		return {};

	var termGroups = postStr.split('|');
	var ret = {}
	termGroups.forEach(function(termGroup){
		termGroup = termGroup.split(':');
		if(termGroup.length < 2)
			return;

		var term = termGroup[0]
		var sites = termGroup[1].split(',');
		ret[term] = sites;
	});

	return ret;
}

router.route('/')
	//create user
	.post(function(req, res, next){
		var b = req.body;
		var trendPreferences = b.trendPreferences ? cleanTrendPrefs(b.trendPreferences) : {};

		var userParams = {
			userid : mongoose.Types.ObjectId(),
			age : b.age || 18,
			preferences: {
				trendPreferences : trendPreferences || {},
				searchHistory : []
			},
			subscriptions : b.subscriptions || []
		};

		console.log(trendPreferences)
		//save User to db and return status 
		var newUser = new User(userParams);
		newUser.save(function(err, newUser){
			if(!err)
				res.status(201).send(newUser);
			else
				res.status(400).send(err);
		});
	});

router.route('/:userid')
	//read user data
	.get(function(req, res, next){
		console.log(mongoose.Types.ObjectId());
		User.findOne( {userid: req.params.userid}, { 
			//don't send back tons of personal info
			accounts : 0,
			createdOn : 0
		}, foundUser);

		function foundUser(err, user){
			if(err)
				res.status(400).send(err);
			else if (user) {
				console.log(user);
				res.send(user);
				user.lastLogin = Date.now();
				user.markModified('lastLogin');
				user.save();
			} else 
				res.status(404).send('User not found');
		}
	})

	//update user object
	.put(function(req, res, next){
		var userUpdate  =  req.body.user;

		if(!userUpdate)
			res.sendStatus(400);

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
				var updateKeys = Object.keys(userUpdate);
				updateKeys.forEach(function(key){
					if(user[key]) {
						user[key] = userUpdate[key]
						user.markModified(key);
					}
				});

				user.save(function(err, modifiedUser){
					if (err)
						res.status(400).send(err);
					else
						res.status(201).send(modifiedUser);
				})
			}
		}
	})

	//delete user object
	// .delete(function(req, res, next){

	// });

module.exports.router = router;

