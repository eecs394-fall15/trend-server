var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Server is up');
});


/* NEWS SERVICE ENDPOINTS */

router.use('/twitter', require('./newsSources/twitterRoutes').router);
// router.use('/yahoo', require('./yahooRoutes').router);
router.use('/nyt', require('./newsSources/nytRoutes').router);
router.use('/reddit', require('./newsSources/redditRoutes').router);
router.use('/ninegag', require('./newsSources/ninegag').router);
router.use('/facebook', require('./newsSources/facebook').router);
router.use('/google', require('./newsSources/google').router);
router.use('/bing', require('./newsSources/bing').router);
router.use('/search', require('./search').router);
router.use('/users', require('./users').router);


module.exports = router;