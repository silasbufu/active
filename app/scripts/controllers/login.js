'use strict';

/**
 * @ngdoc function
 * @name activeApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the activeApp
 */
angular.module('activeApp').controller('LoginCtrl', function($timeout, $rootScope, $scope, UserResource, AuthService, $location, $cookies) {

	//END LOGOUT

	//INIT
	$scope.registration = false;
	$scope.formObj = {

	};
	function init(fromRegistration) {
		$scope.loginPushed = false;
		$scope.invalidCredentials = false;
		$scope.login = {};
		if (fromRegistration) {
			$scope.login.username = $scope.user.username;
			$scope.login.password = $scope.user.password;
			$scope.fromRegistration = true;
			$timeout(function() {
				$scope.fromRegistration = false;
			}, 3000);
		}
	};
	//END INIT

	//LOGIN
	$scope.submitLogin = function() {
		$scope.loginPushed = true;
		$scope.fromRegistration = false;
		if ($scope.formObj.loginForm.$valid) {
			UserResource.get({
				username : $scope.login.username,
				password : btoa($scope.login.password)
			}, function(res) {
				if (res.userId) {
					$scope.invalidCredentials = false;
					AuthService.setUser(res);
					$location.path('/');
				} else {
					$scope.invalidCredentials = true;
				}
			});
		}
	};

	$scope.resetLogin = function() {
		init();
	};
	//END LOGIN

	//REGISTRATION
	$scope.changeAction = function(fromRegistration) {
		$scope.registration = !$scope.registration;
		if ($scope.registration) {
			$scope.resetRegistration();
		} else {
			init(fromRegistration);
		}
	};

	$scope.resetRegistration = function() {
		$scope.user = {};
		$scope.data = {};
		$scope.savePushed = false;
		$scope.differentPasswords = false;
		$scope.validUsername = null;
		$scope.repeatPassword = null;
	};

	$scope.submitRegistration = function() {
		// $scope.differentPasswords = false;
		$scope.savePushed = true;
		if ($scope.formObj.registrationForm.$valid) {
			if (!$scope.validUsername) {
				return;
			};
			if($scope.differentPasswords){
				return;
			}
			UserResource.save($scope.user, function() {
				$scope.changeAction(true);
			});
		};
	};

	$scope.checkMatchingPasswords = function() {
		if ($scope.data.repeatPassword && $scope.user.password !== $scope.data.repeatPassword) {
			$scope.differentPasswords = true;
		}else{
			$scope.differentPasswords = false;
		}
	};

	$scope.checkExistingUsername = function(username) {
		UserResource.get({
			username : username
		}, function(res) {
			if (res.result == 1) {
				$scope.validUsername = false;
			} else {
				$scope.validUsername = true;
			}
		});
	};
	//END REGISTRATION

	init();

});
