'use strict';
angular.module('MainController').controller('FormsController',formsController);
formsController.$inject = ['trace','$q','AuthFactory','PhoneFactory','StoryFactory','VenueFactory','AWSFactory','$rootScope'];
function formsController(trace,$q,AuthFactory,PhoneFactory,StoryFactory,VenueFactory,AWSFactory,$rootScope){

  var vm = this;
  vm.storyTypes = ['Fixed','Venue','Surprise','Ishmael’s', 'Post Roll'];
  vm.phoneStatus = ['active','inactive','retired','fixable'];
  vm.venues = [];
  vm.phones = [];
  vm.stories = [];
  vm.users = [];

  vm.story = {},
  vm.venueStory = {},
  vm.phone = {},
  vm.venue = {};

  VenueFactory.fetch().then(function(response){
    for(var i = 0; i < response.length; i++){
      if(response[i].status == 'active') vm.venues.push(response[i]);
    }
  });

  AuthFactory.fetchUsers().then(function(response){
    angular.copy(response,vm.users);
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
          storySubmitHandler(object);
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

  var storySubmitHandler = function(object){
    var files = _getFiles();
    AWSFactory.sendToAmazon(files[0]).then(function(response){
      $rootScope.$watch('awsResponse',function(newValue,oldValue){
        if(newValue && newValue.status === 204){
          $q.all(upsertStory(object,files)).then(function(responses){
            trace(responses);
          });
        }
      });
    });
    // posts the story to rails first. not ideal, want to post to amazon first
    // and only if successful post to rails with the url
    /*StoryFactory.post(object,files).then(function(response){
      $q.all(_upsertFiles(files)).then(function(responses){
        trace(responses);
      });
    });*/
  };

  var upsertStory = function(object,files){
    var promises = [];
    promises.push(StoryFactory.post(object,files));
    return promises;
  };

  var _upsertFiles = function(array){
    var promises = [];
    for(var i = 0; i < array.length; i++){
      promises.push(AWSFactory.sendToAmazon(array[i]));
    }
    return promises;
  };

  var _getFiles = function(){
    var promises = [];
    var $fileInputs = $(storyForm).find('input[type=file]')
    for (var i = 0, length = $fileInputs.length; i < length; i++) {
      var file = $fileInputs[i].files[0];
      if(file) {
        promises.push(file);
      }
    }
    return promises;
  };
}


