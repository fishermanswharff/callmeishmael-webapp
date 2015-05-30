'use strict';
angular.module('MainController').controller('DashboardController',dashboardController);
dashboardController.$inject = ['trace','VenueFactory','PhoneFactory','StoryFactory'];

function dashboardController(trace,VenueFactory,PhoneFactory,StoryFactory){
  var vm = this;
  vm.venues = [];
  vm.phones = [];
  vm.stories = [];

  var fetchVenues = function(){
    VenueFactory.fetch().then(function(response){ angular.copy(response,vm.venues); });
  };

  var fetchStories = function(){
    StoryFactory.fetch().then(function(response){ angular.copy(response,vm.stories); trace(vm.stories); });

  };

  var fetchPhones = function(){
    PhoneFactory.get().then(function(response){ angular.copy(response,vm.phones); });
  };

  vm.activeVenues = function(){
    var active = [];
    vm.venues.map(function(obj,i){
      if(obj.status === 'active') active.push(obj);
    });
    return active.length;
  };

  vm.pausedVenues = function(){
    var paused = [];
    vm.venues.map(function(obj,i){
      if(obj.status === 'paused') paused.push(obj);
    });
    return paused.length;
  };

  vm.deleteObject = function(object){
    trace(object);
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

  fetchVenues();
  fetchStories();
  fetchPhones();
}