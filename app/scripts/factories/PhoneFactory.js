'use strict';
angular.module('phoneApp').factory('PhoneFactory', ['trace','$rootScope','$http','$q','ServerUrl',function(trace,$rootScope,$http,$q,ServerUrl){

  var phones = [];

  var fetch = function(venueId){
    return $q(function(resolve,reject){
      $http.get(ServerUrl + '/venues/' + venueId + '/phones').success(function(response){
        resolve(response);
        angular.copy(response, phones);
      }).error(function(data,status,headers,config){
        trace(data, status, headers, config, 'phone request failed.');
      });
    });
  };

  var get = function(){
    return $q(function(resolve,reject){
      $http.get(ServerUrl + '/phones')
      .success(function(response){
        resolve(response);
      })
      .error(function(data,status,headers,config){
        reject(data);
      });
    });
  };

  var post = function(object){
    return $q(function(resolve, reject){
      $http.post(ServerUrl + '/venues/' + object.phone.venueId + '/phones',object).success(function(response){
        $rootScope.alert = 'Your phone was successfully created';
        resolve(response);
      }).error(function(data,status,headers,config){
        $rootScope.alert = 'Sorry, there was an issue with that request: Status ' + status;
        reject(data,status,headers,config);
      });
    });
  };

  var destroy = function(object){
    debugger;
    return $q(function(resolve,reject){
      $http.delete(ServerUrl+'/venues/' + object.phone.venue.id + '/phones/' + object.phone.id).success(function(response){
        $rootScope.alert = 'Your phone was successfully deleted';
        resolve(response);
      }).error(function(data,status,headers,config){
        $rootScope.alert = 'Sorry, there was an issue with that request: Status ' + status;
        reject(data,status,headers,config);
      });
    });
  };

  return {
    fetch: fetch,
    phones: phones,
    get: get,
    post: post,
    destroy: destroy
  };
}]);