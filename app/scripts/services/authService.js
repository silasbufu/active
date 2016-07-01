'use strict';

/**
 * @ngdoc service
 * @name activeApp.authService
 * @description
 * # authService
 * Service in the activeApp.
 */
angular.module('activeApp').service('AuthService', function($rootScope, $cookies) {

	var user;

	this.setUser = function(value){
		user = value;
		$cookies.put('user', value);
	};
	
	this.clearUser = function(){
		user = {};
		$cookies.remove('user');
		$rootScope.isLoggedIn = false;
		$rootScope.logoutFlag = false;
		$rootScope.currentUser = {};
	};
	
	this.isLoggedIn = function(){
		if($cookies.get('user')){
			return angular.fromJson($cookies.getObject('user'));
		}else{
			return false;
		}
	};

});
