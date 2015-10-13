var express = require('express');
var router = express.Router();
var async = require('async');



// var async = require('async');
// var lib = require('./lib');


//request handlers to use for searching
var requests = {
	twitter : require('./twitterRoutes').requests,
 	reddit : require('./redditRoutes').requests,
 	nyt : require('./nytRoutes').requests,
 	ninegag : require('./ninegag').requests,
 	google :require('./google').requests,
	bing : require('./bing').requests,
};


var SITES = ['reddit', 'twitter', 'nyt', 'google', 'ninegag', 'bing'];



var searchSites = function(sites, query, cb){
	var complete = {};
	var tasks = [];
	var foundSites = [];

	sites.forEach(function(rawSite){
		var site = rawSite.toLowerCase()
		var index = undefined;

		if(index = SITES.indexOf(site) !== -1) {
			console.log("Included site: %s", site);
			complete[site] = null;
			foundSites.push(site);

			tasks.push( function() { 
				requests[site].search(query, function(err, data, extra) {
					finish(err, data, site);
				});
			});
		};
	});

	tasks.forEach(function(func){
		func();
	})

	function finish(err, data, site){
		if (err)
			complete[site] = err;
		else
			complete[site] = data;

		var finished = true;

		foundSites.forEach(function(siteName){
			if (complete[siteName] == null)
				finished = false;
		});

		if (finished)
			return cb( null, complete);
	}
}


/*searchSites(['bing','ninegag', 'twitter', 'google', 'reddit', 'nyt'], 'pope', function(err, data){
	if(err) console.log(err);
	else console.log(data);
})*/


router.post("/", function(req, res, next){
	console.log(req.body);
	var sites = req.body.sites === 'all' ? SITES : req.body.sites.split(',');
	console.log(sites);
	var search = req.body.search;

	searchSites(sites, search, function(err, data){
		res.send(data);
	});
});



module.exports.router = router;