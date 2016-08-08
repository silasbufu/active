angular.module('activeApp')
  .service('GuestResource', function GuestResource(settings,$resource) {
        var guestResource = $resource(settings.protocol+settings.api+'rest/guest',{},{});
        return guestResource;
  });