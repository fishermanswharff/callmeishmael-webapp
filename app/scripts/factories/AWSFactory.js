'use strict';
angular.module('phoneApp').factory('AWSFactory',['$http','$q','$rootScope','ServerUrl','AmazonBucket','trace',function($http,$q,$rootScope,ServerUrl,AmazonBucket,trace){

  var fetchKey = function(file){
    var paramString = '?filename=' + file.name + '&filetype=' + file.type;
    return $q(function(resolve,reject){
      $http.get(ServerUrl + '/amazon/sign_key' + paramString).success(function(response, status, headers, config){
        return resolve(response);
      }).error(function(response, status, headers, config){
        return reject(response,status,headers.config);
      });
    });
  };

  var sendToAmazon = function(file){
    return fetchKey(file).then(function(response){
      $http.post(AmazonBucket, buildFormData(file,response),{
        transformRequest: angular.identity,
        headers: { 'Content-Type': undefined, 'Authorization': '' }
      }).success(function(response, status, headers, config){
        $rootScope.awsResponse = { response: response, status: status, headers: headers, config: config };
        return { response: response, status: status, headers: headers, config: config };
      }).error(function(response, status, headers, config){
        $rootScope.$broadcast('alert',{ alert: 'There was an error: ' + "\nResponse: " + response + "\nStatus: " + status, status: status });
        return { response: response, status: status, headers: headers, config: config };
      });
    })
  };

  var buildFormData = function(file,signkey){
    var formData = new FormData();
    formData.append('key',signkey.key);
    formData.append('AWSAccessKeyId',signkey.access_key);
    formData.append('policy',signkey.policy);
    formData.append('acl','public-read');
    formData.append('signature',signkey.signature);
    formData.append('Content-Type',file.type);
    formData.append('file', file);
    return formData;
  };

  return {
    sendToAmazon: sendToAmazon
  }
}]);