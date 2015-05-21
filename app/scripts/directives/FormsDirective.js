'use strict';
angular.module('MainDirective').directive('cmiFormsDashboard',['trace',function(trace){
  return {
    restrict: 'E',
    templateUrl: 'views/forms-dashboard.html',
    controller: 'FormsController',
    controllerAs: 'formsController',
    bindToController: true,
    link: function($scope, elements, attrs){

    }
  }
}]);