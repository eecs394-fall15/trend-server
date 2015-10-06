var express = require('express');
var router = express.Router();
//var yahooRoutes = require('./yahooRoutes');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Server is up');
});

router.use('/twitter', require('./twitterRoutes').router);
//router.use('/yahoo', );
router.use('/nyt', require('./nytRoutes').router);
router.use('/reddit', require('./redditRoutes').router);
router.use('/ninegag', require('./ninegag').router);
// router.use('/search', require('./search'));


module.exports = router;
