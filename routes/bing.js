var express = require('express');
var BingNews = require('bing-news')
var router = express.Router();


var bingNews = new BingNews();


router.get('/search/:search', function(req, res, next){

	var query = req.params.search;

	if(!query)
		res.sendStatus(400);

	bingNews.stream(query, function(stream) {
		var queryData = [];

		stream.on(BingNews.DATA, function(data) {
			return queryData.push(data);
		});

		stream.on(BingNews.ERROR, function(error) {
			return console.log('Error Event received... ' + error);
		});

		//collects from the stream
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
	}
}


module.exports.router = router;



