var bcrypt = require('bcrypt-nodejs');

//mongoose requirements
var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
var ObjectId = Schema.ObjectId;



var UsersSchema = new Schema({
	//authentication info
	accounts : {
		local : {
			email : { type : String, lowercase : true, trim: true},
			password : {type : String, minlength : 8}
		},
		facebook : Object,
		google : Object,
		twitter : Object
	},
	//to be used for prototyping phase
	userid : ObjectId,
	age : { type : Number}, 
	createdOn : { type : Date, default : Date.now},
	lastLogin : { type: Date, default : Date.now},
	preferences : {
		trendPreferences : {},
		searchHistory : [], //objects of { search: term, sources : [siteNames]}
	},
	subscriptions : [] 
});



UsersSchema.set('toObject', { getters: true });
UsersSchema.set('toJSON', { getters: true });



UsersSchema.statics.findByLocal = function (email, cb) {
	return this.findOne({'local.email': email})
		.exec(cb);
}

UsersSchema.statics.findByUserId = function (userid, cb){
	return this.findOne({userid : userid})
		.exec(cb);
}

UsersSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password,bcrypt.genSaltSync(8), null);
}

UsersSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', UsersSchema);