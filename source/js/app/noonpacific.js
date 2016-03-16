var NoonPacific = angular.module('NoonPacific', ['ngRoute', 'np.services']);

NoonPacific.config(['$routeProvider', '$httpProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      controller: 'PlaylistCtrl',
      templateUrl: '/views/playlist.html',
    })
    .when('/mix/:mixID', {
      controller: 'PlaylistCtrl',
      templateUrl: '/views/playlist.html'
    });
  }
  ]);

NoonPacific.run(['$rootScope', 'audio', function($rootScope, audio) {
  $rootScope.currentTrack = null;
  $rootScope.fresh = true;
  $rootScope.volume = 100;

  $rootScope.play = function() {
    if(!$rootScope.fresh) {
      audio.PlaySong($rootScope.currentTrack);
    } else {
      $rootScope.fresh = false;
    }
  };
}]);

function NoonPacific($scope, $location, $window) {
  $scope.$on('$viewContentLoaded', function(event) {
    $window.ga('send', 'pageview', { page: $location.url() });
  });
}

// Social dropdown for tracklist
$(function() {
  $('body').on('click', '.dropdown-text', function(e) {
    $(this).next('.dropdown-content').toggle();
  });
  $('body').on('click', function(e) {
    // if e does not have any parents with class dropdown
    if(!$(e.target).parents('.dropdown').length) {
      $('.dropdown-content').hide();
    }
  });
});

