var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Server is up');
});

router.use('/twitter', require('./twitterRoutes'));


module.exports = router;
