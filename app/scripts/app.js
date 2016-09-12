'use strict';

/**
 * @ngdoc overview
 * @name activeApp
 * @description
 * # activeApp
 *
 * Main module of the application.
 */
angular.module('activeApp', ['ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'ngMap', 'ngFileUpload', 'colorpicker.module']).config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'views/main.html',
		controller : 'MainCtrl',
		controllerAs : 'main',
		requiresAuth : true
	}).when('/activity', {
		templateUrl : 'views/activity.html',
		controller : 'ActivityCtrl',
		controllerAs : 'activity',
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
angular.module('activeApp').run(function($rootScope, flags, AuthService, $route, $location, MenuService, ThemeService) {
	// if (document.images){
	// (new Image()).src = "images/bale.png";
	// (new Image()).src = "images/robben.png";
	// (new Image()).src = "images/zlatan.png";
	// (new Image()).src = "images/ronaldo.png";
	// (new Image()).src = "images/neymar.png";
	// (new Image()).src = "images/pogba.png";
	// (new Image()).src = "images/federer.png";
	// (new Image()).src = "images/serena.png";
	// (new Image()).src = "images/nadal.png";
	// (new Image()).src = "images/djokolife.png";
	// (new Image()).src = "images/halep.png";
	// (new Image()).src = "images/murray.png";
	// (new Image()).src = "images/football-field.png";
	// (new Image()).src = "images/tennis-court-2.png";
	// }
	$rootScope.flags = flags;
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
			ThemeService.updateTheme($rootScope.currentUser);
		}
	}

	(function($, viewport) {
		$(document).ready(function() {
			if (viewport.is('xs')) {
				$rootScope.xsMenu = true;
			}
			if (viewport.is('sm')) {
				$rootScope.smallScreen = true;
			}
			if (viewport.is('md')) {
				$rootScope.smallScreen = true;
			}
			// Execute code each time window size changes
			$(window).resize(viewport.changed(function() {
				if (viewport.is('<md') && viewport.is('>xs')) {
					$rootScope.xsMenu = false;
					$rootScope.smallScreen = true;
					$rootScope.$apply();
				} else if(viewport.is('xs')){
					$rootScope.xsMenu = true;
					$rootScope.smallScreen = true;
					$rootScope.$apply();
				}else{
					$rootScope.xsMenu = false;
					$rootScope.smallScreen = false;
					$rootScope.$apply();
				}
			}));
		});
	})(jQuery, ResponsiveBootstrapToolkit);
});
