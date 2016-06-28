'use strict';

/**
 * @ngdoc function
 * @name activeApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the activeApp
 */
angular.module('activeApp').controller('UserCtrl', function($scope, TestResource) {

	$scope.entity = {};
	
	$scope.save = TestResource.save($scope.entity);

});
