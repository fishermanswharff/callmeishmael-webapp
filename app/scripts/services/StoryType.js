'use strict';
angular.module('phoneApp').service('storyTypes',function(){
  return function(){
    return ['Fixed','Venue','Surprise','Ishmael’s'];
  };
});