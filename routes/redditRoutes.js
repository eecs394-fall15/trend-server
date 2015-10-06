//dependencies
var express = require('express');
var router = express.Router();
var request = require('request');


var handlers = {
	search: function(req, res, next){
		//encodeURIComponent() if need be
		console.log(req.params.term);
		if (!req.params.term)
			res.send(400);

		var search = "https://www.reddit.com/search.json?q=" + req.params.term + "+subreddit:news";

		request.get(search, function(error, response, body){
			if(!error) {
				res.send(body);
			}
			else {
				console.log(error);
				next();
			}
		});
	}
}

/************ SEARCH ****************************************/
router.get("/search/:term", handlers.search);


module.exports.router = router;
module.exports.handlers = handlers;