'use strict';
angular.module('MainDirective').directive('cmiDraggable',['$rootScope','trace',function($rootScope,trace){

  var oWidth, oHeight;

  return {
    restrict: 'EA',
    compile: function(){
      return function($scope,elem,attrs){

        var oWidth, oHeight;

        $scope.$on('onRepeatDone',function(e,a){
          // do something now that repeat is done rendering
        });

        $(elem).draggable({
          cursor: 'pointer',
          revert: 'invalid',
          drag: function(e,ui){},
          start: function(e,ui){
            oWidth = $(this).width();
            oHeight = $(this).height();
            $(this).animate({
              width: $('.droppable').first().css('width'),
              height: $('.droppable').first().css('height')
            });
            ui.helper.dropped = false;
          },
          stop: function(e,ui){
            if(ui.helper.dropped === false){
              $(this).animate({
                width: oWidth,
                height: oHeight
              });
            }
          },
        });
        if($scope.$last){
          $scope.$emit('onRepeatDone',{ e: elem, a: attrs});
        }
      };
    },
  };
}]);