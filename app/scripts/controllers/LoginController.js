'use strict';
function loginController($location,AuthFactory,trace){
  var vm = this;

  vm.login = function(credentials){
    AuthFactory.login(credentials).then(function(response){
      $location.path('/dashboard');
    });
  };

  vm.confirm = function(credentials){
    var userParams = $location.search();
    var user = {
      id: userParams.userId,
      email: userParams.userEmail,
      password: credentials.password,
      password_confirmation: credentials.password_confirmation,
      confirmed: true
    }
    AuthFactory.updateUser(user).then(function(response){
      trace('response from updateUser: ', response);
      $location.url('/login');
    });
  };

}
angular.module('MainController').controller('LoginController',loginController);
loginController.$inject = ['$location','AuthFactory','trace'];