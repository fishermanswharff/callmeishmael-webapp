'use strict';
angular.module('MainDirective').directive('cmiAudioPlayer', ['$rootScope','trace', function($rootScope,trace){
  return {
    restrict: 'E',
    template: "<button class='play' ng-hide='playing' ng-click='toggleAudio()'><svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 42 42' enable-background='new 0 0 42 42' xml:space='preserve'><path id='PLAY_2_' fill-rule='evenodd' clip-rule='evenodd' d='M39.4,21c0,1.4-0.8,2.7-1.9,3.4l0,0l-28.8,17c0,0,0,0,0,0l0,0l0,0 C8,41.8,7.3,42,6.6,42c-2.2,0-3.9-1.8-3.9-3.9l0,0V3.9l0,0C2.6,1.8,4.4,0,6.6,0c0.7,0,1.4,0.2,2,0.5l0,0l0,0c0,0,0,0,0,0l28.8,17 l0,0C38.6,18.3,39.4,19.6,39.4,21z'></path></svg></button>"+
              "<button class='pause' ng-show='playing' ng-click='toggleAudio()'><svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 42 42' enable-background='new 0 0 42 42' xml:space='preserve'><path id='PAUSE_2_' fill-rule='evenodd' clip-rule='evenodd' d='M30.5,41.6c-2.6,0-4.8-2.1-4.8-4.8V5.1c0-2.6,2.1-4.8,4.8-4.8 s4.8,2.1,4.8,4.8v31.8C35.3,39.5,33.2,41.6,30.5,41.6z M11.5,41.6c-2.6,0-4.8-2.1-4.8-4.8V5.1c0-2.6,2.1-4.8,4.8-4.8 c2.6,0,4.8,2.1,4.8,4.8v31.8C16.2,39.5,14.1,41.6,11.5,41.6z'></path></svg></button>" +
              '<audio ng-src="{{url}}">' +
                '<p>Your browser does not support the <code>audio</code> element </p>' +
              '</audio>',
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