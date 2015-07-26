'use strict';
angular.module('MainDirective').directive('ajaxSpinner',['trace','$http',function(trace,$http){
  return {
    restrict: 'A',
    link: function($scope,element,attrs){
      $scope.isLoading = function(){
        return $http.pendingRequests.length > 0;
      };

      $scope.$watch($scope.isLoading,function(v){
        if(v){
          element.addClass('active').find('i.fa').addClass('fa-cog fa-spin');
          $('html, body').addClass('ajax-progress');
        } else {
          element.removeClass('active').find('i.fa').removeClass('fa-cog fa-spin');
          $('html, body').removeClass('ajax-progress');
        }
      });
    }
  };
}]);