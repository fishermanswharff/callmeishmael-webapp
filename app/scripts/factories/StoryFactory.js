'use strict';
angular.module('phoneApp').factory('StoryFactory', ['trace','$rootScope','ServerUrl','$q','$http',function(trace,$rootScope,ServerUrl,$q,$http){

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

  var post = function(object){
    object.story.story_type = _normalize(object.story.story_type);
    return $q(function(resolve,reject){
      $http.post(ServerUrl + '/stories', object).success(function(response){
        $rootScope.alert = 'Your story was successfully created';
        resolve(response);
      }).error(function(data, status, headers, config){
        trace(data,status,headers,config);
        reject(data, status, headers, config);
      });
    });
  };

  var _normalize = function(data){
    return data.toLowerCase().replace(/[-\s]/, '');
  };

  return {
    fetch: fetch,
    stories: stories,
    post: post
  };
}]);