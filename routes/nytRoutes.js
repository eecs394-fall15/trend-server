//dependencies
var express = require('express');
var NYT = require('nyt');

var keys = {
	'article-search' : process.env.NYT_ARTICLE_SEARCH_KEY
};
//authenticate nyt
var client = new NYT(keys);



var router = express.Router();


var requests = {
	search : function(query, callback){
		client.article.search(query, function(articles, error){
			callback(articles, error);
		});
	}
}


var handlers = {
	search:  function(req, res, next){
		//encodeURIComponent() if need be
		if (!req.params.term){
			console.log('No query specified');
			//res.sendStatus(400);
		}
		var term = req.params.term;
		var query = {
			query : term,
			sort : 'newest'
		};

		requests.search(query, function(articles, error){
			if(!error)
				res.send(articles);
			else {
				console.log(error);
				next();
			}
		});
	}
};


/************ SEARCH ****************************************/
router.get("/search/:term", handlers.search);




module.exports.router = router;
module.exports.handlers = handlers;
module.exports.requests = requests;