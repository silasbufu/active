'use strict';

describe('Controller: TennisCtrl', function () {

  // load the controller's module
  beforeEach(module('activeApp'));

  var TennisCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TennisCtrl = $controller('TennisCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TennisCtrl.awesomeThings.length).toBe(3);
  });
});
