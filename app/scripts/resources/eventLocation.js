angular.module('activeApp')
  .service('EventLocationResource', function EventLocationResource(settings,$resource) {
        var eventLocationResource = $resource(settings.protocol+settings.api+'rest/event-location',{},{});
        return eventLocationResource;
  });