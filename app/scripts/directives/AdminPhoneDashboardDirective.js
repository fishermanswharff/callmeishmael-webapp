'use strict';
angular.module('MainDirective').directive('cmiAdminPhoneDashboard',['PhoneFactory','trace',function(PhoneFactory,trace){
  return {
    restrict: 'E',
    templateUrl: 'views/admin-phone-dashboard.html',
    controller: 'DashboardController',
    controllerAs: 'dashboardController',
    bindToController: true,
    link: function($scope,element,attrs){}
  };
}]);