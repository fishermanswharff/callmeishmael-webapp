'use strict';
angular.module('phoneApp').factory('StoryFactory', ['trace','ServerUrl','$q','$http',function(trace,ServerUrl,$q,$http){

  var stories = [];

  var fetch = function(){
    return $q(function(resolve,reject){
      $http.get(ServerUrl + '/stories').success(function(response){
        angular.copy(response, stories);
        resolve(response);
      }).error(function(data,status,headers,config){
        trace(data,status,headers,config);
      });
    });
  };

  return {
    fetch: fetch,
    stories: stories
  };
}]);