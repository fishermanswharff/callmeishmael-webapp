'use strict';
function navbarController(trace,$location,AuthFactory){
  var vm = this;

  vm.isLoggedIn = function(){
    return AuthFactory.isAuthenticated();
  }

  vm.logout = function(){
    AuthFactory.logout().then(function(response){
      $location.path('/login');
    });
  };
}
angular.module('MainController').controller('NavbarController',navbarController);
navbarController.$inject = ['trace','$location','AuthFactory'];