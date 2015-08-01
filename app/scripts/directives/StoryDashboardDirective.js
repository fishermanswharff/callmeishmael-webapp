'use strict';
angular.module('MainDirective').directive('cmiStoryDashboard',['trace',function(trace){
  return {
    restrict: 'E',
    templateUrl: 'views/story-dashboard.html',
    controller: 'DashboardController',
    controllerAs: 'dashboardController',
    bindToController: true,
    link: function($scope,element,attrs){



      var typeSelect = angular.element.find('#storyStatusSelect')[0];
      $(typeSelect).on('change',function(){
        if(this.value === 'Venue') 
      });
    }
  };
}]);