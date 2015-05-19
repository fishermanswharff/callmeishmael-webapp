'use strict';
angular.module('MainController').controller('HomeController',homeController);
homeController.$inject = ['trace','$location','AuthFactory'];
function homeController(trace,$location,AuthFactory){

  var vm = this;

  var scene = document.getElementById('scene');
  var parallax = new Parallax(scene);

  vm.login = function(credentials){
    AuthFactory.login(credentials).then(function(response){
      $location.path('/dashboard');
    });
  };
};