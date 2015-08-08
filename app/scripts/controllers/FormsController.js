'use strict';
angular.module('MainController').controller('FormsController',formsController);
formsController.$inject = ['trace','$q','AuthFactory','PhoneFactory','StoryFactory','VenueFactory','AWSFactory','$rootScope','$scope'];
function formsController(trace,$q,AuthFactory,PhoneFactory,StoryFactory,VenueFactory,AWSFactory,$rootScope,$scope){

  var vm = this;
  vm.storyTypes = ['Fixed','Venue','Surprise','Ishmael’s', 'Post Roll'];
  vm.phoneStatus = ['active','inactive','retired','fixable'];
  vm.venues = VenueFactory.venues;
  vm.phones = PhoneFactory.phones;
  vm.stories = StoryFactory.stories;
  vm.users = AuthFactory.users;

  vm.story = {}, vm.venueStory = {}, vm.phone = {}, vm.venue = {};

  vm.submit = function(object){
    for(var item in object){
      switch(item) {
        case 'story':
          storySubmitHandler(object);
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
    if(object.story.story_type === 'Venue' && object.story.venue_id === undefined){
      $rootScope.$broadcast('alert', {alert: 'Please choose a venue for the story', status: 400});
      return;
    }
    var files = _getFiles();
    AWSFactory.sendToAmazon(files[0]).then(function(response){
      var location;
      $rootScope.$watch('awsResponse',function(newValue,oldValue){
        if(newValue && newValue.status === 204){
          location = newValue.headers().location;
          $q.all(upsertStory(object,location)).then(function(responses){
            if(object.story.venue_id){
              var story = responses[0];
              VenueFactory.addStoryToVenue(object.story.venue_id, story.id);
            }
            vm.story = {};
            $(storyForm).find('input[type=file]').val(null);
            fetchStories();
          });
        }
      });
    });
  };

  var upsertStory = function(object,url){
    var promises = [];
    promises.push(StoryFactory.post(object,url));
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
    var $fileInputs = $(storyForm).find('input[type=file]');
    for (var i = 0, length = $fileInputs.length; i < length; i++) {
      var file = $fileInputs[i].files[0];
      if(file) {
        promises.push(file);
      }
    }
    return promises;
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

  $rootScope.$on('editStory', function(e, args){
    vm.story = args.story;
  });
}
