'use strict';

/**
 * @ngdoc service
 * @name activeApp.themeService
 * @description
 * # themeService
 * Service in the activeApp.
 */
angular.module('activeApp').service('ThemeService', function() {

	var sheet;

	function getCustomThemeStylesheet() {
		for (var i = 0; i < document.styleSheets.length; i++) {
			if (document.styleSheets[i].href && document.styleSheets[i].href.includes("customTheme.css")) {
				sheet = document.styleSheets[i];
			}
		}
	}

	this.updateTheme = function(user) {
		this.clearTheme();
		user.menuBackground ? sheet.insertRule('.navbar-custom { background-color:' + user.menuBackground + ' !important}', 0) : null;
		user.menuText ? sheet.insertRule('.navbar a { color:' + user.menuText + ' !important}', 0) : null;
		user.bodyBackground ? sheet.insertRule('body { background-color:' + user.bodyBackground + ' !important}', 0) : null;
		user.bodyText ? sheet.insertRule('body { color:' + user.bodyText + ' !important}', 0) : null;
		user.bodyText ? sheet.insertRule('.panel a { color:' + user.bodyText + ' !important}', 0) : null;
		user.panelBackground ? sheet.insertRule('.panel { background-color:' + user.panelBackground + ' !important}', 0) : null;
	};

	this.clearTheme = function() {
		getCustomThemeStylesheet();
		for(var i = sheet.cssRules.length-1;i>=0;i--){
			sheet.deleteRule(i);
		}
	};

});

