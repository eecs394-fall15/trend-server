var exports = module.exports;


exports.reddit = require('./redditRoutes').handlers;
exports.twitter = require('./twitterRoutes').handlers;
exports.nyt = require('./nytRoutes').handlers;
// exports.facebook = require('./facebookRoutes').handlers;
// exports.ninegag = require('./ninegagRoutes').handlers;

