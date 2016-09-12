'use strict';

/**
 * @ngdoc function
 * @name activeApp.controller:ActivityCtrl
 * @description
 * # ActivityCtrl
 * Controller of the activeApp
 */
angular.module('activeApp').controller('ActivityCtrl', function($rootScope, $scope, $filter, $timeout, $cookies, flags, SelectActivityService, settings, dateFormats, UserResource, EventAttendanceResource, EventResource, GuestResource) {

  	$scope.activityType = $cookies.get('activityType');

	function init() {
		$scope.eventAction = null;
		$scope.guestAction = null;
		$scope.currentDate = moment().format(dateFormats.dateFormatMoment);
		$scope.resetEventDetails();
	};

	$scope.resetEventDetails = function(saveCallback){
		$scope.attendanceListFlag = flags.AttendanceStatus.GOING;
		$scope.eventList = [];
		$scope.eventDaysDiff = null;
		$scope.event = {};
		$scope.showEventDetails = false;
		resetGuest();
		getEvents(saveCallback);
	};

	function resetGuest() {
		$scope.guestCount = 0;
		$scope.guestMembers = [];
		$scope.guest = {};
		$scope.showGuestDetails = false;
	}

	//USERS FOR EVENT
	function resetUsers() {
		$scope.footballMembersCount = 0;
		$scope.footballMembers = [];
	}

	function getUsersForEvent(eventId) {
		resetUsers();
		UserResource.query({
			eventId : eventId
		}, function(data) {
			angular.forEach(data, function(item, key) {
				item[0].userAttendanceStatus = item[1].userAttendanceStatus;
				$scope.footballMembersCount = data.length;
				$scope.footballMembers.push(item[0]);
			});
		});
	};
	//END USERS FOR EVENT

	//GUESTS FOR EVENT
	$scope.addGuest = function() {
		if ($scope.guest.fullName) {
			var guest = {
				fullName : $scope.guest.fullName,
				role : 'Guest',
				eventId : $scope.event.eventId,
				guestId : $scope.guest.guestId
			};
			GuestResource.save(guest, function() {
				// $scope.addFlash(flags.UserAction.SAVE);
				resetGuest();
				getGuestsForEvent($scope.event.eventId);
			});
		}
	};

	function getGuestsForEvent(eventId) {
		GuestResource.query({
			eventId : eventId
		}, function(data) {
			// angular.forEach(data, function(item, key) {
			$scope.guestCount = data.length;
			$scope.guestMembers = angular.copy(data);
			// });
		});
	};

	$scope.selectGuest = function(guest) {
		$scope.guest = angular.copy(guest);
		$scope.showGuestDetails = true;
	};

	$scope.cancelEditGuest = function() {
		$scope.guest = {};
		$scope.showGuestDetails = false;
	};

	$scope.deleteGuest = function() {
		GuestResource.delete({
			guestId : $scope.guest.guestId
		}, function() {
			resetGuest();
			// $scope.addFlash(flags.UserAction.DELETE);
		});
	};
	//END GUESTS FOR EVENT

	//ATTENDANCE STATUS
	$scope.changeAttendanceStatus = function(attendanceStatus) {
		if ($scope.event) {
			var eventAttendance = {
				userId : $rootScope.currentUser.id,
				eventId : $scope.event.eventId,
				userAttendanceStatus : attendanceStatus
			};
			EventAttendanceResource.save(eventAttendance, function() {
				getUsersForEvent($scope.event.eventId);
			});
		}
	};
	//END ATTENDANCE STATUS

	//EVENTS
	function getEvents(saveCallback) {
		EventResource.query({
			eventType : $scope.activityType
		}, function(data) {
			var existsActiveEvent = false;
			angular.forEach(data, function(item, key) {
				$scope.eventList[key] = {
					title : 'Event',
					start : moment.utc(item.eventDate, dateFormats.dateFormatMoment).toDate(),
					id : item.eventId,
					status : item.eventStatus,
					locationId : item.locationId
				};
				if (!existsActiveEvent && item.eventStatus == flags.EventStatus.ACTIVE) {
					fillSelectedEvent($scope.eventList[key]);
					getUsersForEvent($scope.eventList[key].id);
					getGuestsForEvent($scope.eventList[key].id);
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
				var event = hasEvent(date, events);
				if (event) {
					selectEvent(event);
				} else {
					newEvent(date);
				}
			}
		});
	}

	function hasEvent(date, events) {
		for (var i = 0; i < events.length; i++) {
			if (moment(date).isSame(moment(events[i].start))) {
				return events[i];
			} else if (i == events.length - 1) {
				return false;
			}
		}
	}

	function selectEvent(event) {
		$scope.attendanceListFlag = flags.AttendanceStatus.GOING;
		resetGuest();
		fillSelectedEvent(event);
		getUsersForEvent(event.id);
		getGuestsForEvent(event.id);
		$scope.getLocationForEvent(event.locationId);
		$scope.showEventDetails = true;
		$scope.$digest();
	}

	function fillSelectedEvent(event) {
		$scope.event = {
			eventType : $scope.activityType,
			eventDate : moment(event.start).format(dateFormats.dateFormatMoment),
			eventStatus : event.status,
			eventId : event.id,
			locationId : event.locationId
		};
	}

	function newEvent(date) {
		$scope.eventDaysDiff = (date).diff(moment(), 'days');
		if ($scope.eventDaysDiff < 0) {
			$scope.showEventDetails = false;
			resetGuest();
			resetUsers();
			$scope.event = {};
		} else {
			resetGuest();
			resetUsers();
			$scope.event = {
				eventType : $scope.activityType,
				eventDate : moment(date).format(dateFormats.dateFormatMoment),
				eventStatus : flags.EventStatus.ACTIVE,
				locationId : $scope.locationDetails.locationId
			};
			$scope.showEventDetails = true;
		}
		$scope.$digest();
	}


	$scope.saveEvent = function() {
		if ($scope.event.locationId) {
			EventResource.save($scope.event, function() {
				$scope.resetEventDetails(true);
				// $scope.addFlash(flags.UserAction.SAVE);
			});
		}else{
			//TODO FLASH			
		}
	};

	$scope.cancelAddEvent = function() {
		$scope.resetEventDetails();
	};

	$scope.deleteEvent = function() {
		EventResource.delete({
			eventId : $scope.event.eventId
		}, function() {
			$scope.resetEventDetails(true);
		});
	};
	//END EVENTS

	init();

});
