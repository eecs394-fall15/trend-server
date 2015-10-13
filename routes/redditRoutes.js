//dependencies
var express = require('express');
var router = express.Router();
var request = require('request');

var requests = {

	search : function(query, callback) {
		query = "https://www.reddit.com/search.json?q=" + query +  "+subreddit:news";

		request.get(query, function(error, response, body){				
			callback(error, body, response);
		});
	}
};

var handlers = {
	search: function(req, res, next){
		//encodeURIComponent() if need be
		console.log(req.params.term);
		if (!req.params.term)
			res.send(400);

		var query = req.params.term;

		requests.search(query, function(error, body, response) {
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
module.exports.requests = requests;