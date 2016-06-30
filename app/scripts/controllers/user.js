'use strict';

/**
 * @ngdoc function
 * @name activeApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the activeApp
 */
angular.module('activeApp').controller('UserCtrl', function($scope, settings, UserResource) {

	$scope.save = function() {
		var user = {
			username : $scope.username,
			password : $scope.password,
		};
		UserResource.save(user);
	};
	
	
});
