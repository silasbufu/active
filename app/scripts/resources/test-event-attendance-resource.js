angular.module('activeApp')
  .service('TestEventAttendanceResource', function TestEventAttendanceResource(settings,$resource) {
        var testEventAttendanceResource = $resource(settings.protocol+settings.api+'rest/test-event-attendance',{},{});
        return testEventAttendanceResource;
  });