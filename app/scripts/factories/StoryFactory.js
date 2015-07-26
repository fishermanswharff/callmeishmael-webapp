'use strict';
angular.module('phoneApp').factory('StoryFactory', ['trace','$window','$rootScope','ServerUrl','$q','$http',function(trace,$window,$rootScope,ServerUrl,$q,$http){

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

  var fetchOne = function(id){
    return $q(function(resolve,reject){
      $http.get(ServerUrl + '/stories/' + id).success(function(response){
        resolve(response);
      }).error(function(data, status, headers, config){
        trace(data,status,headers,config);
        reject(data, status, headers, config);
      });
    });
  };

  var post = function(object){
    object.story.story_type = _normalize(object.story.story_type);
    return $q(function(resolve,reject){
      $http.post(ServerUrl + '/stories', object).success(function(response, status, headers, config){
        $rootScope.$broadcast('alert', { alert: 'The story was created successfully.', status: status });
        resolve(response);
      }).error(function(data, status, headers, config){
        $rootScope.$broadcast('alert', { alert: 'There was an error and the story was not created successfully.', status: status });
        reject(data, status, headers, config);
      });
    });
  };

  var destroy = function(object){
    return $q(function(resolve,reject){
      $http.delete(ServerUrl + '/stories/'+object.story.id).success(function(response, status, headers, config){
        $rootScope.alert = 'Your venue was successfully deleted';
        resolve(response);
      }).error(function(data,status,headers,config){
        reject({data: data, status: status, headers: headers, config: config});
      });
    });
  };

  var _normalize = function(data){
    return data.toLowerCase().replace(/[\-\s\—\–\”’“‘\',;]/, '');
  };

  return {
    fetch: fetch,
    fetchOne: fetchOne,
    stories: stories,
    post: post,
    destroy: destroy
  };
}]);

