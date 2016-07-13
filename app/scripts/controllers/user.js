'use strict';

/**
 * @ngdoc function
 * @name activeApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the activeApp
 */
angular.module('activeApp').controller('UserCtrl', function($rootScope, $scope, settings, UserResource, $timeout, Upload, FileValidatorService) {

	function getUser() {
		UserResource.get({
			userId : $rootScope.currentUser.id
		}, function(res) {
			$scope.user = angular.copy(res);
			//to avoid invalid user message for the original username
			$scope.initialUser = $scope.user.username;
			$scope.repeatPassword = $scope.user.password;
		});
	}

	function init() {
		$scope.saveSuccessfull = false;
		$scope.savePushed = false;
		$scope.differentPasswords = false;
		$scope.validUsername = null;
		$scope.repeatPassword = null;
		$scope.fileSizeMessage = null;
		$scope.fileUploadMessage = null;
		getUser();
	}


	$scope.saveChanges = function() {
		$scope.differentPasswords = false;
		$scope.savePushed = true;
		if ($scope.userForm.$valid) {
			if ($scope.user.password !== $scope.repeatPassword) {
				$scope.differentPasswords = true;
				return;
			}
			if ($scope.validUsername == false) {
				return;
			};
			UserResource.save($scope.user, function() {
				$scope.saveSuccessfull = true;
				$timeout(function() {
					$scope.saveSuccessfull = false;
				}, 3000);
			});
		}
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
		if(newV){
			$scope.uploadFile(newV);	
		}
	});

	$scope.uploadFile = function(file) {
		if (file && FileValidatorService.parseFile(file) == true) {
			$scope.upload = Upload.upload({
				url : settings.protocol + settings.api + 'rest/avatar',
				method : 'POST',
				params : {
					userId : $rootScope.currentUser.id,
					file : file
				},
				file : file
			});
			$scope.upload.then(function(response) {
				$scope.fileUploadMessage = 'Avatar uploaded successfully.';
				$scope.fileSizeMessage = null;
				$timeout(function() {
					$scope.fileUploadMessage = null;
				}, 3000);
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
