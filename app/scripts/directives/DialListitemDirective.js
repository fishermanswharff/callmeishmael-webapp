'use strict';
angular.module('MainDirective').directive('cmiDialListitem', ['trace','$compile',function(trace, $compile){
  return {
    restrict: 'EA',
    scope: {
      button: '=',
    },
    compile: function(){
      return function($scope,elem,attrs){
        var buttonDetails, audio;
        $scope.$watch('button', function(newValue,oldValue){
          if(Object.keys(newValue).length === 0){}
          buttonDetails = elem.find('.button-story');
          audio = elem.find('.button-story .audio audio');
        });
      };
    },
  };
}]);