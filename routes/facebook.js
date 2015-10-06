var express = require('express');
var router = express.Router();
var accessToken = null;

var fb = require('facebook-node');

console.log(process.env.FACEBOOK_APP_ID);

/*fb.api('oauth/access_token', {
    client_id: process.env.FACEBOOK_APP_ID,
    client_secret: process.env.FACEBOOK_APP_SECRET,
    grant_type: 'client_credentials'
}, function (res) {
    if(!res || res.error) {
    	console.log(res);
        console.log(!res ? 'error occurred' : res.error);
        throw new Error('Facebook failed');
    }

    accessToken = res.access_token;
    fb.setAccessToken = accessToken;
});*/

fb.setAccessToken("1531764247114354|jMvOM5nXEoQX7SdRPTR2-Sjn4qE");

router.get('/search/:search', function(req, res, next){
	var query = req.params.search;

	// console.log(accessToken);

	if(!query)
		res.sendStatus(403);

	var options = {
		type: "topic",
		q: query,
		fields: "id,name,page"
	}
	fb.api('/search',options, function(response){
		if (response.error)
			console.log(response.error);

		res.send(response);
	})
});

module.exports.router = router;