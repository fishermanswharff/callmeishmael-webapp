'use strict';
angular.module('MainController').controller('FormsController',formsController);
formsController.$inject = ['trace','AuthFactory','PhoneFactory','StoryFactory','VenueFactory'];
function formsController(trace,AuthFactory,PhoneFactory,StoryFactory,VenueFactory){

  var vm = this;
  vm.storyTypes = ['Fixed','Venue','Surprise','Ishmael’s'];
  vm.phoneStatus = ['active','inactive','retired','fixable'];
  vm.venues = [];
  vm.phones = [];
  vm.stories = [];
  vm.users = [];

  vm.story = {}, vm.venueStory = {}, vm.phone = {}, vm.venue = {};

  VenueFactory.fetch().then(function(response){
    for(var i = 0; i < response.length; i++){
      if(response[i].status == 'active') vm.venues.push(response[i]);
    }
  });

  AuthFactory.fetchUsers().then(function(response){
    angular.copy(response,vm.users);
    trace(vm.users);
  });

  PhoneFactory.get().then(function(response){
    angular.copy(response,vm.phones);
  });

  StoryFactory.fetch().then(function(response){
    angular.copy(response,vm.stories);
  });

  vm.submit = function(object){
    for(var item in object){
      switch(item) {
        case 'story':
          StoryFactory.post(object).then(function(response){
            trace(response);
          });
          vm.story = {};
          break;
        case 'phone':
          PhoneFactory.post(object).then(function(response){
            trace(response);
          });
          vm.phone = {};
          trace('phone is the object');
          break;
        case 'venue':
          VenueFactory.post(object).then(function(response){
            trace(response);
          });
          vm.venue = {};
          trace('venue is the object');
          break;
        default:
          break;
      }
    }
  };

  vm.hasUser = function(user){};
}