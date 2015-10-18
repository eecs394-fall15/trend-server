var express = require('express');
var router = express.Router();



//request handlers to use for searching
var requests = {
	twitter : require('./newsSources/twitterRoutes').requests,
 	reddit : require('./newsSources/redditRoutes').requests,
 	nyt : require('./newsSources/nytRoutes').requests,
 	ninegag : require('./newsSources/ninegag').requests,
 	google :require('./newsSources/google').requests,
	bing : require('./newsSources/bing').requests,
};


//list of all sites supported
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
		else {
			if(site ==="reddit")
				data = JSON.parse(data);	
			complete[site] = data;
		}

		var finished = true;

		foundSites.forEach(function(siteName){
			if (complete[siteName] == null)
				finished = false;
		});

		if (finished)
			return cb( null, complete);
	}
}



router.post("/", function(req, res, next){
	var sites = req.body.sites.split(',');
	var search = req.body.search;

	searchSites(sites, search, function(err, data){
		console.log(data);
		res.json(data);
	});
});



module.exports.router = router;