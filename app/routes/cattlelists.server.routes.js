'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var cattlelists = require('../../app/controllers/cattlelists');

	// Cattlelists Routes
	app.route('/cattlelists')
		.get(cattlelists.list)
		.post(users.requiresLogin, cattlelists.create);

	app.route('/cattlelists/:cattlelistId')
		.get(cattlelists.read)
		.put(users.requiresLogin, cattlelists.hasAuthorization, cattlelists.update)
		.delete(users.requiresLogin, cattlelists.hasAuthorization, cattlelists.delete);

	// Finish by binding the Cattlelist middleware
	app.param('cattlelistId', cattlelists.cattlelistByID);
};