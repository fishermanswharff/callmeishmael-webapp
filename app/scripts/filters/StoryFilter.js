'use strict';
angular.module('phoneApp').filter('storyFilter',['trace','StoryFactory',function(trace,StoryFactory){
  return function(stories,input){
    var filterResult = [];
    var stringToSearch = input || '^$';
    var regex = new RegExp("("+stringToSearch+")",'ig');
    angular.forEach(stories,function(value,index){
      var search = value.title.search(regex);
      if(search !== -1) filterResult.push(value);
    });
    return filterResult;
  }
}]);