'use strict';

/**
 * @ngdoc overview
 * @name activeApp
 * @description
 * # activeApp
 *
 * Main module of the application.
 */
angular.module('activeApp', ['ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'ngMap', 'ngFileUpload']).config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'views/main.html',
		controller : 'MainCtrl',
		controllerAs : 'main',
		requiresAuth : true
	}).when('/football', {
		templateUrl : 'views/football.html',
		controller : 'FootballCtrl',
		controllerAs : 'football',
		requiresAuth : true
	}).when('/tennis', {
		templateUrl : 'views/tennis.html',
		controller : 'TennisCtrl',
		controllerAs : 'tennis',
		requiresAuth : true
	}).when('/user', {
		templateUrl : 'views/user.html',
		controller : 'UserCtrl',
		controllerAs : 'user',
		requiresAuth : true
	}).when('/login', {
		templateUrl : 'views/login.html',
		controller : 'LoginCtrl',
		controllerAs : 'login'
	}).when('/unauthorized', {
		templateUrl : 'views/unauthorized.html',
		controller : 'UnauthorizedCtrl',
		controllerAs : 'unauthorized'
	}).otherwise({
		redirectTo : '/'
	});
});
angular.module('activeApp').run(function($rootScope, flags, activityLocations, AuthService, $route, $location, MenuService) {
	$rootScope.flags = flags;
	$rootScope.activityLocations = activityLocations;
	$rootScope.$on('$routeChangeStart', function(event) {
		var requiredLogin = MenuService.checkRequiredLogin($location.path());
		if (requiredLogin) {
			checkLogin();
		}
	});
	function checkLogin() {
		var loggedIn = AuthService.isLoggedIn();
		if (!loggedIn) {
			$location.path('/login');
		} else {
			$rootScope.isLoggedIn = true;
			$rootScope.currentUser = angular.copy(loggedIn.currentUser);
		}
	}

});
