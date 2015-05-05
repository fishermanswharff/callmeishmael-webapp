'use strict';
angular.module('MainController').controller('DashboardController',dashboardController);
dashboardController.$inject = ['trace','VenueFactory','PhoneFactory','StoryFactory'];

function dashboardController(trace,VenueFactory,PhoneFactory,StoryFactory){
  var vm = this;
  vm.venues = [];

  VenueFactory.fetch().then(function(response){
    vm.venues = response;
    angular.forEach(vm.venues, function(obj,i,array){
      vm.phones = [];
      PhoneFactory.fetch(obj.id).then(function(response){
        response.forEach(function(obj,i){
          vm.phones.push(obj);
        });
      });
    }, vm);
  });

  StoryFactory.fetch().then(function(response){
    vm.stories = response;
  });

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
}