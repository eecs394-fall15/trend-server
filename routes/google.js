var express = require('express');
var GoogleNews = require('google-news')
var router = express.Router();


var googleNews = new GoogleNews();


var requests = {
	search : function(query, callback) {
		googleNews.stream(query, function(stream) {
		var queryData = [];

		stream.on(GoogleNews.DATA, function(data) {
			return queryData.push(data);
		});

		stream.on(GoogleNews.ERROR, function(error) {
			return console.log('Error Event received... ' + error);
		});


		respond(queryData, callback);
	});
	}

};

var handlers = {
	search : function(req, res, next){

		var query = req.params.search;

		if(!query)
			res.sendStatus(400);

		requests.search(query, function(data) {res.send(data)});
	}
};

router.get('/search/:search', handlers.search);


function respond(queryData, callback){
	if (queryData.length < 3)  { 
		setTimeout(function(){
			respond(queryData, callback);
		}, 250);	
	} else {
		callback(queryData);
	}
}



module.exports.router = router;
module.exports.handlers = handlers;
module.exports.requests = requests;



