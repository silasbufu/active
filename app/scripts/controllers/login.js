'use strict';

/**
 * @ngdoc function
 * @name activeApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the activeApp
 */
angular.module('activeApp').controller('LoginCtrl', function($rootScope, $scope, UserResource, AuthService, $location, $cookies) {

	//LOGOUT
	if ($rootScope.logoutFlag) {
		logout();
	}

	function logout() {
		AuthService.clearUser();
	}

	//END LOGOUT

	//INIT
	$scope.registration = false;
	$scope.formObj = {

	};
	function init(fromRegistration) {
		$scope.loginPushed = false;
		$scope.invalidCredentials = false;
		$scope.login = {};
		if(fromRegistration){
			$scope.login.username = $scope.user.username;
			$scope.login.password = $scope.user.password;
		}
	};
	//END INIT

	//LOGIN
	$scope.submitLogin = function() {
		$scope.loginPushed = true;
		if ($scope.formObj.loginForm.$valid) {
			UserResource.get({
				username : $scope.login.username,
				password : btoa($scope.login.password)
			}, function(res) {
				if (res.userId) {
					$scope.invalidCredentials = false;
					var user = {
						currentUser : {
							id : res.userId,
							username : res.username
						}
					};
					AuthService.setUser(angular.toJson(user));
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
		$scope.differentPasswords = false;
		$scope.savePushed = true;
		if ($scope.formObj.registrationForm.$valid) {
			if ($scope.user.password !== $scope.data.repeatPassword) {
				$scope.differentPasswords = true;
				return;
			}
			if (!$scope.validUsername) {
				return;
			};
			UserResource.save($scope.user, function() {
				$scope.changeAction(true);
			});
		};
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
