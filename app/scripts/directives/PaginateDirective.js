'use strict';
angular.module('MainDirective').directive('paginate',['$rootScope','$window','trace',function($rootScope,$window,trace){
  return {
    restrict: 'EA',
    link: function($scope,element,attrs,controller,transcludeFn){
      var elH = element.height(),
          winH = $window.innerHeight;

      $scope.$on('onRepeatDone',function(e,args){
        $scope.totalChildren = element.children().length;
      });

      $scope.$watch('totalChildren',function(newValue,oldValue){
        if(newValue > attrs.maxItems){
          var numPages = Math.ceil($scope.totalChildren/attrs.maxItems),
              pageList = element.find('.pagination'),
              items = '';

          for(var i = 1; i <= numPages; i++){
            items += '<li><a data-page=' + i.toString() + '>' + i.toString() + '</a></li>';
          }
          $(pageList).html(items);

          if($(element[0].parentElement).height() > winH){
            element.height(winH);
            pageList.addClass('fixed');
          }
        }
      });
    },
    controller: function($scope,$element){
      // do stuff
    }
  };
}]);
