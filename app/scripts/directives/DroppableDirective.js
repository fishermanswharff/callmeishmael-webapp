'use strict';
angular.module('MainDirective').directive('cmiDroppable',['$rootScope','trace',function($rootScope,trace){
  return {
    restrict: 'EA',
    link: function($scope,elem,attrs){
      $(elem).droppable({
        drop: function(event,ui) {
          var dragIndex = angular.element(ui.draggable).data('index'),
              dragEl = angular.element(ui.draggable).parent(),
              dropEl = angular.element(this),
              targetX = $(ui.draggable).offset().left - $(this).offset().left,
              targetY = $(ui.draggable).offset().top - $(this).offset().top,
              left = parseInt($(ui.draggable).css('left')) - targetX,
              top = parseInt($(ui.draggable).css('top')) - targetY,
              targetW = parseInt($(this).css('width')),
              targetH = parseInt($(this).css('height'));

          $(ui.draggable).animate({
            width: targetW,
            height: targetH,
            top: top,
            left: left,
          }, 500, function(){
            $(this).fadeOut(400, function(){
              $(this).remove();
            });
          });
          $rootScope.$broadcast('droppedElement', {
            dragObj: $scope.$parent.phoneController.availableStories[dragIndex],
            dropObj: $scope.obj
          });
          // $scope.$apply();
        },
        hoverClass: 'cmi-droppable-hover',
      });
    },
  };
}]);