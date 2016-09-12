'use strict';

/**
 * @ngdoc function
 * @name activeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the activeApp
 */
angular.module('activeApp').controller('MainCtrl', function($scope, $filter, $location, $cookies, SelectActivityService) {

	function init() {
		$scope.selectedActivity = null;
	}


	$scope.selectActivity = function(activity) {
		// SelectActivityService.setActivityType(activity);
		$cookies.put('activityType', activity);
		$location.path('/activity');
	};
});
