'use strict';

/**
 * @ngdoc service
 * @name ecard2App.settings
 * @description
 * # settings
 * Constant in the ecard2App.
 */
angular.module('activeApp')
  .constant('settings', {
		api:'192.168.2.124:8080/active-bck/',
        protocol:'http://',
        chatUrl : 'http://192.168.2.181:3000/active' 
    });
