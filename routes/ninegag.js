var express = require('express');
var router = express.Router();
var gag = require('node-9gag');

router.get('/search/:search', function(req, res, next) {
	var query = req.params.search;
	if (!query)
		res.sendStatus(403);

	gag.find(query, function(err, results){
		if (err){
			console.log(err);
		} else {
			console.log(results);
			res.send(results);
		}
	})
});


//
router.get('/trends/:section', function(req, res, next){
	var query = req.params.section;

	if (!query)
		query = 'hot';

	gag.section(query, function(err, results){
		if(err)
			console.log(err);
		else {
			console.log(res);
			res.send(results);
		}
	})
});

module.exports.router = router;