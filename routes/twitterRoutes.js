var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
process.env.twitter = require('../.env').twitter;




var client = new Twitter({
	consumer_key: '8hIhA4lPweK0zKGkLC1TlP24m',
	consumer_secret: 'Bw58SuhKWRjRGzMuT5gIQU73NeibESxSIWFiqFr2ZlH8r0bfmA',
	access_token_key: '1604262216-inPYjgef9gnX6QXTuZJRhMh8KLWJ6EHvCIRbcVO',
	access_token_secret: 'SnVMmCuH7rv1Qzb9yTPF2XyUHdY9LltKhW590GVKroYC6'
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