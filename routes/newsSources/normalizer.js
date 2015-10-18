var select = require('json-select/select');

var exports = module.exports;



console.log(select(
//the object to select from 
{
  hello: [
    {foo: 1, bar: 2, baz: {whatever: true}},
    {foo: 3, bar: 13, baz: {whatever: false}},
    {foo: 70, bar: 77, baz: {whatever: null}}
  ]
},
 
['hello', true, {foo: true, BAR: 'bar', z: ['whatever']}]));


//outputs ==> 
 
// [
//   {foo: 1, BAR: 2, z: true},
//   {foo: 3, BAR: 13, z: false},
//   {foo: 70, BAR: 77, z: null}
// ]

exports.twitter = {

	search : function(tweets){
		var ret = {}
		ret.tweets = select(tweets, ['statuses', true, {
			created_at: true,
			text: true,
			user: 'user.*.screen_name'
		}]);

		ret.metadata = {
			next_results : tweets.search_metadata.next_results,
			query  : tweets.search_metadata.query,
			count : tweets.search_metadata.count
		};

		return ret;

			/*{ 
				created_at : true,
				text : true, 
				image : 'media.*.media_url',
				clickThrough : 'entities.urls.*.url'
			}, 'nextPage', 'search_metadata.*.next_rsults']*/
	},

	searchTrends : function(tweets){
		console.log('empty');
	}
}


exports.reddit = {

	search : function(response){
		console.log('empty');
	}
}