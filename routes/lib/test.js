var cleaner = require('../normalizer');
var select= require('json-select/select');



var twitterTest = require('./tweets.json');


var twitterCleaned = cleaner.twitter.search(twitterTest);
console.log(twitterCleaned);