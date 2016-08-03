'use strict';

/**
 * @ngdoc function
 * @name activeApp.controller:FootballCtrl
 * @description
 * # FootballCtrl
 * Controller of the activeApp
 */
angular.module('activeApp').controller('FootballCtrl', function($scope, dateFormats, UserResource) {

	UserResource.query({}, function(data) {
		if (data.length > 0) {
			$scope.footballMembersCount = data.length;
			$scope.footballMembers = angular.copy(data);
		}
	});

	$scope.currentDate = moment().format(dateFormats.dateFormatMoment);

	$('#calendar').fullCalendar({
		fixedWeekCount : false,
		contentHeight : "auto",
		firstDay : 1
	});

	$(document).ready(function() {
		loadCalendar();
	});





	//FOR LATER USE

	// function loadCalendar(){
	// var list = [];
	// $('#calendar').fullCalendar({
	// lang:'ro',
	// eventLimit: true,
	// views: {
	// agenda: {
	// eventLimit: 4
	// }
	// },
	// events: function(a,b,c,callback){
	//
	// $.ajax({
	// url: appPath+'/events',
	// data: {
	// startTime:a.unix(),
	// endTime:b.unix()
	// },
	// dataType: 'json',
	// success: function(data) {
	// $.each( data, function( index, value ){
	// list[index] = {title: value.contentTitle,
	// body:value.contentBody, start: moment(value.eventDate).format(),
	// end: moment(value.eventEndDate).format(),
	// eventAuthorFirstName:value.eventAuthorFirstName,
	// eventAuthorLastName:value.eventAuthorLastName};
	// });
	// callback(list);
	// }
	// });
	// },
	// eventClick: function (calEvent,jsEvent,view) {
	// $('#calModalLabel').text(calEvent.title);
	// $('#calModalBody').html(calEvent.body);
	// $('#calModalAuthor').text(' '+ calEvent.eventAuthorFirstName).append(' '+ calEvent.eventAuthorLastName);
	// $('#calModalFooter').text(' '+ calEvent.start.format('DD MMM YYYY')).append(" - ").append(calEvent.end.format('DD MMM YYYY'));
	// $('#eventModal').modal('toggle');
	// }
	// });
	// }

});
