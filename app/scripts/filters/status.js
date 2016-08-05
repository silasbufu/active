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
		ActivityTypeLink : {
			1 : '/football',
			2 : '/tennis'
		},
		ActivityType : {
			1 : 'Football',
			2 : 'Tennis'
		},
		EventStatus : {
			0 : 'Inactive',
			1 : 'Active'
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

