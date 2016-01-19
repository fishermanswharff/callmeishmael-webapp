'use strict';
angular.module('MainDirective').directive('cmiDroppable',['$rootScope','trace',function($rootScope,trace){
  return {
    restrict: 'EA',
    scope: {
      button: '='
    },
    compile: function(){
      return function($scope,elem,attrs){
        setTimeout(function(){
          $(elem).droppable({
            drop: function(event,ui) {
              var newStory,
                  dragId = angular.element(ui.draggable).data('uid'),
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
              }, 100, function(){
                $(this).fadeOut(400, function(){
                  $(this).remove();
                });
              });
              ui.helper.dropped = true;
              newStory = $scope.$parent.phoneController.availableStories.filter(function(value,index,array){
                if(value.id === dragId){
                  return value;
                }
              })[0];
              if(newStory === undefined){
                newStory = $scope.$parent.phoneController.availableFixedStories.filter(function(value,index,array){
                  if(value.id === dragId){
                    return value;
                  }
                })[0];
              }
              $rootScope.$broadcast('droppedElement', {
                dragObj: newStory,
                dropObj: $scope.button
              });
              $scope.$apply();
            },
            hoverClass: 'cmi-droppable-hover',
            revert: 'invalid',
            disabled: $(elem).hasClass('nonEditable')
          });
        }, 1000);
      };
    }
  };
}]);
