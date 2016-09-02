angular.module('activeApp')
  .service('EventResource', function EventResource(settings,$resource) {
        var eventResource = $resource(settings.protocol+settings.api+'rest/event',{},{});
        return eventResource;
  });