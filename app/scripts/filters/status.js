'use strict';

/**
 * @ngdoc filter
 * @name activeApp.filter:status
 * @function
 * @description
 * # status
 * Filter in the activeApp.
 */
angular.module('activeApp').filter('staticOptions', function(flags) {

	var labels = {
		ActivityType : {
			1 : '/football',
			2 : '/tennis'
		}		
	};
	
	return function(input, flag) {
		if (labels[flag].hasOwnProperty(input)) {
			return labels[flag][input];
		} else {
			return '-';
		}
	};

});

