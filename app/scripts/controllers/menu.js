'use strict';

/**
 * @ngdoc function
 * @name activeApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the activeApp
 */
angular.module('activeApp').controller('MenuCtrl', function($rootScope, $scope, settings, AuthService) {

	$scope.openChat = function() {
		window.open(settings.chatUrl + '/' + $rootScope.currentUser.username, '_blank');
	};

	$scope.logout = function() {
		AuthService.clearUser();
	};

});
