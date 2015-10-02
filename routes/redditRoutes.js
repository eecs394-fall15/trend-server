//dependencies
var express = require('express');
var router = express.Router();
var request = require('request');

/************ SEARCH ****************************************/
router.get("/search/:term", function(req, res, next){
	//encodeURIComponent() if need be
	console.log(req.params.term);
	if (!req.params.term)
		res.send(400);

	var search = "https://www.reddit.com/search.json?q=" + req.params.term + "+subreddit:news";

	request.get(search, function(error, response, body){
		if(!error) {
			res.send(body);
		}
		else
			next();
	});
	// client.get('/search/tweets', query, function(error, tweets, response){
	// 	if(!error) {
	// 		tweets.search = search;
	// 		res.send(tweets);
	// 	}
	// 	else
	// 		next();
	// });
});






/*********** Custom Users **********************************/


module.exports = router;