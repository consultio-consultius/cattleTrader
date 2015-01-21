'use strict';

(function() {
	// Cattlelists Controller Spec
	describe('Cattlelists Controller Tests', function() {
		// Initialize global variables
		var CattlelistsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Cattlelists controller.
			CattlelistsController = $controller('CattlelistsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Cattlelist object fetched from XHR', inject(function(Cattlelists) {
			// Create sample Cattlelist using the Cattlelists service
			var sampleCattlelist = new Cattlelists({
				name: 'New Cattlelist'
			});

			// Create a sample Cattlelists array that includes the new Cattlelist
			var sampleCattlelists = [sampleCattlelist];

			// Set GET response
			$httpBackend.expectGET('cattlelists').respond(sampleCattlelists);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.cattlelists).toEqualData(sampleCattlelists);
		}));

		it('$scope.findOne() should create an array with one Cattlelist object fetched from XHR using a cattlelistId URL parameter', inject(function(Cattlelists) {
			// Define a sample Cattlelist object
			var sampleCattlelist = new Cattlelists({
				name: 'New Cattlelist'
			});

			// Set the URL parameter
			$stateParams.cattlelistId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/cattlelists\/([0-9a-fA-F]{24})$/).respond(sampleCattlelist);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.cattlelist).toEqualData(sampleCattlelist);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Cattlelists) {
			// Create a sample Cattlelist object
			var sampleCattlelistPostData = new Cattlelists({
				name: 'New Cattlelist'
			});

			// Create a sample Cattlelist response
			var sampleCattlelistResponse = new Cattlelists({
				_id: '525cf20451979dea2c000001',
				name: 'New Cattlelist'
			});

			// Fixture mock form input values
			scope.name = 'New Cattlelist';

			// Set POST response
			$httpBackend.expectPOST('cattlelists', sampleCattlelistPostData).respond(sampleCattlelistResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Cattlelist was created
			expect($location.path()).toBe('/cattlelists/' + sampleCattlelistResponse._id);
		}));

		it('$scope.update() should update a valid Cattlelist', inject(function(Cattlelists) {
			// Define a sample Cattlelist put data
			var sampleCattlelistPutData = new Cattlelists({
				_id: '525cf20451979dea2c000001',
				name: 'New Cattlelist'
			});

			// Mock Cattlelist in scope
			scope.cattlelist = sampleCattlelistPutData;

			// Set PUT response
			$httpBackend.expectPUT(/cattlelists\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/cattlelists/' + sampleCattlelistPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid cattlelistId and remove the Cattlelist from the scope', inject(function(Cattlelists) {
			// Create new Cattlelist object
			var sampleCattlelist = new Cattlelists({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Cattlelists array and include the Cattlelist
			scope.cattlelists = [sampleCattlelist];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/cattlelists\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleCattlelist);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.cattlelists.length).toBe(0);
		}));
	});
}());