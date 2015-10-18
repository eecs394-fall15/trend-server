var jp = require('JSONPath');



var ex = {
  "store": {
    "book": [
      {
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      },
      {
        "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99
      },
      {
        "category": "fiction",
        "author": "Herman Melville",
        "title": "Moby Dick",
        "isbn": "0-553-21311-3",
        "price": 8.99
      },
      {
        "category": "fiction",
        "author": "J. R. R. Tolkien",
        "title": "The Lord of the Rings",
        "isbn": "0-395-19395-8",
        "price": 22.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95
    }
  }
};

var jpexample = function(path){
	console.log(jp.eval(ex, path));
}

var normalizers = {
	twitter : function(tweets){
	
	}
};


function extract(src, keyname, path, subpaths){
	var ret = {};
	//gets array of top level objects to grab from
	var top = jp.eval(src, path);

	//if just a regular jp query
	if (!subpaths) {
    if (keyname)
  		ret[keyname] = top;
    else
      ret = top;

		return ret;
	}

	//keys to grab for each top sections
	var keys = Object.keys(subpaths);
	var retContainer = [];

	//iterates through each top section  
	top.forEach(function(section){
    //if section isn't an object, then it should be touched
    if (typeof section !== 'object' && typeof section !== 'array') {
			return undefined;
		}

		var newSection = {};
		keys.forEach(function(pathKey) {
			if (typeof subpaths === 'object'){
				newSection = extract(section, pathKey, )
			}

			//adds key --> section[path] to newSection
			newSection[pathKey] = jp.eval(section, subpaths[pathKey]);
		});

		retContiner.push(newSection);
	})

	return ret;
}


jpexample('$.store.book[*].author');
jpexample('$..author');
jpexample('$.store.*');