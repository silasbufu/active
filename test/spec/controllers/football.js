'use strict';

describe('Controller: FootballCtrl', function () {

  // load the controller's module
  beforeEach(module('activeApp'));

  var FootballCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FootballCtrl = $controller('FootballCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FootballCtrl.awesomeThings.length).toBe(3);
  });
});
