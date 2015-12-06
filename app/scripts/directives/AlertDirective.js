'use strict';
angular.module('MainDirective').directive('cmiAlert',['$rootScope','trace',function($rootScope,trace){
  return {
    restrict: 'E',
    templateUrl: 'views/alert.html',
    link: function($scope,elem,attrs){
      $scope.dismissAlert = function(){
        var $alert = $('.alert');
        $alert.fadeOut(250,function(){
          $scope.alert = '';
        });
      };

      $scope.$on('alert',function(e,args){
        $scope.alert = args.alert;
        $scope.status = args.status;

        setTimeout(function(){
          $scope.dismissAlert();
        }, 10000);
      });
    },
  };
}]);
