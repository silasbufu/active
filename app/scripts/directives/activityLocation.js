'use strict';

angular.module('activeApp').directive('activityLocation', function(activityLocations, EventLocationResource) {
	return {
		restrict : 'E',
		replace : true,
		link : function(scope, elem, attrs) {
			var geocoder = new google.maps.Geocoder;
			function init() {
				scope.center = activityLocations.OffsideArena.coordinates;
				scope.position = activityLocations.OffsideArena.coordinates;
				scope.locationDetails = {};
				scope.locationSaveObj = {};
				scope.showLocationDetails = true;
				scope.savePushed = false;
			}
			scope.addMarker = function(event) {
				var ll = event.latLng;
				scope.position = {
					lat : ll.lat(),
					lng : ll.lng()
				};
				getAddressFromMarker(scope.position);
			};
			scope.addLocation = function() {
				scope.showLocationDetails = false;
			};
			scope.placeChanged = function() {
				scope.place = this.getPlace();
				scope.center = scope.place.geometry.location;
				scope.position = scope.place.geometry.location;
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
			scope.saveLocation = function() {
				scope.savePushed = true;
				if (scope.eventLocationForm.$valid) {
					scope.locationSaveObj.coordinates = scope.position.lat+", "+scope.position.lng;
					EventLocationResource.save(scope.locationSaveObj, function(){
						
					});
				};
			};
			init();
		},
		templateUrl : "../views/activityLocationTemplate.html"
	};
});
