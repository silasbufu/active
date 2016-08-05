angular.module('activeApp')
  .service('TestEventResource', function TestEventResource(settings,$resource) {
        var testEventResource = $resource(settings.protocol+settings.api+'rest/test-event',{},{});
        return testEventResource;
  });