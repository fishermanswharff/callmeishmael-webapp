'use strict';
angular.module('phoneApp').factory('VenueFactory', ['trace','$window','$rootScope','ServerUrl','$q','$http',function(trace,$window,$rootScope,ServerUrl,$q,$http){

  var venues = [];

  var fetch = function(){
    return $q(function(resolve,reject){
      $http.get(ServerUrl + '/venues').success(function(response){
        angular.copy(response, venues);
        resolve(response);
      }).error(function(data,status,headers,config){
        reject(data,status,headers,config);
      });
    });
  };

  var fetchOne = function(venueId){
    return $q(function(resolve,reject){
      $http.get(ServerUrl + '/venues/' + venueId).success(function(response){
        resolve(response);
      }).error(function(data,status,headers,config){
        reject(data,status,headers,config);
      });
    });
  };

  var post = function(object){
    object.venue.user_ids = _convertToArray(object.venue.user_ids);
    return $q(function(resolve,reject){
      $http.post(ServerUrl + '/venues', object).success(function(response){
        $rootScope.alert = 'Your venue was successfully created';
        resolve(response);
      }).error(function(data,status,headers,config){
        $rootScope.alert = 'Sorry, there was an issue with that request: Status ' + status;
        reject(data);
      });
    });
  };

  var destroy = function(object){
    return $q(function(resolve,reject){
      $http.delete(ServerUrl+'/venues/'+object.venue.id).success(function(response){
        $rootScope.alert = 'Your venue was successfully deleted';
        resolve(response);
      }).error(function(data,status,headers,config){
        $rootScope.alert = 'Sorry, there was an issue with that request: Status ' + status;
        reject(data);
      });
    });
  }

  var _convertToArray = function(object){
    var array = [];
    for(var key in object){
      if(object[key].checked){
        array.push(key);
      }
    }
    return array;
  };

  return {
    fetch: fetch,
    fetchOne: fetchOne,
    venues: venues,
    post: post,
    destroy: destroy
  };
}]);