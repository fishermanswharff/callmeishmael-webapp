'use strict';
angular.module('MainController').controller('VenueController',venueController);
venueController.$inject = ['trace','$rootScope','$routeParams','AuthFactory','VenueFactory','PhoneFactory'];
function venueController(trace,$rootScope,$routeParams,AuthFactory,VenueFactory,PhoneFactory){
  var vm = this;
  vm.venue = {};
  vm.userVenues = AuthFactory.currentUser().venues;
  vm.venuePhones = [];

  var getUserVenues = function(){
    AuthFactory.currentUser();
  };

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

  if($routeParams.venueId){
    getVenue($routeParams.venueId);
  } else {
    getUserVenues();
  }
};