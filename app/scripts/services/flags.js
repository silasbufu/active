'use strict';

/**
 * @ngdoc service
 * @name activeApp.flags
 * @description
 * # flags
 * Constant in the activeApp.
 */
angular.module('activeApp').constant('flags', function() {
	return {
		NumericBooleanFlag : {
			YES : 1,
			NO : 0
		},
		UserAction : {
			SAVE : 1,
			EDIT_USER : 2,
			EDIT_THEME : 3,
			DELETE : 4
		},
		ActivityType : {
			FOOTBALL : 1,
			TENNIS : 2
		},
		AttendanceStatus : {
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
