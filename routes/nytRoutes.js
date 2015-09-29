//dependencies
var express = require('express');
var router = express.Router();
var NYT = require('nyt');
var keys = {
	'article-search' : process.env.NYT_ARTICLE_SEARCH_KEY
};

//authenticate nyt
var client = new NYT(keys);
console.log(client.article.search);

/*********** TRENDS **********************************/

/*router.use('/trends', function(req, res, next) {
	//defaults to global trends
	var location = req.params.location || 1;
	req.custom= {id : location};

	console.log('Trends requested for: ' + location);
	next();
});

router.get( ['/trends', '/trends/:location'], function(req, res, next){
	var query = req.custom

	if(!query)
		res.send(400);

	client.get('trends/place', query, function(error, tweets, response){
		if (!error) 
			res.send(tweets);
		else
			next();
	});
});
*/




/************ SEARCH ****************************************/
router.get("/search/:term", function(req, res, next){
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

	client.article.search(query, function(articles, error){
		if(!error)
			res.send(articles);
		else {
			console.log(error);
			next();
		}
	});
});






/*********** Custom Users **********************************/


module.exports = router;