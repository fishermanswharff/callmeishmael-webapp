'use strict';
angular.module('phoneApp').filter('reverse',function(){
  return function(items) {
    if(typeof items === 'undefined') return;
    return items.slice().reverse();
  };
});