'use strict';

//Cattlelists service used to communicate Cattlelists REST endpoints
angular.module('cattlelists').factory('Cattlelists', ['$resource',
	function($resource) {
		return $resource('cattlelists/:cattlelistId', { cattlelistId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);