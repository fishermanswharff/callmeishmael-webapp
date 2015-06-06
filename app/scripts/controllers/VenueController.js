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

  vm.getVenue = function(venueId){
    VenueFactory.fetchOne(venueId).then(function(response){
      angular.copy(response,vm.venue);
      vm.getPhones(vm.venue.id);
    });
  };

  vm.getPhones = function(id){
    PhoneFactory.fetch(id).then(function(response){
      angular.copy(response,vm.venuePhones);
      // trace(vm.venuePhones);
    });
  };

  vm.getStories = function(){
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
          PhoneFactory.assignButton(object).then(function(response){
            vm.buttonToEdit = null;
            vm.getPhones(vm.venue.id);
          });
          break;
        default:
          break;
      }
    }
  };

  vm.editButton = function(key,value,phoneId){
    vm.buttonToEdit = value;
    vm.buttonToEdit.assignment = key;
    vm.buttonToEdit.phone_id = phoneId;
  };

  if($routeParams.venueId){
    vm.getVenue($routeParams.venueId);
  } else {
    vm.getVenue(vm.userVenues[0].id)
  };

  vm.getStories();

};