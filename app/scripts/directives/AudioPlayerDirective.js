'use strict';
angular.module('MainDirective').directive('cmiAudioPlayer', ['$rootScope','trace', function($rootScope,trace){
  return {
    restrict: 'E',
    templateUrl: 'views/audio-player.html',
    scope: {
      url: '@'
    },
    link: function($scope,elem,attrs){
      var $audio = elem.find('audio');
      $scope.playing = false;
      $scope.toggleAudio = function(){
        $scope.playing === true ? $audio[0].pause() : $audio[0].play();
        $scope.playing = !$scope.playing;
      };
    },
  };
}]);