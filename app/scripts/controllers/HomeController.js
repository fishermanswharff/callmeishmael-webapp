'use strict';
angular.module('MainController').controller('HomeController',['trace',function(trace){
  var scene = document.getElementById('scene');
  var parallax = new Parallax(scene);
}]);