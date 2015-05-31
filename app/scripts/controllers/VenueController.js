'use strict';
angular.module('MainController').controller('VenueController',venueController);
venueController.$inject = ['trace','$rootScope','$routeParams','AuthFactory','VenueFactory','PhoneFactory','StoryFactory'];
function venueController(trace,$rootScope,$routeParams,AuthFactory,VenueFactory,PhoneFactory,StoryFactory){
  var vm = this;
  vm.venue = {};
  vm.userVenues = AuthFactory.currentUser().venues;
  vm.venuePhones = [];
  vm.stories = [];

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

  var getStories = function(){
    StoryFactory.fetch().then(function(response){
      angular.copy(response,vm.stories);
    });
  };

  if($routeParams.venueId){
    getVenue($routeParams.venueId);
  } else {
    getVenue(vm.userVenues[0].id)
    // $location.path('/venues/'+)
  }
};