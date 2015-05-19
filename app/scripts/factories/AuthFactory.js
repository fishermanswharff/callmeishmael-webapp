'use strict';
angular.module('phoneApp').factory('AuthFactory',['$location','$rootScope','$http','$window','$q','ServerUrl','trace',function($location,$rootScope,$http,$window,$q,ServerUrl,trace){

  var login = function(credentials){
    return $http.post(ServerUrl + '/login',credentials).success(function(response){
      _storeSession(response);
      $rootScope.currentUser = JSON.parse($window.localStorage.getItem('cmi-user'));
      $rootScope.alert = null;
    }).error(function(data,status,headers,config){
      trace(data,status,headers,config);
      $rootScope.alert = 'Username and Password combination is invalid. Please try again.';
    });
  };

  var logout = function(){
    return $http.get(ServerUrl + '/logout').success(function(response){
      trace(response);
      $window.localStorage.removeItem('cmi-user');
      $rootScope.currentUser = null;
      $rootScope.alert = 'You have successfully logged out';
    });
  };

  var isAuthenticated = function(){
    return !!$window.localStorage.getItem('cmi-user');
  };

  var postNewUser = function(user){
    return $http.post(ServerUrl + '/users',{user: user}).success(function(response){
      trace(response);
    }).error(function(data, status, headers, config){
      trace(data,status,headers,config,'you are so stupid, you are doing it wrong');
    });
  };

  var updateUser = function(user){
    return $http.patch(ServerUrl + '/admin/users/' + user.id, {user: user}).success(function(response){
      $rootScope.confirmed = true;
      trace('success on updateUser: ',response);
    }).error(function(data,status,headers,config){
      trace(data,status,headers,config);
      $rootScope.alert = 'Your password did NOT save successfully, please try again';
    });
  };

  var currentUser = function(){
    $rootScope.currentUser = JSON.parse($window.localStorage.getItem('cmi-user'));
  };

  var sendPasswordLink = function(credentials){
    return $http.get(ServerUrl + '/resetpassword?email=' + credentials.email);
  };

  var submitNewPassword = function(user){
    return $http.patch(ServerUrl + '/admin/users/'+user.id, {user: user}).success(function(response){
      trace(response);
    }).error(function(data,status,headers,config){
      trace(data,status,headers,config);
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
    postNewUser: postNewUser,
    updateUser: updateUser,
    currentUser: currentUser,
    sendPasswordLink: sendPasswordLink,
    submitNewPassword: submitNewPassword
  };
}]);