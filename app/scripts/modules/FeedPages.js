angular.module('myRss.feedPages', ['ngRoute', 'myRss.config','google.feed.api'])

  .constant('FEED_STORAGE_KEY', 'feeds')

  .run(function($rootScope, appStorage, $routeParams, FEED_STORAGE_KEY, $filter) {
    $rootScope.routeParams = $routeParams;
    $rootScope.feeds = appStorage(FEED_STORAGE_KEY) || [];
    test=$rootScope.feeds;
    $rootScope.hasFeeds = function() {
      return $filter('clearEmpty')($rootScope.feeds).length > 0;
    };
  })

  .config(function($routeProvider, $locationProvider, PARTIALS_PATH) {
    $routeProvider
      .when('/feeds', {
        templateUrl : PARTIALS_PATH + '/feeds/main.html',
        controller : 'FeedIndexCtrl'
      })
      .when('/feeds/new', {
        templateUrl : PARTIALS_PATH + '/feeds/form.html',
        controller : 'FeedFormCtrl'
      })     
      .when('/feeds/:feed_id', {
        templateUrl : PARTIALS_PATH + '/feeds/show.html',
        controller : 'FeedShowCtrl'
      })
       .when('/feeds/:feed_id/item/:article_id', {
        templateUrl : PARTIALS_PATH + '/feeds/article.html',
        controller : 'FeedArticleCtrl'
      });
     
  })

  .controller('FeedIndexCtrl', function($scope, $routeParams, $rootScope) {
    $scope.feeds = $rootScope.feeds;
  })

  .controller('FeedShowCtrl', function($scope, $rootScope, $routeParams, $location, appStorage, FEED_STORAGE_KEY) {
    var feedID = $routeParams.feed_id;
    $scope.feed = $scope.feeds[feedID];

    if(!$scope.feed) {
      $location.path('/');
      return;
    }

    $scope.destroy = function() {
      delete $rootScope.feeds[$scope.feed.id];
      appStorage(FEED_STORAGE_KEY, $rootScope.feeds);
      $location.path('/');
    }
  })
.controller('FeedArticleCtrl', function($scope, $rootScope, $routeParams, $location, appStorage, FEED_STORAGE_KEY) {
  console.log('here');
    var feedID = $routeParams.feed_id;
    var articleID = $routeParams.article_id;
    $scope.feed = $scope.feeds[feedID];
    $scope.article = $scope.feeds[feedID].entries[articleID];
    console.log($scope);
    if(!$scope.feed) {
      $location.path('/');
      return;
    }

    
})
  .controller('FeedEntriesFormCtrl', function($scope, $location, $rootScope, appStorage, paddResults, trimTrailing) {
    if(!$scope.feed) return;
    
    var feedID = $scope.feed.id;
    

    $scope.changed = false;

  })

  .controller('FeedFormCtrl', function($scope, $routeParams, $location, $rootScope, appStorage, FEED_STORAGE_KEY,lookup, approveFeed) {
    var id = $routeParams.feed_id;
    if(id >= 0) {
      $scope.feed = $rootScope.feeds[id];
      if(!$scope.feed) {
        $location.path('/');
        return;
      }
    }
    else {
      $scope.feed = {}; //new feed
      $scope.newFeed = true;
    }

    $scope.addFeed = function() {
      

      var id = $scope.feed.id >= 0 ?
          $scope.feed.id :
          $scope.feeds.length;  
  
        approveFeed.get($scope.feed.url).success(function(response){
          $scope.feed = response.responseData.feed;
          $rootScope.feeds[id]=$scope.feed;
          
          console.log($rootScope.feeds);
           appStorage(FEED_STORAGE_KEY, $rootScope.feeds);
           $scope.$destroy();
           $location.path('/feeds/' + id);
        });
    
    };
    
    $scope.searchFeed = function() {
        $scope.urlT ? lookup.get($scope.urlT).success(function(response){
          $scope.feed.url=response.responseData.url;
          $scope.urlT = '';
        }): null;
    }
  })

  .factory('trimTrailing', function() {
    return function(records, check) {
      var emptyIndex = null;
      angular.forEach(records, function(record, index) {
        if(!check(record)) {
          emptyIndex = emptyIndex || index;
        }
        else {
          emptyIndex = null;
        }
      });
      return records.slice(0, emptyIndex || records.length);
    }
  })

  .factory('paddResults', function() {
    return function(min, padding, data, former) {
      data = data || [];
      var total = Math.max(min, (data.length || 0) + padding);
      for(var i=0;i<total;i++) {
        former[i] = data[i] || {};
      }
      return former;
    };
  })

  .filter('clearEmpty', function() {
    return function(arr) {
      var array = [];
      angular.forEach(arr, function(a) {
        a.id = a.id ? a.id:(array.length) ;
        a && a.title.length && array.push(a);
      });
      return array;
    }
  });
