'use strict';

// Cattlelists controller
angular.module('cattlelists').controller('CattlelistsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Cattlelists',
	function($scope, $stateParams, $location, Authentication, Cattlelists ) {
		$scope.authentication = Authentication;

		// Create new Cattlelist
		$scope.create = function() {
			// Create new Cattlelist object
			var cattlelist = new Cattlelists ({
				name: this.name
			});

			// Redirect after save
			cattlelist.$save(function(response) {
				$location.path('cattlelists/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Cattlelist
		$scope.remove = function( cattlelist ) {
			if ( cattlelist ) { cattlelist.$remove();

				for (var i in $scope.cattlelists ) {
					if ($scope.cattlelists [i] === cattlelist ) {
						$scope.cattlelists.splice(i, 1);
					}
				}
			} else {
				$scope.cattlelist.$remove(function() {
					$location.path('cattlelists');
				});
			}
		};

		// Update existing Cattlelist
		$scope.update = function() {
			var cattlelist = $scope.cattlelist ;

			cattlelist.$update(function() {
				$location.path('cattlelists/' + cattlelist._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Cattlelists
		$scope.find = function() {
			$scope.cattlelists = Cattlelists.query();
		};

		// Find existing Cattlelist
		$scope.findOne = function() {
			$scope.cattlelist = Cattlelists.get({ 
				cattlelistId: $stateParams.cattlelistId
			});
		};
	}
]);