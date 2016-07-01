'use strict';

/**
 * @ngdoc service
 * @name activeApp.menuService
 * @description
 * # menuService
 * Service in the activeApp.
 */
angular.module('activeApp').service('MenuService', function($route) {

	var route;

	this.checkRequiredLogin = function(location) {
		for (var key in $route.routes) {
			if ($route.routes[key].originalPath === location) {
				route = $route.routes[key];
				break;
			}
		}
		return route.requiresAuth;
	};
});
