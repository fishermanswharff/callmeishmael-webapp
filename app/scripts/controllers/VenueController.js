'use strict';
angular.module('MainController').controller('VenueController',venueController);
venueController.$inject = ['trace','$routeParams','VenueFactory'];
function venueController(trace,$routeParams,VenueFactory){
  var vm = this;
  vm.venue = {};

  var getVenue = function(venueId){
    VenueFactory.fetchOne(venueId).then(function(response){
      angular.copy(response,vm.venue);
      trace(vm.venue);
    })
  };
  getVenue($routeParams.venueId);
};