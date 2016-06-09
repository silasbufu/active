angular.module('activeApp')
  .service('TestResource', function TestResource(settings,$resource) {
        var testResource = $resource(settings.protocol+settings.api+'rest/test',{},{});
        return testResource;
  });