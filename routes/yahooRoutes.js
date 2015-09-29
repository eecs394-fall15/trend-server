var express= require('express');
var router = express.Router();
var Yahoo = require('yaboss');

var client = new Yahoo(process.env.YAHOO_CLIENT_ID, process.env.YAHOO_CLIENT_SECRET);



/*********** TRENDS **********************************/
/*
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
*/



/************ SEARCH ****************************************/
router.get("/search", function(req, res, next){
	//encodeURIComponent() if need be
	console.log(req.query);

	var search = req.query.q;
	console.log(search);

	if (!search)
		res.sendStatus(400);

	var query = {
		count : req.query.count || 20
	};

	/*
	client.searchNews('yahoo', query, function(error, dataFound, response){
		if(!error)
			res.send(dataFound);
		else
			next();
	});*/
	res.send(req.query);
});

module.exports = router;
