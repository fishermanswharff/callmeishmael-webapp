'use strict';
angular.module('MainController').controller('VenueController',venueController);
venueController.$inject = ['trace','$rootScope','$location','$routeParams','AuthFactory','VenueFactory','PhoneFactory','StoryFactory'];
function venueController(trace,$rootScope,$location,$routeParams,AuthFactory,VenueFactory,PhoneFactory,StoryFactory){
  var vm = this;
  vm.venue = {};
  vm.userVenues = AuthFactory.currentUser().venues;
  vm.venuePhones = [];
  vm.stories = [];
  vm.buttonAssignments = ['1','2','3','4','5','6','7','8','9'];

  var getVenue = function(venueId){
    VenueFactory.fetchOne(venueId).then(function(response){
      angular.copy(response,vm.venue);
      getPhones(vm.venue.id);
    });
  };

  var getPhones = function(id){
    PhoneFactory.fetch(id).then(function(response){
      angular.copy(response,vm.venuePhones);
    });
  };

  var getStories = function(){
    StoryFactory.fetch().then(function(response){
      angular.copy(response,vm.stories);
    });
  };

  vm.isActive = function(params){
    return $location.path() === params;
  };

  vm.submit = function(object){
    for(var item in object){
      switch(item){
        case 'button':
          trace(object);
          break;
        default:
          break;
      }
    }
  };

  if($routeParams.venueId){
    getVenue($routeParams.venueId);
  } else {
    getVenue(vm.userVenues[0].id)
  };

  getStories();

};