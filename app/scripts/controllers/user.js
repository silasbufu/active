'use strict';

/**
 * @ngdoc function
 * @name activeApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the activeApp
 */
angular.module('activeApp').controller('UserCtrl', function($rootScope, $scope, settings, flags, AuthService, ThemeService, UserResource, $timeout, Upload, FileValidatorService) {

	function getUser() {
		UserResource.get({
			userId : $rootScope.currentUser.id
		}, function(res) {
			$scope.user = angular.copy(res);
			//to avoid invalid user message for the original username
			$scope.initialUser = $scope.user.username;
			$scope.repeatPassword = $scope.user.password;
			if (res.avatar) {
				$scope.image = res.avatar;
			}
		});
	}

	function init() {
		$scope.customTheme = null;
		$scope.userAction = null;
		$scope.savePushed = false;
		$scope.differentPasswords = false;
		$scope.validUsername = null;
		$scope.repeatPassword = null;
		$scope.fileSizeMessage = null;
		$scope.fileUploadMessage = null;
		getUser();
	}


	$scope.saveChanges = function(customTheme) {
		$scope.differentPasswords = false;
		$scope.savePushed = true;
		if ($scope.userForm.$valid) {
			$scope.user.customTheme = flags.NumericBooleanFlag.NO;
			if ($scope.user.password !== $scope.repeatPassword) {
				$scope.differentPasswords = true;
				return;
			}
			if ($scope.validUsername == false) {
				return;
			};
			if (customTheme) {
				$scope.user.customTheme = flags.NumericBooleanFlag.YES;
			}else{
				resetThemeObj();
			}
			UserResource.save($scope.user, function() {
				if(!customTheme){
					ThemeService.clearTheme();
				}
				AuthService.updateUser($scope.user);
				$scope.differentPasswords = false;
				$scope.validUsername = null;
				$scope.userAction = flags.UserAction.EDIT_USER;
				$timeout(function() {
					$scope.userAction = null;
				}, 3000);
			});
		}
	};

	$scope.resetTheme = function() {
		resetThemeObj();
		$scope.saveChanges();
	};
	
	var resetThemeObj = function(){
		$scope.user.menuBackground = null;
		$scope.user.menuText = null;
		$scope.user.bodyBackground = null;
		$scope.user.panelBackground = null;
		$scope.user.bodyText = null;
	};

	$scope.checkExistingUsername = function(username) {
		if ($scope.initialUser !== username) {
			UserResource.get({
				username : username
			}, function(res) {
				if (res.result == 1) {
					$scope.validUsername = false;
				} else {
					$scope.validUsername = true;
				}
			});
		} else {
			//so valid username message will dissappear when reentering original username
			$scope.validUsername = null;
		}
	};

	$scope.$watch('file', function(newV) {
		if (newV) {
			$scope.uploadFile(newV);
		}
	});

	$scope.uploadFile = function(file) {
		if (file && FileValidatorService.parseFile(file) == true) {
			$scope.user.avatar = null;
			$scope.upload = Upload.upload({
				url : settings.protocol + settings.api + 'rest/avatar',
				method : 'POST',
				params : {
					user : $scope.user,
					file : file
				},
				file : file
			});
			$scope.upload.then(function(response) {
				AuthService.updateUser($scope.user);
				$scope.fileUploadMessage = 'Avatar uploaded successfully.';
				$scope.fileSizeMessage = null;
				$timeout(function() {
					$scope.fileUploadMessage = null;
				}, 3000);
				getUser();
			});
		} else {
			$scope.fileSizeMessage = 'Please select an image of less than 400kb.';
			$scope.fileUploadMessage = null;
			$timeout(function() {
				$scope.fileSizeMessage = null;
			}, 3000);
			$scope.files = {};
		}
	};

	init();

});
