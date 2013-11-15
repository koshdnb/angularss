angular.module('google.feed.api', [])
.factory('lookup',['$http',function($http) {
  return  {
    get : function(url, success, fail) {
      return $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/lookup?v=1.0&callback=JSON_CALLBACK&method=JSONP&q='+url).success(function(response) {
        
        return response;
      }).error(fail);
    }
  }
}])
.factory('approveFeed',['$http',function($http) {
  return  {
    get : function(url, success, fail) {
    return  $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=JSON_CALLBACK&method=JSONP&num=99&q='+url).success(function(response) {
        
        return response;
      }).error(fail);
    }
  }
}])
