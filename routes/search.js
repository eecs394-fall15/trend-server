var express = require('express');
var async = require('async');
var lib = require('./lib');
var router = express.Router;

var SITES = ['reddit', 'twitter', 'nyt', 'facebook', 'ninegag'];

router.use("/:sites/:search", function(req, res, next){
	var sites = req.params.sites;
	var search = req.params.search;

	var complete = {};
	var tasks = {}

	sites.forEach(function(rawSite){
		var site = site.toLowerCase()
		if(var index = SITES.indexOf(site) !== -1)
			complete[site] = null;
			taks[site] = wrapCall(lib[site].search, req, res, next);
	});
	



});


function wrapCall(handler, req, res, next){
	return function(callback) {
		handler(req, res, )
	}
};