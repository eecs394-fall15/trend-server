var express = require('express');
var router = express.Router();
var gag = require('node-9gag');



var requests = {
	searchTrends : function(query, callback) {
		gag.section(query, function(err, results) {
			callback(err, results);
		});
	},

	search : function(query, callback){
		gag.find(query, function(err, results){
			callback(err, results);
		});
	}
};

var handlers = {
	search : function(req, res, next) {
		var query = req.params.search;
		if (!query)
			res.sendStatus(403);

		requests.search(query, function(err, results){
			if (!err){
				res.send(results);
			} else {
				console.log(err);
				next();
			}
		})
	},

	searchTrends : function(req, res, next){
		var query = req.params.section;

		if (!query)
			query = 'hot';

		requests.searchTrends(query, function(err, results){
			if(err)
				console.log(err);
			else {
				console.log(res);
				res.send(results);
			}
		})
	}
};



/**
*
*/
router.get('/search/:search', handlers.search);


/**
*
*/
router.get('/trends/:section', handlers.searchTrends);

module.exports.router = router;
module.exports.handlers = handlers;
module.exports.requests = requests;