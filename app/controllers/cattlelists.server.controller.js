'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Cattlelist = mongoose.model('Cattlelist'),
	_ = require('lodash');

/**
 * Create a Cattlelist
 */
exports.create = function(req, res) {
	var cattlelist = new Cattlelist(req.body);
	cattlelist.user = req.user;

	cattlelist.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(cattlelist);
		}
	});
};

/**
 * Show the current Cattlelist
 */
exports.read = function(req, res) {
	res.jsonp(req.cattlelist);
};

/**
 * Update a Cattlelist
 */
exports.update = function(req, res) {
	var cattlelist = req.cattlelist ;

	cattlelist = _.extend(cattlelist , req.body);

	cattlelist.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(cattlelist);
		}
	});
};

/**
 * Delete an Cattlelist
 */
exports.delete = function(req, res) {
	var cattlelist = req.cattlelist ;

	cattlelist.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(cattlelist);
		}
	});
};

/**
 * List of Cattlelists
 */
exports.list = function(req, res) { Cattlelist.find().sort('-created').populate('user', 'displayName').exec(function(err, cattlelists) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(cattlelists);
		}
	});
};

/**
 * Cattlelist middleware
 */
exports.cattlelistByID = function(req, res, next, id) { Cattlelist.findById(id).populate('user', 'displayName').exec(function(err, cattlelist) {
		if (err) return next(err);
		if (! cattlelist) return next(new Error('Failed to load Cattlelist ' + id));
		req.cattlelist = cattlelist ;
		next();
	});
};

/**
 * Cattlelist authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.cattlelist.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};