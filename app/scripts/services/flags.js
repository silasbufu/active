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
		UserAction : {
			SAVE : 1,
			EDIT : 2,
			DELETE : 3
		},
		ActivityType : {
			FOOTBALL : 1,
			TENNIS : 2
		},
		AttendanceStatus:{
			GOING : 1,
			MAYBE : 2,
			NOT_GOING : 3
		},
		EventStatus : {
			INACTIVE : 0,
			ACTIVE : 1
		} 
	};
}());
