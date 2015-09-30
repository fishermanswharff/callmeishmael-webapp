'use strict';
angular.module('phoneApp').factory('ButtonFactory', ['$rootScope','$http','$q','ServerUrl','trace', function($rootScope,$http,$q,ServerUrl,trace){

  var fixedStories = [];
  var starStories = [];
  var hashStories = [];
  var zeroStories = [];
  var postrollStories = [];

  var indexFixed = function(){
    return $q(function(resolve,reject){
      $http.get(ServerUrl + '/buttons/index_fixed').success(function(data,status,headers,config){
        resolve(data,status,headers,config);
      }).error(function(data,status,headers,config){
        reject(data,status,headers,config);
      });
    });
  };

  var indexStar = function(){
    return $q(function(resolve,reject){
      $http.get(ServerUrl + '/buttons/index_star').success(function(data,status,headers,config){
        angular.copy(data, starStories);
        resolve(data,status,headers,config);
      }).error(function(data,status,headers,config){
        reject(data,status,headers,config);
      });
    });
  };

  var indexHash = function(){
    return $q(function(resolve,reject){
      $http.get(ServerUrl + '/buttons/index_hash').success(function(data,status,headers,config){
        angular.copy(data, hashStories);
        resolve(data,status,headers,config);
      }).error(function(data,status,headers,config){
        reject(data,status,headers,config);
      });
    });
  };

  var indexZero = function(){
    return $q(function(resolve,reject){
      $http.get(ServerUrl + '/buttons/index_zero').success(function(data,status,headers,config){
        angular.copy(data, zeroStories);
        resolve(data,status,headers,config);
      }).error(function(data,status,headers,config){
        reject(data,status,headers,config);
      });
    });
  };

  var indexPostroll = function(){
    return $q(function(resolve,reject){
      $http.get(ServerUrl + '/buttons/index_postroll').success(function(data,status,headers,config){
        angular.copy(data, postrollStories);
        resolve(data,status,headers,config);
      }).error(function(data,status,headers,config){
        reject(data,status,headers,config);
      });
    });
  };

  var updateFixedStory = function(button){
    return $q(function(resolve,reject){
      $http.post(ServerUrl + '/buttons/update_fixed', button).success(function(data,status,headers,config){
        resolve(data,status,headers,config);
      }).error(function(data,status,headers,config){
        reject(data,status,headers,config);
      });
    });
  };

  var postFixed = function(button){
    return $q(function(resolve,reject){
      $http.post(ServerUrl + '/buttons/update_fixed', button).success(function(data,status,headers,config){
        $rootScope.$broadcast('alert', { alert: 'The button was updated successfully.', status: status });
        resolve(data,status,headers,config);
      }).error(function(data,status,headers,config){
        $rootScope.$broadcast('alert', { alert: 'There was a problem and the button was not updated.', status: status });
        reject(data,status,headers,config);
      });
    });
  };

  return {
    updateFixedStory: updateFixedStory,
    indexFixed: indexFixed,
    fixedStories: fixedStories,
    indexStar: indexStar,
    indexHash: indexHash,
    indexZero: indexZero,
    indexPostroll: indexPostroll,
    starStories: starStories,
    hashStories: hashStories,
    zeroStories: zeroStories,
    postrollStories: postrollStories,
    postFixed: postFixed
  }
}]);