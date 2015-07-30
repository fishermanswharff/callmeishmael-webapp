'use strict'
angular.module('MainDirective').directive('sticky', ['$rootScope','$window','trace',function($rootScope,$window,trace){
  return {
    restrict: 'EA',
    link: function($scope,element,attrs){
      angular.element($window).bind('scroll',function(){
        var scrollTop = $window.pageYOffset,
            elementOffset = $(element).offset().top,
            parentOffset = $(element).parent().offset().top,
            distance = (elementOffset - scrollTop),
            parentDistance = (parentOffset - scrollTop),
            initialWidth = element.width();

        if(distance <= 0){
          $(element).addClass('sticky');
          element.width(initialWidth);
        }

        if(parentDistance > 0) {
          $(element).removeClass('sticky');
          element.width('');
        }
      })
    },
  };
}]);