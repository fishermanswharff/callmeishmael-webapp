'use strict';
angular.module('MainDirective').directive('cmiPhoneDashboard',['PhoneFactory','trace',function(PhoneFactory,trace){
  return {
    restrict: 'E',
    templateUrl: 'views/phone-dashboard.html',
    controller: 'DashboardController',
    controllerAs: 'dashboardController',
    bindToController: true,
    link: function($scope,element,attrs){}
  };
}]);