//dependencies
var express = require('express');
var router = express.Router();
var Twitter = require('twitter');

//authenticate Twitter
var client = new Twitter({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token_key: process.env.ACCESS_TOKEN_KEY,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET
});


/*********** TRENDS **********************************/

router.use('/trends', function(req, res, next) {
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


/*********** LISTS **********************************/

router.use('/lists', function(req, res,next){
	//defaults to @BreakingNews\/canada list
	var list = req.params.list || 6017542;
	var slug = req.params.slug || 'canada'
	req.custom = { 
		list_id : list,
		slug : slug
	};

	console.log('List requested for: %s, %s',list, slug);
	next();
});


router.get(['/lists', '/lists/:id/:slug'], function(req, res, next) {
	var query = req.custom;
	if(!query)
		res.send(400);

	client.get('lists/statuses', query, function(error, tweets, response) {
		if(!error)
			res.send(tweets);
		else
			next();
	});
});




/************ SEARCH ****************************************/
router.get(["/search/:term", "/search/:term/:type"], function(req, res, next){
	//encodeURIComponent() if need be
	console.log(req.params.term);
	if (!req.params.term)
		res.send(400);

	var query = {
		q : req.params.term,
		result_type : req.params.type || 'mixed',
		count : 30
	};

	client.get('/search/tweets', query, function(error, tweets, response){
		if(!error)
			res.send(tweets);
		else
			next();
	});
});






/*********** Custom Users **********************************/


module.exports = router;