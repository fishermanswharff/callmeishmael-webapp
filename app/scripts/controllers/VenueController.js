'use strict';
angular.module('MainController').controller('VenueController',venueController);
venueController.$inject = ['trace','$rootScope','$routeParams','VenueFactory','PhoneFactory'];
function venueController(trace,$rootScope,$routeParams,VenueFactory,PhoneFactory){
  var vm = this;
  vm.venue = {};
  vm.userVenues = AuthFactory.currentUser();
  vm.venuePhones = [];

  trace(vm.userVenues);

  var getVenue = function(venueId){
    VenueFactory.fetchOne(venueId).then(function(response){
      angular.copy(response,vm.venue);
      // trace(vm.venue);
      getPhones(vm.venue.id);
    });
  };

  var getPhones = function(id){
    PhoneFactory.fetch(id).then(function(response){
      angular.copy(response,vm.venuePhones);
      trace(vm.venuePhones);
    });
  };

  getVenue($routeParams.venueId);
};