'use strict';
angular.module('phoneApp').factory('VenueFactory', ['trace','ServerUrl','$q','$http',function(trace,ServerUrl,$q,$http){

  var venues = [];

  var fetch = function(){
    return $q(function(resolve,reject){
      $http.get(ServerUrl + '/venues').success(function(response){
        angular.copy(response, venues);
        resolve(response);
      }).error(function(data,status,headers,config){
        trace(data,status,headers,config);
      });
    });
  };

  return {
    fetch: fetch,
    venues: venues
  };
}]);