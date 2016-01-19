'use strict';

function VenueEditController($location, VenueFactory, venue) {
  var vm = this;
  vm.id = venue.id;
  vm.name = venue.name;
  vm.venue_status = venue.venue_status;

  vm.save = function() {
    console.log("saving id=", vm.id, 'name=', vm.name, 'status=', vm.venue_status);
    VenueFactory.patch({venue: {name: vm.name, venue_status: vm.venue_status}}, vm.id).then(function (v) {
      $location.path('/venues');
    });
  }
}

VenueEditController.$inject = ['$location', 'VenueFactory', 'venue'];
angular.module('MainController').controller('VenueEditController', VenueEditController);
