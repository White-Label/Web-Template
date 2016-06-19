angular.module('App')
.controller('AudioCtrl', ['$rootScope', '$scope', '$document', 'audio',
  function($rootScope, $scope, $document, audio) {
    $scope.audio = audio;
    $scope.muteActive = false;


    $scope.playing = function() {
      if($rootScope.currentTrack) {
        return true;
      } else {
        return false;
      }
    };

    $scope.PlayPauseClick = function() {
      audio.TogglePlayState();
    };

    $scope.toggleMute = function() {
      $scope.muteActive = !$scope.muteActive;
      audio.ToggleMute();
    };

    $scope.volumeSlider = angular.element('.vslider');
    $scope.volumeSlider.slider('setValue', '100');
    $scope.volumeSlider.on('slide', function(ui) {
      var level = ui.value*10;
      $rootScope.volume = level;
      audio.SetVolume(level);
    });

    $document.bind('keypress', function(e) {
      if(e.keyCode == 32) {
        $scope.$apply(function() {
          audio.TogglePlayState();
        });
        e.preventDefault();
      }
    });
  }
]);
