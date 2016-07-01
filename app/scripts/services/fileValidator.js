'use strict';

/**
 * @ngdoc service
 * @name activeApp.fileValidator
 * @description
 * # dateFormats
 * Constant in the activeApp.
 */
angular.module('activeApp').service('FileValidatorService', function() {

	var defaultSize = 40000;
	var jpgExtension = 'jpg';
	var pngExtension = 'png';

	this.parseFile = function(file, size, extension) {
		var response = true;
		var fileSize = defaultSize;
		if (size != null) {
			fileSize = size;
		}
		if (extension != null) {
			fileExtension = extension;
		}
		var parsedStringArray = file.name.split('.');
		var parsedExtension = parsedStringArray[parsedStringArray.length - 1];
		if ((parsedExtension !== jpgExtension && parsedExtension !== jpgExtension) || file.size >= fileSize) {
			response = false;

		}
		return response;
	};

});

