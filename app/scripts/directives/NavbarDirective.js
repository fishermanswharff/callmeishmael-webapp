'use strict';
angular.module('MainDirective').directive('navbar',['trace',function(trace){
  return {
    restrict: 'E',
    templateUrl: 'views/navbar.html',
    controller: 'NavbarController',
    controllerAs: 'navbarController',
    bindToController: true,
    link: function($scope,element,attrs){
      trace($scope,element,attrs);
    }
  };
}]);