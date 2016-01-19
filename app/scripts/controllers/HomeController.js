'use strict';
function homeController(trace,$location,AuthFactory){
  var vm = this;

  var scene = document.getElementById('scene');
  var parallax = new Parallax(scene);
}

angular.module('MainController').controller('HomeController',homeController);
homeController.$inject = ['trace','$location','AuthFactory'];
