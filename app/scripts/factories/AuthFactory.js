'use strict';
angular.module('phoneApp').factory('AuthFactory',['$rootScope','$http','$window','ServerUrl','trace',function($rootScope,$http,$window,ServerUrl,trace){
  var login = function(credentials){
    return $http.post(ServerUrl + '/login',credentials).success(function(response){
      _storeSession(response);
      $rootScope.alert = null;
    }).error(function(data,status,headers,config){
      $rootScope.alert = 'Username and Password combination is invalid. Please try again.';
    });
  };

  var logout = function(){
    return $http.get(ServerUrl + '/logout').success(function(response){
      $window.localStorage.removeItem('cmi-user');
      $rootScope.alert = 'You have successfully logged out';
    });
  };

  var isAuthenticated = function(){
    return !!$window.localStorage.getItem('cmi-user');
  };

  var postNewUser = function(user){
    return $http.post(ServerUrl + '/users',{user: user}).success(function(response){
      _storeSession(response);
    }).error(function(data, status, headers, config){
      trace(data,status,headers,config,'you are so stupid, you are doing it wrong');
    });
  };

  var _storeSession = function(data){
    $window.localStorage.setItem('cmi-user', JSON.stringify(data));
    $http.defaults.headers.common.Authorization = 'Token token=' + data.token;
  };

  return {
    login: login,
    logout: logout,
    isAuthenticated: isAuthenticated,
    postNewUser: postNewUser
  };
}]);