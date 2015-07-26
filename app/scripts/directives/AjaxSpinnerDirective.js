'use strict';
angular.module('MainDirective').directive('ajaxSpinner',['trace','$http',function(trace,$http){
  return {
    restrict: 'A',
    link: function($scope,element,attrs){
      $scope.isLoading = function(){
        return $http.pendingRequests.length > 0;
      };

      $scope.$watch($scope.isLoading,function(v){
        v ? element.addClass('active').find('i.fa').addClass('fa-cog fa-spin') : element.removeClass('active').find('i.fa').removeClass('fa-cog fa-spin');
      });
    }
  };
}]);