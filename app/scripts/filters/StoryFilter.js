'use strict';
angular.module('phoneApp').filter('storyFilter',['trace','StoryFactory',function(trace,StoryFactory){
  return function(stories,input){
    var filterResult = [];
    var stringToSearch = input || '^$';
    var regex = new RegExp('('+stringToSearch+')','ig');
    angular.forEach(stories,function(value,index){
      var searchTitle = value.title.search(regex);
      var searchAuthor = value.author_last.search(regex);
      if(searchTitle !== -1 || searchAuthor !== -1){
        filterResult.push(value);
      }
    });
    return filterResult;
  };
}]);