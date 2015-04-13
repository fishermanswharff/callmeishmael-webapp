'use strict';
angular.module('phoneApp').service('trace',function(){
  return function trace(){
    for(var i = 0; i < arguments.length; i++){
      console.log(arguments[i]);
    }
  };
});