'use strict';
angular.module('MainDirective').directive('cmiDraggable',['$rootScope','trace',function($rootScope,trace){

  var oWidth, oHeight;

  return {
    restrict: 'EA',
    compile: function(){
      return function($scope,elem,attrs){

        $scope.$on('onRepeatDone',function(e,a){
          oWidth = $('.cmi-draggable').width();
          oHeight = $('.cmi-draggable').height();
        });

        $(elem).draggable({
          cursor: 'pointer',
          revert: 'invalid',
          drag: function(e,ui){},
          start: function(e,ui){
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