'use strict';
angular.module('MainController').controller('FormsController',formsController);
formsController.$inject = ['trace','AuthFactory','PhoneFactory','StoryFactory','VenueFactory'];
function formsController(trace,AuthFactory,PhoneFactory,StoryFactory,VenueFactory){

  var vm = this;
  vm.story_types = ['Fixed','Venue','Surprise'];
  vm.venues = [];
  vm.phones = [];

  VenueFactory.fetch().then(function(response){
    for(var i = 0; i < response.length; i++){
      if(response[i].status == 'active') vm.venues.push(response[i]);
    }
  });

  vm.phones = PhoneFactory.get().then(function(response){
    angular.copy(response,vm.phones);
  });

  vm.stories = StoryFactory.stories;

  vm.submit = function(object){
    trace(object);
  };
}