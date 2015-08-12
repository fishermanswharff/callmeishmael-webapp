'use strict';
angular.module('MainController').controller('UserController',userController);
userController.$inject = ['$rootScope','$scope','AuthFactory','trace'];
function userController($rootScope,$scope,AuthFactory,trace){
  var vm = this;

  vm.users = AuthFactory.users;

  vm.updateUser = function(user){
    user.id = vm.currentUser.id;
    AuthFactory.updateUser(user).then(function(response){
      getCurrentUser();
    });
    vm.user = {};
  };

  vm.deleteUser = function(id){
    AuthFactory.deleteUser(id).then(function(response){
      AuthFactory.fetchUsers();
    });
  };

  var getCurrentUser = function(){
    vm.currentUser = AuthFactory.currentUser();
  };

  getCurrentUser();
}