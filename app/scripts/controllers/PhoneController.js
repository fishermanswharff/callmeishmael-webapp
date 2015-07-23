'use strict';
angular.module('MainController').controller('PhoneController',phoneController);
phoneController.$inject = ['$rootScope','AuthFactory','StoryFactory','PhoneFactory','VenueFactory','$sceDelegate','trace'];
function phoneController($rootScope,AuthFactory,StoryFactory,PhoneFactory,VenueFactory,$sceDelegate,trace){
  var vm = this;
  vm.currentPhone = {};
  vm.venues = [];
  vm.ishmaelStories = [];

  PhoneFactory.fetch($rootScope.currentUser.venues[0].id).then(function(response){
    angular.copy(response[0], vm.currentPhone);
    // trace(vm.currentPhone);
  });

  StoryFactory.fetch().then(function(response){
    angular.copy(_filterIshmaelStories(response),vm.ishmaelStories);
  });

  angular.forEach($rootScope.currentUser.venues, function(value,index,array){
    VenueFactory.fetchOne(value.id).then(function(response){
      vm.venues.push(response);
    });
  });

  vm.clearButton = function(obj,index,key,value){
    vm.currentPhone.buttons[index][obj.key] = {};
  };


  var _filterIshmaelStories = function(array){
    return array.filter(function(value){
      if(value.story_type === 'ishmaels'){
        return value;
      }
    });
  };
};