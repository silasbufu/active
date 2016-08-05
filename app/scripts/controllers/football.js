'use strict';

/**
 * @ngdoc function
 * @name activeApp.controller:FootballCtrl
 * @description
 * # FootballCtrl
 * Controller of the activeApp
 */
angular.module('activeApp').controller('FootballCtrl', function($rootScope, $scope, $filter, $timeout, flags, settings, dateFormats, UserResource, TestEventAttendanceResource, TestEventResource) {

	function init() {
		$scope.userAction = null;
		$scope.currentDate = moment().format(dateFormats.dateFormatMoment);
		resetEventDetails();
	};

	function resetEventDetails(saveCallback) {
		$scope.eventList = [];
		$scope.eventDaysDiff = null;
		$scope.event = {};
		$scope.showEventDetails = false;
		getEvents(saveCallback);
	}

	//USERS FOR EVENT
	function getUsersForEvent(eventId) {
		$scope.footballMembersCount = 0;
		$scope.footballMembers = [];
		UserResource.query({
			eventId : eventId
		}, function(data) {
			angular.forEach(data, function(item, key) {
				console.log(item[0])
				$scope.footballMembersCount = data.length;
				$scope.footballMembers.push(item);
			});
		});
	};
	//END USERS FOR EVENT

	//ATTENDANCE STATUS
	$scope.changeAttendanceStatus = function(attendanceStatus) {
		if ($scope.event) {
			var testEventAttendance = {
				userId : $rootScope.currentUser.id,
				eventId : $scope.event.eventId,
				userAttendanceStatus : attendanceStatus
			};
			TestEventAttendanceResource.save(testEventAttendance, function() {
				getUsersForEvent($scope.event.eventId);
			});
		}
	};
	//END ATTENDANCE STATUS

	//EVENTS
	function getEvents(saveCallback) {
		TestEventResource.query({
			eventType : flags.ActivityType.FOOTBALL
		}, function(data) {
			var existsActiveEvent = false;
			angular.forEach(data, function(item, key) {
				$scope.eventList[key] = {
					title : 'Event',
					start : moment.utc(item.eventDate, dateFormats.dateFormatMoment).toDate(),
					id : item.eventId,
					status : item.eventStatus
				};
				if (!existsActiveEvent && item.eventStatus == flags.EventStatus.ACTIVE) {
					fillSelectedEvent($scope.eventList[key]);
					getUsersForEvent($scope.eventList[key].id);
					existsActiveEvent = true;
				}
			});
			if (!saveCallback) {
				loadCalendar();
			}
			$('#calendar').fullCalendar('removeEvents');
			$('#calendar').fullCalendar('addEventSource', $scope.eventList);
			$('#calendar').fullCalendar('rerenderEvents');
		});
	}

	function loadCalendar() {
		$('#calendar').fullCalendar({
			fixedWeekCount : false,
			contentHeight : "auto",
			firstDay : 1,
			lang : 'en',
			eventLimit : true,
			displayEventTime : false,
			views : {
				agenda : {
					eventLimit : 4
				}
			},
			events : $scope.eventList,
			eventClick : function(calEvent, jsEvent, view) {
				selectEvent(calEvent);
			},
			dayClick : function(date, jsEvent, view) {
				var events = $('#calendar').fullCalendar('clientEvents');
				if (hasEvent(date, events)) {
					// selectEvent()
				} else {
					newEvent(date);
				}
			}
		});
	}

	function hasEvent(date, events) {
		for (var i = 0; i < events.length; i++) {
			if (moment(date).isSame(moment(events[i].start))) {
				return true;
			} else if (i == events.length - 1) {
				return false;
			}
		}
	}

	function selectEvent(event) {
		fillSelectedEvent(event);
		getUsersForEvent(event.id);
		$scope.showEventDetails = true;
		$scope.$digest();
	}

	function fillSelectedEvent(event) {
		$scope.event = {
			eventType : flags.ActivityType.FOOTBALL,
			eventDate : moment(event.start).format(dateFormats.dateFormatMoment),
			eventStatus : event.status,
			eventId : event.id
		};
	}

	function newEvent(date) {
		$scope.eventDaysDiff = (date).diff(moment(), 'days');
		if ($scope.eventDaysDiff < 0) {
			$scope.showEventDetails = false;
		} else {
			$scope.event = {
				eventType : flags.ActivityType.FOOTBALL,
				eventDate : moment(date).format(dateFormats.dateFormatMoment),
				eventStatus : flags.EventStatus.ACTIVE
			};
			$scope.showEventDetails = true;
		}
		$scope.$digest();
	}


	$scope.saveEvent = function() {
		TestEventResource.save($scope.event, function() {
			resetEventDetails(true);
			$scope.userAction = flags.UserAction.SAVE;
			$timeout(function() {
				$scope.userAction = null;
			}, 3000);
		});
	};

	$scope.cancelAddEvent = function() {
		resetEventDetails();
	};

	$scope.deleteEvent = function() {
		TestEventResource.delete({
			eventId : $scope.event.eventId
		}, function() {
			resetEventDetails(true);
			$scope.userAction = flags.UserAction.DELETE;
			$timeout(function() {
				$scope.userAction = null;
			}, 3000);
		});
	};
	//END EVENTS

	init();

});
