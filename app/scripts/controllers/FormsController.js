'use strict';
angular.module('MainController').controller('FormsController',formsController);
formsController.$inject = ['trace','AuthFactory','PhoneFactory','StoryFactory','VenueFactory'];
function formsController(trace,AuthFactory,PhoneFactory,StoryFactory,VenueFactory){

  var vm = this;
  vm.story_types = ['Fixed','Venue','Surprise'];
  vm.venues = [];
  vm.phones = [];
  vm.stories = [];

  VenueFactory.fetch().then(function(response){
    for(var i = 0; i < response.length; i++){
      if(response[i].status == 'active') vm.venues.push(response[i]);
    }
  });

  PhoneFactory.get().then(function(response){
    angular.copy(response,vm.phones);
  });

  StoryFactory.fetch().then(function(response){
    angular.copy(response,vm.stories);
  });

  vm.submit = function(object){
    trace(object);
  };
}