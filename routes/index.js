var express = require('express');
var router = express.Router();
require('./google')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Server is up');
});


/* NEWS SERVICE ENDPOINTS */

router.use('/twitter', require('./twitterRoutes').router);
// router.use('/yahoo', require('./yahooRoutes').router);
router.use('/nyt', require('./nytRoutes').router);
router.use('/reddit', require('./redditRoutes').router);
router.use('/ninegag', require('./ninegag').router);
router.use('/facebook', require('./facebook').router);
router.use('/google', require('./google').router);
router.use('/bing', require('./bing').router);


// router.use('/search', require('./search'));


module.exports = router;
