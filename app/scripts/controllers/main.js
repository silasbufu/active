'use strict';

/**
 * @ngdoc function
 * @name activeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the activeApp
 */
angular.module('activeApp').controller('MainCtrl', function($scope, $filter, $location) {

	function init() {
		$scope.selectedActivity = null;
	}
	
	$scope.selectActivity = function(activity){
		var link = $filter('staticOptions')(activity, 'ActivityType');
		$location.path(link);
	};
});
