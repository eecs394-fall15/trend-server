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

route.use('/trends', function(req, res, next) {
	//defaults to global trends
	var location = req.params.location || 1;
	req.params.query = {id : location};
	console.log('Trends requested for: ' + location);
	next();
});

router.get('/trends/:location', function(req, res, next){
	var query = req.params.query;
	if(!query)
		res.send(400)

	client.get('trends/place', query, function(error, tweets, response){
		if (!error) 
			res.send(tweets);
		else
			next();
	});
});


/*********** LISTS **********************************/

route.use('/lists', function(req, res,next){
	//defaults to @BreakingNews\/canada list
	var list = req.params.list || 6017542;
	var slug = req.params.list || 'canada'
	req.params.query = { 
		list_id : list,
		slug : slug
	};

	console.log('List requested for: %s, %s',list, slug);
	next();
});


route.get('/lists/:id/:slug', function(req, res, next) {
	var query = req.params.query;
	if(!query)
		res.send(400);

	client.get('lists/statuses', query, function(error, tweets, response) {
		if(!error)
			res.send(tweets);
		else
			next();
	});
});



/*********** Custom Users **********************************/


module.exports = router;