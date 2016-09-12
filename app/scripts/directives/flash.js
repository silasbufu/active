'use strict';

angular.module('activeApp').directive('flash', function($timeout) {
	return {
		restrict : 'A',
		link : function(scope, elem, attrs) {
			scope.addFlash = function(action) {
				console.log(elem);
				// var flash = angular.element('<p class="text-success">SAVED</p>');
				// flash.insertBefore(elem);
				// $timeout(function() {
					// flash.remove();
				// }, 3000);
			};
		}
	};
});
