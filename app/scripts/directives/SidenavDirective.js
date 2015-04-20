'use strict';
angular.module('MainDirective').directive('sidenav', ['trace',function(trace){
  return {
    restrict: 'E',
    templateUrl: 'views/sidenav.html',
    controller: 'SidenavController',
    controllerAs: 'sidenavController',
    bindToController: true,
    link: function($scope,element,attrs){
      trace('from sidenav directive: ', $scope,element,attrs);
    }
  };
}]);