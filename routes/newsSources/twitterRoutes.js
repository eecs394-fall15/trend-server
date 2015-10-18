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

var requests = {
	searchTrends : function(query, callback){
		client.get('trends/place', query, function(error, tweets, response){
			callback(error, tweets, response);
		});
	},

	search : function(query, callback) {
		if (query != null && typeof query !== 'object'){
			query = {
				q : query,
				result_type : 'mixed',
				count : 20
			};
		}

		client.get('/search/tweets', query, function(error, tweets, response){
			callback(error, tweets, response);
		});
	}

}


var handlers = {
	trends: function(req, res, next) {
		//defaults to global trends
		var location = req.params.location || 1;
		req.custom= {id : location};

		console.log('Trends requested for: ' + location);
		next();
	},


	searchTrends: function(req, res, next){
		var query = req.custom

		if(!query)
			res.send(400);

		requests.searchTrends(query, function(error, tweets, response){
			if (!error) 
				res.send(tweets);
			else {
				console.log(error);
				next();
			}
		});
	},



	lists: function(req, res,next){
		//defaults to @BreakingNews\/canada list
		var list = req.params.list || 6017542;
		var slug = req.params.slug || 'canada'
		req.custom = { 
			list_id : list,
			slug : slug
		};

		console.log('List requested for: %s, %s',list, slug);
		//next();
	},

	searchLists : function(req, res, next) {
		var query = req.custom;
		if(!query)
			res.send(400);

		client.get('lists/statuses', query, function(error, tweets, response) {
			if(!error)
				res.send(tweets);
			else
				next();
		});
	},

	search : function(req, res, next){
		//encodeURIComponent() if need be
		console.log(req.params.term);
		if (!req.params.term)
			res.send(400);

		var search = req.params.term;
		var query = {
			q : search,
			result_type : req.query.result_type || 'mixed',
			count : 20
		};

		requests.search(query, function(error, tweets, response){
			if (!error) {
				tweets.search = search;
				res.send(tweets);
			} else
				next();
		});

	}
};




/*********** TRENDS **********************************/

router.use('/trends', handlers.trends);

router.get( ['/trends', '/trends/:location'], handlers.searchTrends);


/*********** LISTS **********************************/

router.use('/lists', handlers.lists);


router.get(['/lists', '/lists/:id/:slug'], handlers.searchLists);



/************ SEARCH ****************************************/
router.get(["/search/:term", "/search/:term/:type"], handlers.search);






/*********** Custom Users **********************************/


module.exports.router = router;
module.exports.handlers = handlers;
module.exports.requests = requests;