angular.module('App')
.controller('MixListCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'GENERAL_CONFIG', 'mixService', 'audio',
  function($rootScope, $scope, $location, $routeParams, Config, mixService, audio) {
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

    $scope.ChangeMixtape = function(mix) {
        $rootScope.$broadcast('MixChanged', mix);
    }

    $scope.$on('$routeChangeSuccess', function() {
        mixService.GetAllPlaylists($routeParams.collection).then(function(mixtapes) {
            lazyLoad();
            $rootScope.$broadcast('AllPlaylists');
        });
    });
  }
]);
