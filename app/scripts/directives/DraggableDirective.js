'use strict';
angular.module('MainDirective').directive('cmiDraggable',['$rootScope','trace',function($rootScope,trace){
  return {
    restrict: 'EA',
    compile: function(){
      return function($scope,elem,attrs){
        $(elem).draggable({
          cursor: 'pointer',
          revert: 'invalid',
          drag: function(e,ui){},
          start: function(e,ui){},
          stop: function(e,ui){},
        });
        if($scope.$last){
          $scope.$emit('onRepeatDone',{ e: elem, a: attrs});
        }
      };
    },
  };
}]);