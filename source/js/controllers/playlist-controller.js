angular.module('App').controller('PlaylistCtrl',
  ['$rootScope', '$scope', '$location', '$q', '$routeParams', 'mixService', 'audio',
  function($rootScope, $scope, $location, $q, $routeParams, mixService, audio) {
    $scope.mixService = mixService;

    var selectMix = function(mixSlug, trackSlug) {
        $scope.mixService.SelectMix(mixSlug).then(function(mix) {
            var track = $scope.mixService.getTrackFromSlug(trackSlug);
            if (track) $scope.PlayTrack(track);
        });
    }
    $rootScope.$on('AllPlaylists', function(event) {
        selectMix($routeParams.mix, $routeParams.track);
    });

    $rootScope.$on('MixChanged', function(event, mix) {
      selectMix(mix.slug)
    });

    $scope.PlayTrack = function(song) {
      // dont want it to restart the song if you click it again
      if($rootScope.currentTrack) {
        if($rootScope.currentTrack !== song || audio.state === 'stopped') {
          audio.PlaySong(song);
        }
      } else {
        audio.PlaySong(song);
      }
    }

    $scope.PlayPauseClick = function() {
      audio.TogglePlayState();
    };

    $scope.Shuffle = function(shouldShuffle) {
        $scope.mixService.Shuffle = shouldShuffle;
    }
  }
]);
