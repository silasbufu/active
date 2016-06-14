'use strict';

/**
 * @ngdoc overview
 * @name activeApp
 * @description
 * # activeApp
 *
 * Main module of the application.
 */
angular.module('activeApp', ['ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch']).config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'views/main.html',
		controller : 'MainCtrl',
		controllerAs : 'main'
	}).when('/about', {
		templateUrl : 'views/about.html',
		controller : 'AboutCtrl',
		controllerAs : 'about'
	}).when('/football', {
		templateUrl : 'views/football.html',
		controller : 'FootballCtrl',
		controllerAs : 'football'
	}).when('/tennis', {
		templateUrl : 'views/tennis.html',
		controller : 'TennisCtrl',
		controllerAs : 'tennis'
	}).otherwise({
		redirectTo : '/'
	});
});
angular.module('activeApp').run(function runApp($rootScope, flags) {
	$rootScope.flags = flags;
});

