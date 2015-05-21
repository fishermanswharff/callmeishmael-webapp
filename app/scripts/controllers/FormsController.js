'use strict';
angular.module('MainController').controller('FormsController',formsController);
formsController.$inject = ['trace','AuthFactory','PhoneFactory','StoryFactory','VenueFactory'];
function formsController(trace,AuthFactory,PhoneFactory,StoryFactory,VenueFactory){
  var vm = this;

  vm.story_types = ['Fixed','Venue','Surprise'];
  vm.venues = VenueFactory.venues;
  vm.phones = PhoneFactory.phones;

  vm.submit = function(object){
    trace(object);
  };

}