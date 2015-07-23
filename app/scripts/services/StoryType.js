'use strict';
angular.module('phoneApp').service('storyTypes',function(trace){
  return function(){
    return ['Fixed','Venue','Surprise','Ishmael’s'];
  };
});