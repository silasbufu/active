'use strict';

/**
 * @ngdoc service
 * @name activeApp.SelectActivityService
 * @description
 * # SelectActivityService
 */
angular.module('activeApp').service('SelectActivityService', function() {

	var activityType;
	
	this.setActivityType = function(value){
		activityType = value;
	};
	
	this.getActivityType = function(){
		return activityType;
	};
	
});

