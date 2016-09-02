angular.module('activeApp')
  .service('EventAttendanceResource', function EventAttendanceResource(settings,$resource) {
        var eventAttendanceResource = $resource(settings.protocol+settings.api+'rest/event-attendance',{},{});
        return eventAttendanceResource;
  });