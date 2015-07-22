'use strict';
angular.module('MainDirective').directive('cmiDialListitem', ['trace',function(trace){
  return {
    restrict: 'EA',
    compile: function(){
      return function($scope,elem,attrs){
        var details = elem.find('.button-story');
        trace(elem, details);
        elem.on('click','span.button-assignment', function(e){
          $(details).toggleClass('active');
        });
      }
    },
  }
}]);