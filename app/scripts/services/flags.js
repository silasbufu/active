'use strict';

/**
 * @ngdoc service
 * @name activeApp.flags
 * @description
 * # flags
 * Constant in the activeApp.
 */
angular.module('activeApp').constant('flags', function() {
	var NumericBooleanFlag = {
		YES : 1,
		NO : 0
	};
	return {
		ActivityType : {
			FOOTBALL : 1,
			TENNIS : 2
		},
		AttendingStatus:{
			GOING : 1,
			PENDING : 2,
			NOT_GOING : 3
		} 
	};
}());
