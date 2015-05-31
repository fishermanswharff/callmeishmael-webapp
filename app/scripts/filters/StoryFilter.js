angular.module('phoneApp').filter('storyFilter',['trace','StoryFactory',function(trace,StoryFactory){
  return function(input,stories){
    trace(input, stories);
    var filterResult = [];
    angular.forEach(stories,function(value,index){
      if(input === value.title){
        filterResult.push(value)
      }
    });
    // trace(filterResult);
    return filterResult;
  }
}]);