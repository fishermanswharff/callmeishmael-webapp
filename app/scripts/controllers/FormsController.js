'use strict';
angular.module('MainController').controller('FormsController',formsController);
formsController.$inject = ['trace','$q','AuthFactory','PhoneFactory','StoryFactory','VenueFactory','AWSFactory','$rootScope','$scope'];
function formsController(trace,$q,AuthFactory,PhoneFactory,StoryFactory,VenueFactory,AWSFactory,$rootScope,$scope){

  var activeVenues = function(element,index,array){
    return element.status === 'active';
  };

  var vm = this;
  vm.storyTypes = ['Fixed','Venue','Ishmael’s', 'Post Roll'];
  vm.phoneStatus = ['active','inactive','retired','fixable'];
  vm.phones = PhoneFactory.phones;
  vm.stories = StoryFactory.stories;
  vm.users = AuthFactory.users;

  VenueFactory.fetch().then(function(response){
    vm.venues = response.filter(activeVenues);
  });

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
        case 'user':
          userSubmitHandler(object);
          vm.newUser = {};
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
    if(files.length > 0){
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
              StoryFactory.fetch();
            });
          }
        });
      });
    } else {
      $q.all(upsertStory(object)).then(function(responses){
        if(object.story.venue_id){
          var story = responses[0];
          VenueFactory.addStoryToVenue(object.story.venue_id, story.id);
        }
        vm.story = {};
        $(storyForm).find('input[type=file]').val(null);
        StoryFactory.fetch();
      });
    }
  };

  var userSubmitHandler = function(object){
    if(object.user.venueId){
      var venueId = object.user.venueId;
      delete object.user.venueId;
      object.user.password = 'secret';
      AuthFactory.postNewUser(object).then(function(response){
        VenueFactory.patch({ venue: { user_id: response.data.id}}, venueId);
      });
    } else {
      object.user.password = 'secret';
      AuthFactory.postNewUser(object).then(function(response){
        trace(response);
      });
    }
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
          StoryFactory.destroy(object).then(function(response){ StoryFactory.fetch(); });
          break;
        case 'venue':
          VenueFactory.destroy(object).then(function(response){ VenueFactory.fetch(); });
          break;
        case 'phone':
          PhoneFactory.destroy(object).then(function(response){ PhoneFactory.get(); });
          break;
        default:
          break;
      }
    }
  };

  vm.normalizeStoryTitle = function(string){
    return StoryFactory.normalize(string);
  };

  vm.clearForm = function(){
    vm.story = {};
    vm.isEditing = !vm.isEditing;
  };

  var setCurrentStory = function(e, args){
    vm.story = args.story;
    vm.isEditing = !!vm.story.id;
  };

  $rootScope.$on('editStory', setCurrentStory);
}

