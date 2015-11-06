'use strict';
angular.module('MainController').controller('DashboardController',dashboardController);
dashboardController.$inject = ['trace','VenueFactory','PhoneFactory','StoryFactory','storyTypes'];

function dashboardController(trace,VenueFactory,PhoneFactory,StoryFactory,storyTypes){
  var vm = this;
  vm.phones = [];
  vm.stories = [];
  vm.storyData = StoryFactory.storyData;
  vm.storyTypes = storyTypes();

  vm.venues = VenueFactory.venues;
  vm.phones = PhoneFactory.phones;
  vm.stories = StoryFactory.stories;

  vm.pausedVenues = function(){
    var paused = [];
    vm.venues.map(function(obj,i){
      if(obj.status === 'paused') paused.push(obj);
    });
    return paused.length;
  };

  vm.deleteObject = function(object){
    // trace(object);
    for(var item in object){
      switch(item){
        case 'story':
          StoryFactory.destroy(object).then(function(response){ fetchStories(); });
          break;
        case 'venue':
          VenueFactory.destroy(object).then(function(response){ fetchVenues(); });
          break;
        case 'phone':
          debugger;
          PhoneFactory.destroy(object).then(function(response){ fetchPhones(); });
          break;
        default:
          break;
      }
    }
  };

  vm.activeVenues = function(){
    return vm.venues.filter(isActive).length;
  };

  vm.pausedVenues = function(){
    return vm.venues.filter(isPaused).length;
  };

  vm.cancelledVenues = function(){
    return vm.venues.filter(isCancelled).length;
  };

  var isActive = function(value,idx,array){
    return value.venue_status === 'active';
  };

  var isPaused = function(value,idx,array){
    return value.venue_status === 'paused';
  };

  var isCancelled = function(value,idx,array){
    return value.venue_status === 'cancelled';
  };

  var fetchStories = function(){
    StoryFactory.fetch().then(function(response){
      angular.copy(response.stories, vm.stories);
    });
  };

  var fetchVenues = function(){
    VenueFactory.fetch().then(function(response){
      angular.copy(response, vm.venues);
    });
  };

  var fetchPhones = function(){
    PhoneFactory.get().then(function(response){
      angular.copy(response, vm.phones);
    });
  };

  console.log(vm.venues)
}
