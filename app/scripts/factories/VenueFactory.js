'use strict';
angular.module('phoneApp').factory('VenueFactory', ['trace','ServerUrl','$http',function(trace,ServerUrl,$http){

  var venues = [];

  var fetch = function(){
    $http.get(ServerUrl + '/venues').success(function(response){
      angular.copy(response, venues);
    }).error(function(data,status,headers,config){
      trace(data,status,headers,config);
    });
  };

  return {
    fetch: fetch,
    venues: venues
  };
}]);