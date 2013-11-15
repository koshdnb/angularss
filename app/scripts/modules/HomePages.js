angular.module('myRss.homePages', ['ngRoute', 'myRss.config'])
  .config(function($routeProvider,$locationProvider, PARTIALS_PATH) {
    $routeProvider
      .when('/', {
        redirectTo : '/feeds'
      })
      
      $locationProvider.html5Mode(true);
      $locationProvider.hashPrefix("!");

  })
