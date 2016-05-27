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

    var lazyLoad = function() {
        $("img.lazy").lazyload({
            threshold : 100,
            effect : "fadeIn",
        });
    }

    mixService.GetAllPlaylists().then(function(mixtapes) {
        lazyLoad();
    });
  }
]);
