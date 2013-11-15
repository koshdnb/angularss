angular.module('myRss.config', ['ngRoute'])

  .constant('CACHE_VERSION', 1)

  .constant('PARTIALS_PATH', '/templates')

  .run(function($rootScope, PARTIALS_PATH) {
    $rootScope.partial = function(path) {
    	console.log(path);
      return PARTIALS_PATH+ path;
    };
  });


