'use strict';
angular.module('MainDirective').directive('cmiStoryDashboard',['trace','$rootScope',function(trace,$rootScope){
  return {
    restrict: 'E',
    templateUrl: 'views/story-dashboard.html',
    controller: 'DashboardController',
    controllerAs: 'dashboardController',
    bindToController: true,
    link: function($scope,element,attrs){
      var $typeSelect = $('#storyStatusSelect'),
          $venueSelect = $('#storyVenueField');

      $venueSelect.hide();
      $typeSelect.on('change',function(e){
        if(this.value.replace(/\s/, '') === 'venue') {
          $venueSelect.show();
        } else {
          $venueSelect.hide().val('');
        }
      });

      $scope.editStory = function(object){
        $rootScope.$broadcast('editStory', { story: object });
      };
    }
  };
}]);