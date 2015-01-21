'use strict';

//Setting up route
angular.module('cattlelists').config(['$stateProvider',
	function($stateProvider) {
		// Cattlelists state routing
		$stateProvider.
		state('listCattlelists', {
			url: '/cattlelists',
			templateUrl: 'modules/cattlelists/views/list-cattlelists.client.view.html'
		}).
		state('createCattlelist', {
			url: '/cattlelists/create',
			templateUrl: 'modules/cattlelists/views/create-cattlelist.client.view.html'
		}).
		state('viewCattlelist', {
			url: '/cattlelists/:cattlelistId',
			templateUrl: 'modules/cattlelists/views/view-cattlelist.client.view.html'
		}).
		state('editCattlelist', {
			url: '/cattlelists/:cattlelistId/edit',
			templateUrl: 'modules/cattlelists/views/edit-cattlelist.client.view.html'
		});
	}
]);