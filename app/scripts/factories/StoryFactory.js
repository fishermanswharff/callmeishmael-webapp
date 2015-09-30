'use strict';
angular.module('phoneApp').factory('StoryFactory', ['trace','$window','$rootScope','ServerUrl','$q','$http','AWSFactory','AmazonBucket',function(trace,$window,$rootScope,ServerUrl,$q,$http,AWSFactory,AmazonBucket){

  var stories = [];
  var storyData = {};

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

  var fetchData = function(){
    return $q(function(resolve,reject){
      $http.get(ServerUrl + '/stories/story_data').success(function(response,status,headers,config){
        angular.copy(response,storyData);
        resolve(response,status,headers,config);
      }).error(function(response,status,headers,config){
        reject(response,status,headers,config);
      });
    });
  };

  var post = function(object,url){
    object.story.story_type = normalize(object.story.story_type);
    if(url) object.story.url = url;
    if(object.story.id){
      return $q(function(resolve, reject){
        $http.put(ServerUrl + '/stories/' + object.story.id, object).success(function(response,status,headers,config){
          $rootScope.$broadcast('alert',{ alert: 'The story ' + response.title + ' was updated successfully', status: status });
          resolve(response,status,headers,config);
        }).error(function(response,status,headers,config){
          $rootScope.$broadcast('alert',{ alert: 'The story ' + object.title + ' failed to update.', status: status });
          reject(response,status,headers,config);
        });
      });
    } else {
      return $q(function(resolve,reject){
        $http.post(ServerUrl + '/stories', object).success(function(response, status, headers, config){
          $rootScope.$broadcast('alert', { alert: 'The story was created successfully.', status: status });
          resolve(response);
        }).error(function(data, status, headers, config){
          $rootScope.$broadcast('alert', { alert: 'There was an error and the story was not created successfully.', status: status });
          reject(data, status, headers, config);
        });
      });
    }
  };

  var destroy = function(object){
    return $q(function(resolve,reject){
      $http.delete(ServerUrl + '/stories/'+object.story.id).success(function(response, status, headers, config){
        $rootScope.$broadcast('alert',{ alert: 'Story ' + object.story.title + ' was successfully deleted', status: status});
        resolve(response);
      }).error(function(data,status,headers,config){
        reject({data: data, status: status, headers: headers, config: config});
      });
    });
  };

  var normalize = function(data){
    if(!data) return;
    return data.toLowerCase().replace(/[\-\s\—\–\”’“‘\',;]/, '');
  };

  return {
    fetch: fetch,
    fetchOne: fetchOne,
    fetchData: fetchData,
    stories: stories,
    storyData: storyData,
    post: post,
    destroy: destroy,
    normalize: normalize
  };
}]);

