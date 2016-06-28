'use strict';

/**
 * @ngdoc function
 * @name activeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the activeApp
 */
angular.module('activeApp').controller('MainCtrl', function($scope, $filter, $location, TestResource) {

	function init() {
		$scope.selectedActivity = null;
	}

	TestResource.query({}, function(data) {
		console.log('test');
	});
	
	$scope.selectActivity = function(activity){
		var link = $filter('staticOptions')(activity, 'ActivityType');
		$location.path(link);
	};
});
