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

  var assignButton = function(object){
    var buttonId, storyId;
    for(var i in object){
      buttonId = object[i].button_id.toString();
      storyId = object[i].story_id.toString();
    }
    return $q(function(resolve,reject){
      $http.patch(ServerUrl + '/buttons/'+buttonId,{button:{ story_id: storyId }}).success(function(response){
        $rootScope.alert = 'Your button was successfully changed. Changes to your phone will take effect tomorrow.';
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
    assignButton: assignButton,
    destroy: destroy
  };
}]);