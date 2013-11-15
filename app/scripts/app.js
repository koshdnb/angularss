angular.module('myRss',
  ['myRss.config',
   'myRss.directives',
   'myRss.homePages',
   'myRss.storage',
   'myRss.feedPages',
   'ngAnimate',
   'ngSanitize',
   'google.feed.api'])
    
  .controller('MainCtrl', function($scope, $rootScope) {
    $scope.path = function(value) {
      console.log(arguments);
      if(arguments.length == 1) {
        $rootScope._path = value;
      }
      return $rootScope._path || '/';  
    }
  });

