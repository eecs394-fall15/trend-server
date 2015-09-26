var express = require('express');
var router = express.Router();
var Twitter = require('twitter');




var client = new Twitter({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token_key: process.env.ACCESS_TOKEN_KEY,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET
});



function searchTweets(sources){
	var params = {screen_name: 'trend'};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if (!error) {
			console.log(tweets);
		}
	});
}



function getTopTrends(location){

}


router.route('/trends/:location')
	.get(function(req, res, next){
		var location = req.params.location ? req.params.location : 1;
		var params = {id : location};


		client.get('trends/place', params, function(error, tweets, response){
			if (!error) {
				var ret = JSON.stringify(tweets);
				res.send(tweets);
			}

			console.log(error);
		});
});


router.route('/users')



module.exports = router;