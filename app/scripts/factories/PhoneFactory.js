'use strict';
angular.module('phoneApp').factory('PhoneFactory', ['trace','$http','ServerUrl',function(trace,$http,ServerUrl){

  var phones = [];

  var fetch = function(venueId){
    $http.get(ServerUrl + '/venues/' + venueId + '/phones').success(function(response){
      angular.copy(response,phones);
    }).error(function(data, status, headers, config) {
      trace(data,status,headers,config);
    });
  };

  return {
    fetch: fetch,
    phones: phones
  };
}]);