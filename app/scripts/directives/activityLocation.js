'use strict';

angular.module('activeApp').directive('activityLocation', function($timeout, flags, EventLocationResource) {
	return {
		restrict : 'E',
		replace : true,
		link : function(scope, elem, attrs) {
			var geocoder = new google.maps.Geocoder;
			function init() {
				scope.locationDetails = null;
				scope.locationList = [];
				scope.locationSaveObj = {
					defaultLocation : flags.NumericBooleanFlag.NO,
					eventType : scope.activityType
				};
				scope.hideLocationDetails = false;
				scope.savePushed = false;
				if (scope.activityType == flags.ActivityType.FOOTBALL) {
					scope.markerUrl = 'images/google_marker_football.png';
				} else {
					scope.markerUrl = 'images/google_marker_tennis.png';
				}
				getLocationList();
			}

			function getLocationList() {
				EventLocationResource.query({
					eventType : scope.activityType
				}, function(data) {
					scope.locationList = angular.copy(data);
					for (var i = 0; i < scope.locationList.length; i++) {
						if (scope.locationList[i].defaultLocation) {
							scope.locationDetails = scope.locationList[i];
							scope.selectLocation();
						}
					}
				});
			};
			scope.getLocationForEvent = function(locationId) {
				for (var i = 0; i < scope.locationList.length; i++) {
					if (scope.locationList[i].locationId == locationId) {
						scope.locationDetails = scope.locationList[i];
						scope.selectLocation();
					}
				}
			};
			scope.selectLocation = function() {
				if (scope.event && scope.locationDetails) {
					scope.event.locationId = scope.locationDetails.locationId;
				}
				scope.center = scope.locationDetails.coordinates;
				scope.position = scope.locationDetails.coordinates;
				if (scope.hideLocationDetails) {
					scope.locationSaveObj = angular.copy(scope.locationDetails);
				}
			};
			scope.addLocation = function(edit) {
				scope.hideLocationDetails = true;
				if (edit) {
					scope.selectLocation();
				} else {
					scope.center = 'current-position';
					scope.locationDetails = null;
					scope.locationSaveObj = {
						defaultLocation : flags.NumericBooleanFlag.NO,
						eventType : scope.activityType
					};
				}
			};
			scope.addMarker = function(event) {
				var ll = event.latLng;
				scope.position = {
					lat : ll.lat(),
					lng : ll.lng()
				};
				getAddressFromMarker(scope.position);
			};
			scope.placeChanged = function() {
				scope.place = this.getPlace();
				scope.center = scope.place.geometry.location;
				scope.position = {
					lat : scope.place.geometry.location.lat(),
					lng : scope.place.geometry.location.lng()
				};
			};
			function getAddressFromMarker(position) {
				geocoder.geocode({
					'location' : position
				}, function(results, status) {
					if (status === google.maps.GeocoderStatus.OK) {
						if (results[1]) {
							scope.locationSaveObj.address = results[1].formatted_address;
							scope.$apply();
						}
					}
				});
			};
			scope.saveLocation = function(setAsDefault) {
				scope.savePushed = true;
				if (scope.eventLocationForm.$valid || setAsDefault) {
					if (!scope.locationSaveObj.locationId) {
						scope.locationSaveObj.coordinates = scope.position.lat + ", " + scope.position.lng;
					}
					EventLocationResource.save(scope.locationSaveObj, function() {
						scope.eventAction = flags.UserAction.SAVE;
						$timeout(function() {
							scope.eventAction = null;
						}, 3000);
						init();
					});
				}
			};
			scope.cancelAddLocation = function() {
				init();
			};
			scope.deleteLocation = function() {
				console.log(scope.activityType)
				EventLocationResource.delete({
					locationId : scope.locationSaveObj.locationId,
					eventType : scope.activityType
				}, function() {
					init();
					scope.resetEventDetails(true);
				});
			};
			scope.setAsDefault = function() {
				scope.locationSaveObj = angular.copy(scope.locationDetails);
				scope.locationSaveObj.defaultLocation = flags.NumericBooleanFlag.YES;
				scope.saveLocation(true);
			};
			init();
		},
		templateUrl : "../views/activityLocationTemplate.html"
	};
});
