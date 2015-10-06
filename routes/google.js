var express = require('express');
var GoogleNews = require('google-news')
var router = express.Router();


var googleNews = new GoogleNews();



router.get('/search/:search', function(req, res, next){

	var query = req.params.search;

	if(!query)
		res.sendStatus(400);

	googleNews.stream(query, function(stream) {
		var queryData = [];

		stream.on(GoogleNews.DATA, function(data) {
			return queryData.push(data);
		});

		stream.on(GoogleNews.ERROR, function(error) {
			return console.log('Error Event received... ' + error);
		});


		respond(res, queryData);
	});
});


function respond(res, queryData){
	if (queryData.length < 3)  { 
		setTimeout(function(){
			respond(res, queryData);
		}, 250);	
	} else {
		res.send(queryData);
		strem.disconnect();
	}
}

module.exports.router = router;



