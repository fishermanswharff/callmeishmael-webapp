'use strict';
function loginController($location, AuthFactory,trace){
  var vm = this;
  vm.login = function(credentials){
    AuthFactory.login(credentials).then(function(response){
      $location.path('/dashboard');
    });
  };
}
angular.module('MainController').controller('LoginController',loginController);
loginController.$inject = ['$location','AuthFactory','trace'];