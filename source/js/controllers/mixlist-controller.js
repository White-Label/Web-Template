angular.module('NoonPacific')
.controller('MixListCtrl', ['$scope', '$location', '$routeParams', 'mixService', 'audio',
  function($scope, $location, $routeParams, mixService, audio) {
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

    $scope.$on('$routeChangeSuccess', function() {
        mixService.GetAllPlaylists($routeParams.collection).then(function(mixtapes) {
            lazyLoad();
        });
    });
  }
]);
