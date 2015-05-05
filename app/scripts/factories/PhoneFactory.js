'use strict';
angular.module('phoneApp').factory('PhoneFactory', ['trace','$http','$q','ServerUrl',function(trace,$http,$q,ServerUrl){

  var fetch = function(venueId){
    return $q(function(resolve,reject){
      $http.get(ServerUrl + '/venues/' + venueId + '/phones').success(function(response){
        resolve(response);
      }).error(function(data,status,headers,config){
        trace(data, status, headers, config, 'phone request failed.');
      });
    });
  };

  return {
    fetch: fetch,
  };
}]);