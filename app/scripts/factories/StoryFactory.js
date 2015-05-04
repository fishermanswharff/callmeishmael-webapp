'use strict';
angular.module('phoneApp').factory('StoryFactory', ['trace','ServerUrl','$http',function(trace,ServerUrl,$http){

  var stories = [];

  var fetch = function(){
    $http.get(ServerUrl + '/stories').success(function(response){
      angular.copy(response, stories);
    }).error(function(data,status,headers,config){
      trace(data,status,headers,config);
    });
  };

  return {
    fetch: fetch,
    stories: stories
  };
}]);