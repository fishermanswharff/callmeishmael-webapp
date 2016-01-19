'use strict';
angular.module('phoneApp').factory('PhoneFactory', ['trace','$rootScope','$http','$q','ServerUrl',function(trace,$rootScope,$http,$q,ServerUrl){

  var phones = [];

  var fetch = function(venueId){
    return $q(function(resolve,reject){
      $http.get(ServerUrl + '/venues/' + venueId + '/phones').success(function(data, status, headers, config){
        resolve(data);
      }).error(function(data,status,headers,config){
        reject(data, status, headers, config);
        trace(data, status, headers, config, 'phone request failed.');
      });
    });
  };

  var fetchOne = function(phoneId) {
    return $q(function(resolve,reject){
      $http.get(ServerUrl + '/venues/-/phones/' + phoneId).success(function(data, status, headers, config){
        resolve(data);
      }).error(function(data,status,headers,config){
        reject(data, status, headers, config);
        trace(data, status, headers, config, 'phone request failed.');
      });
    });
  };

  var get = function(){
    return $q(function(resolve,reject){
      $http.get(ServerUrl + '/phones').success(function(data, status, headers, config){
        angular.copy(data, phones);
        resolve(data);
      })
      .error(function(data,status,headers,config){
        reject(data);
      });
    });
  };

  var post = function(object){
    return $q(function(resolve, reject){
      $http.post(ServerUrl + '/venues/' + object.phone.venue_id + '/phones',object).success(function(data, status, headers, config){
        $rootScope.$broadcast('alert', { alert: 'The phone has been created.', status: status });
        resolve(data);
      }).error(function(data,status,headers,config){
        $rootScope.$broadcast('alert', { alert: 'There was an error and the requested action failed:' + data.errors.join(), status: status });
        reject(data,status,headers,config);
      });
    });
  };

  var patch = function(object){
    return $q(function(resolve,reject){
      $http.put(ServerUrl + '/venues/' + object.phone.venue.id + '/phones/' + object.phone.id, object).success(function(response, status, headers, config){
        $rootScope.$broadcast('alert', {alert: 'Phone ' + response.venue.name + ' ' + response.unique_identifier + ' updated', status: status});
        resolve(response,status,headers,config);
      }).error(function(response,status,headers,config){
        $rootScope.$broadcast('alert', {alert: 'Update failed.', status: status});
        reject(response,status,headers,config);
      });
    });
  };

  var destroy = function(object){
    return $q(function(resolve,reject){
      $http.delete(ServerUrl+'/venues/' + object.phone.venue.id + '/phones/' + object.phone.id).success(function(data, status, headers, config){
        $rootScope.$broadcast('alert', { alert: 'The phone has been deleted.', status: status });
        resolve(data);
      }).error(function(data,status,headers,config){
        $rootScope.$broadcast('alert', { alert: 'There was an error and the requested action failed.', status: status });
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
      $http.patch(ServerUrl + '/buttons/'+buttonId,{button:{ story_id: storyId }}).success(function(data, status, headers, config){
        $rootScope.$broadcast('alert', { alert: 'Button ' + data.assignment + ' was successfully changed to ' + data.story.title + '. Changes to your phone will take effect tomorrow.', status: status });
        resolve(data);
      }).error(function(data,status,headers,config){
        $rootScope.$broadcast('alert', { alert: 'Sorry, there was an issue with that request.', status: status });
        reject(data,status,headers,config);
      });
    });
  };

  var callThePhone = function(phone){
    return $q(function(resolve,reject){
      $http.get(ServerUrl + '/venues/' + phone.venue.id + '/phones/' + phone.id + '/call_the_phone').success(function(data,status,headers,config){
        $rootScope.$broadcast('alert', { alert: 'Phone was called', status: status });
        resolve(data);
      }).error(function(data,status,headers,config){
        $rootScope.$broadcast('alert', { alert: 'Sorry, there was a problem.', status: status });
        reject(data,status,headers,config);
      });
    });
  };

  return {
    fetch: fetch,
    fetchOne: fetchOne,
    phones: phones,
    get: get,
    post: post,
    patch: patch,
    assignButton: assignButton,
    destroy: destroy,
    callThePhone: callThePhone
  };
}]);
