'use strict';

/**
 * @ngdoc function
 * @name activeApp.controller:FootballCtrl
 * @description
 * # FootballCtrl
 * Controller of the activeApp
 */
angular.module('activeApp').controller('FootballCtrl', function($scope, dateFormats) {

	$scope.footballMembers = [{
		id : 1,
		name : 'Iuri Calaras',
		role : 'Player',
		status : Math.floor((Math.random() * ((3 - 0) + 1) + 0))
	}, {
		id : 2,
		name : 'Dargos Munteanu',
		role : 'Player',
		status : Math.floor((Math.random() * ((3 - 0) + 1) + 0))
	}, {
		id : 3,
		name : 'Stefan Busnita',
		role : 'Captain',
		status : Math.floor((Math.random() * ((3 - 0) + 1) + 0))
	}, {
		id : 4,
		name : 'Lorena Ciobanu',
		role : 'Goalkeeper',
		status : Math.floor((Math.random() * ((3 - 0) + 1) + 0))
	}, {
		id : 5,
		name : 'Lucian Gusa',
		role : 'Killer',
		status : Math.floor((Math.random() * ((3 - 0) + 1) + 0))
	}, {
		id : 5,
		name : 'Cristi Chelaru',
		role : 'EPO Legal Provider',
		status : Math.floor((Math.random() * ((3 - 0) + 1) + 0))
	}];

	$scope.footballMembersCount = 5;

	$scope.currentDate = moment().format(dateFormats.dateFormatMoment);

	$('#calendar').fullCalendar({
        fixedWeekCount : false,
        contentHeight : "auto",
        firstDay : 1
   });

});
