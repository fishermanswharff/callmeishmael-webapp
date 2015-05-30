'use strict';
angular.module('MainDirective').directive('ngConfirmClick',['trace','$window',function(trace,$window){
  return {
    restrict: 'A',
    replace: false,
    scope: '=',
    link: function($scope,element,attrs){

      var msg = attrs.ngConfirmClick || 'Are you sure?';
      var clickAction = attrs.confirmedClickAction;

      element.bind('click',function(e){
        if($window.confirm(msg)){
          $scope.$eval(clickAction);
        }
      })
    }
  }
}]);