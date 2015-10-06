var express= require('express');
var router = express.Router();
var Yahoo = require('yaboss');

var client = new Yahoo(
	//process.env.YAHOO_CLIENT_ID, process.env.YAHOO_CLIENT_SECRET);
	"dj0yJmk9YVZvNzVxTTJ2NHlHJmQ9WVdrOVVFTm5NME51TkRRbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0zNQ--",
	"1fa4f301b6bece2feb32f113d9adc057012fc49c");


/************ SEARCH ****************************************/
router.get("/search/:search", function(req, res, next){
	//encodeURIComponent() if need be
	var query = req.params.search;

	if (!query)
		res.sendStatus(400);

	var options = {
		count : req.query.count || 20
	};

	
	client.searchNews(query, options, function(error, dataFound, response){
		if(!error)
			res.send(response);
		else {
			console.log(dataFound);
			next();
		}
	});
});

module.exports.router = router;
