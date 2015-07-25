'use strict';
angular.module('MainDirective').directive('cmiAudioPlayer', ['$rootScope','trace', function($rootScope,trace){
  return {
    restrict: 'E',
    templateUrl: 'views/audio-player.html',
    scope: {
      url: '@'
    },
    compile: function(){
      return function($scope,elem,attrs){
        var $audio = elem.find('audio');
        $scope.toggleAudio = function(){
          if($scope.playing === true){
            $audio[0].pause();
          } else {
            $audio[0].play();
          }
          $scope.playing = !$scope.playing
        };
      };
    },
  };
}]);