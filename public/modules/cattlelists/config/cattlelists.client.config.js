'use strict';

// Configuring the Articles module
angular.module('cattlelists').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Cattlelists', 'cattlelists', 'dropdown', '/cattlelists(/create)?');
		Menus.addSubMenuItem('topbar', 'cattlelists', 'List Cattlelists', 'cattlelists');
		Menus.addSubMenuItem('topbar', 'cattlelists', 'New Cattlelist', 'cattlelists/create');
	}
]);