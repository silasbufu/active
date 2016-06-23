'use strict';

/**
 * @ngdoc function
 * @name activeApp.controller:FootballCtrl
 * @description
 * # FootballCtrl
 * Controller of the activeApp
 */
angular.module('activeApp')
  .controller('FootballCtrl', function ($scope) {
    
    $scope.footballMembers = [
    	{
    		id : 1,
    		name : 'Iuri Calaras',
    		role : 'Player',
    		status : Math.floor((Math.random() * ((3 - 1) + 1) + 1))
    	},
    	{
    		id : 2,
    		name : 'Dargos Munteanu',
    		role : 'Player',
    		status : Math.floor((Math.random() * ((3 - 1) + 1) + 1))
    	},
    	{
    		id : 3,
    		name : 'Stefan Busnita',
    		role : 'Captain',
    		status : Math.floor((Math.random() * ((3 - 1) + 1) + 1))
    	},
    	{
    		id : 4,
    		name : 'Lorena Ciobanu',
    		role : 'Goalkeeper',
    		status : Math.floor((Math.random() * ((3 - 1) + 1) + 1))
    	},
    	{
    		id : 5,
    		name : 'Lucian Gusa',
    		role : 'Killer',
    		status : Math.floor((Math.random() * ((3 - 1) + 1) + 1))
    	}
    ];
    
    $scope.footballMembersCount = 5;
    
    
  });
