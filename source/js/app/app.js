
var App = angular.module('App', ['ngRoute', 'app.config', 'app.services']);

App.config(['$routeProvider', '$locationProvider', '$httpProvider', 'GENERAL_CONFIG',
  function($routeProvider, $locationProvider, $httpProvider, Config) {
    $routeProvider
    .when('/', {
      controller: 'PlaylistCtrl',
      templateUrl: '/views/playlist.html',
    })
    .when('/:collection', {
      controller: 'PlaylistCtrl',
      templateUrl: '/views/playlist.html'
    }).when('/:collection/:mix', {
      controller: 'PlaylistCtrl',
      templateUrl: '/views/playlist.html'
    }).when('/:collection/:mix/:track', {
      controller: 'PlaylistCtrl',
      templateUrl: '/views/playlist.html'
    });
    $locationProvider.html5Mode(Config.HTML_5_MODE);
  }
]);

App.run(['$rootScope', '$route', '$location', 'audio', function($rootScope, $route, $location, audio) {
  $rootScope.currentTrack = null;
  $rootScope.fresh = true;
  $rootScope.volume = 100;

  // Little trick to add option to prevent reload on path change
  // http://joelsaupe.com/programming/angularjs-change-path-without-reloading/
  var original = $location.path;
  $location.path = function (path, reload) {
    if (reload === undefined) reload = true;
    if (reload === false) {
      var lastRoute = $route.current;
      var un = $rootScope.$on('$locationChangeSuccess', function () {
        $route.current = lastRoute;
        un();
      });
    }
    return original.apply($location, [path]);
  };

  $rootScope.play = function() {
    if(!$rootScope.fresh) {
      audio.PlaySong($rootScope.currentTrack);
    } else {
      $rootScope.fresh = false;
    }
  };
}]);

function App($scope, $location, $window) {
  $scope.$on('$viewContentLoaded', function(event) {
    $window.ga('send', 'pageview', { page: $location.url() });
  });
}
