'use strict';

/**
 * @ngdoc function
 * @name activeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the activeApp
 */
angular.module('activeApp').controller('MainCtrl', function($scope, TestResource) {

	function init() {
		$scope.selectedActivity = null;
	}

	TestResource.get({}, function(data) {
		console.log('test');
	});
});
