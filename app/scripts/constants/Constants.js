'use strict';
angular.module('phoneApp')
  .constant('_', window._)
  //.constant('ServerUrl', 'http://localhost:3000')
  .constant('ServerUrl', 'https://api.callmeishmael.com')
  .constant('AmazonBucket','https://callmeishmael-files-v2.s3.amazonaws.com/');
