angular.module('NoonPacific')
.controller('MixListCtrl', ['$scope', '$location', 'mixService', 'audio',
  function($scope, $location, mixService, audio) {
    $scope.audio = audio;
    $scope.MixList = null;
    $scope.Mix = mixService;

    $scope.playing = function() {
      if(audio.state == "stopped") {
        return true;
      } else {
        return false;
      }
    };

    mixService.GetAllPlaylists();
  }
]);