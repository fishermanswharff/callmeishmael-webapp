'use strict';
angular.module('phoneApp').factory('AuthFactory',['$location','$rootScope','$http','$window','$q','ServerUrl','trace',function($location,$rootScope,$http,$window,$q,ServerUrl,trace){

  var users = [];

  var fetchUsers = function(){
    return $q(function(resolve,reject){
      $http.get(ServerUrl + '/admin/users').success(function(response){
        angular.copy(response,users);
        resolve(response);
      }).error(function(data,status,headers,config){
        reject(data);
        $rootScope.alert = 'Unsuccessful attempt to retreive all users because:' + data + "\n" + status;
      });
    });
  };

  var login = function(credentials){
    return $http.post(ServerUrl + '/login',credentials).success(function(response, status, headers, config){
      _storeSession(response);
      $rootScope.currentUser = JSON.parse($window.localStorage.getItem('cmi-user'));
      trace(status);
      $rootScope.$broadcast('alert', { alert: 'Log in successful.', status: status });
    }).error(function(data,status,headers,config){
      $rootScope.$broadcast('alert', { alert: 'Your email and/or password are incorrect.', status: status });
    });
  };

  var logout = function(){
    return $http.get(ServerUrl + '/logout').success(function(response, status, headers, config){
      trace(response);
      $window.localStorage.removeItem('cmi-user');
      $rootScope.currentUser = null;
      $rootScope.$broadcast('alert', { alert: 'You have successfully logged out.', status: status });
    });
  };

  var isAuthenticated = function(){
    return !!$window.localStorage.getItem('cmi-user');
  };

  var postNewUser = function(user){
    return $http.post(ServerUrl + '/users',{user: user}).success(function(response, status, headers, config){
      trace(response);
      $rootScope.$broadcast('alert', { alert: 'New user successfully created.', status: status });
    }).error(function(data, status, headers, config){
      $rootScope.$broadcast('alert', { alert: 'New user successfully created.', status: status });
      trace(data,status,headers,config,'you are so stupid, you are doing it wrong');
    });
  };

  var updateUser = function(user){
    return $http.patch(ServerUrl + '/admin/users/' + user.id, {user: user}).success(function(response, status, headers, config){
      $rootScope.confirmed = true;
      $rootScope.$broadcast('alert', { alert: 'User updated successfully.', status: status });
    }).error(function(data,status,headers,config){
      $rootScope.$broadcast('alert', { alert: 'User was not updated successfully.', status: status });
    });
  };

  var currentUser = function(){
    return $rootScope.currentUser = JSON.parse($window.localStorage.getItem('cmi-user'));
  };

  var sendPasswordLink = function(credentials){
    return $http.get(ServerUrl + '/resetpassword?email=' + credentials.email);
  };

  var submitNewPassword = function(user){
    return $http.patch(ServerUrl + '/admin/users/'+user.id, {user: user}).success(function(response, status, headers, config){
      trace(response);
      $rootScope.$broadcast('alert', { alert: 'Your password was successfully changed.', status: status });
    }).error(function(data,status,headers,config){
      trace('error changing new password: ',data,status,headers,config);
      $rootScope.$broadcast('alert', { alert: 'Your password was not successfully changed.', status: status });
    });
  };

  var _storeSession = function(data){
    $window.localStorage.setItem('cmi-user', JSON.stringify(data));
    $http.defaults.headers.common.Authorization = 'Token token=' + data.token;
  };

  return {
    users: users,
    fetchUsers: fetchUsers,
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