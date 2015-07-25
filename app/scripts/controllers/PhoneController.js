'use strict';
angular.module('MainController').controller('PhoneController',phoneController);
phoneController.$inject = ['$rootScope','$scope','AuthFactory','StoryFactory','PhoneFactory','VenueFactory','$sceDelegate','trace'];
function phoneController($rootScope,$scope,AuthFactory,StoryFactory,PhoneFactory,VenueFactory,$sceDelegate,trace){
  var vm = this;
  vm.currentPhone = {};
  vm.venues = [];
  vm.ishmaelStories = [];
  vm.availableStories = [];

  // take the first venue for the user for now
  PhoneFactory.fetch($rootScope.currentUser.venues[0].id).then(function(response){
    angular.copy(response[0], vm.currentPhone);
  });

  StoryFactory.fetch().then(function(response){
    var stories = _filterIshmaelStories(response);
    angular.forEach(stories,function(value){vm.availableStories.push(value);});
  });

  angular.forEach($rootScope.currentUser.venues, function(value,index,array){
    VenueFactory.fetchOne(value.id).then(function(response){
      vm.venues.push(response);
      _pushToAvailable(response.stories);
    });
  });

  vm.clearButton = function(obj,index,key,value){
    vm.currentPhone.buttons[index][obj.key] = {};
  };

  vm.isFixed = function(key){
    return key === '*' || key === '#' || key === '0' || key === 'PR';
  };

  $scope.$on('droppedElement',function(e,args){
    var drag = args.dragObj, drop = args.dropObj;
    var buttonToEdit = vm.currentPhone.buttons.filter(function(value,index,array){
      for(var obj in value){
        if(obj === Object.keys(drop)[0]){
          return value;
        }
      }
    })[0];
    var prevStoryId;
    for(var i in buttonToEdit){
      prevStoryId = buttonToEdit[i].story_id;
      buttonToEdit[i].title = drag.title;
      buttonToEdit[i].url = drag.url;
      buttonToEdit[i].story_id = drag.id;
    }
    $scope.$apply();
    StoryFactory.fetchOne(prevStoryId).then(function(response){
      vm.availableStories.push(response);
    });

    // PhoneFactory.assign({button: { assignment: Object.keys(buttonToEdit)[0], story_id: drag.id, phone_id: vm.currentPhone.id }})
  });

  // PRIVATE METHODS

  var _pushToAvailable = function(array){
    angular.forEach(array,function(value,index,array){
      vm.availableStories.push(value);
    });
  };

  var _pullFromAvailable = function(obj){

  };

  var _filterIshmaelStories = function(array){
    return array.filter(function(value){
      if(value.story_type === 'ishmaels'){
        return value;
      }
    });
  };
};
