angular.module('activeApp')
  .service('UserResource', function UserResource(settings,$resource) {
        var userResource = $resource(settings.protocol+settings.api+'rest/user',{},{});
        return userResource;
  });