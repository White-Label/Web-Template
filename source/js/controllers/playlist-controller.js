angular.module('NoonPacific').controller('PlaylistCtrl',
  ['$rootScope', '$scope', '$location', '$q', '$routeParams', 'mixService', 'audio',
  function($rootScope, $scope, $location, $q, $routeParams, mixService, audio) {
    $scope.mixService = mixService;

    $scope.mixService.SelectMix($routeParams.mix).then(function(mix) {
        var track = $scope.mixService.getTrackFromSlug($routeParams.track);
        if (track) $scope.PlayTrack(track);
    });

    $scope.tweetSong = function(track) {
      var baseURL, hashtags, text, mention;
      if (track) {
        baseURL = "https://twitter.com/intent/tweet?";
        text = encodeURIComponent("♫ Listening to " + track.title + " by " + track.artist + " on @noonpacific. Check out noonpacific.com");
        hashtags = "newmusic";
        return baseURL + "text=" + text + "&hashtags=" + hashtags;
      }
    };

    $scope.tweetMix = function(mixService) {
      var baseURL, hashtags, text, mention;
      if (mixService.CurrentMix) {
        baseURL = "https://twitter.com/intent/tweet?";
        text = encodeURIComponent("♫ Listening to " + mixService.CurrentMix.title + " on @noonpacific. Check out noonpacific.com");
        hashtags = "goodmusic";
        return baseURL + "text=" + text + "&hashtags=" + hashtags;
      }
    };

    $scope.fbFeed = function(track) {
      var appID, baseURL, redirect, link, picture, caption, description;
      if (track && mixService.CurrentMix) {
        appID = "570788733024362"
        baseURL = "https://www.facebook.com/dialog/feed?";
        redirect = "http://www.noonpacific.com";
        link = "http://www.noonpacific.com";
        picture = encodeURIComponent(mixService.CurrentMix.artwork_url);
        caption = encodeURIComponent("♫ Listening to " + track.title + " by " + track.artist + " on @noonpacific");
        return baseURL + "app_id=" + appID + "&redirect_uri=" + redirect + "&link=" + link + "&picture=" + picture +"&caption=" + caption;
      }
    }

    $scope.fbFeedMix = function(mixService) {
      var appID, baseURL, redirect, link, picture, caption, description;
      if (mixService && mixService.CurrentMix) {
        appID = "570788733024362"
        baseURL = "https://www.facebook.com/dialog/feed?";
        redirect = "http://www.noonpacific.com";
        link = "http://www.noonpacific.com";
        picture = encodeURIComponent(mixService.CurrentMix.artwork_url);
        caption = encodeURIComponent("Listening to " + mixService.CurrentMix.title + " on Noon Pacific.");
        return baseURL + "app_id=" + appID + "&redirect_uri=" + redirect + "&link=" + link + "&picture=" + picture +"&caption=" + caption;
      }
    }

    $scope.amazonURL = function(track) {
    var baseUrl, searchStr;
    if (track) {
      searchStr = encodeURIComponent(track.artist + " " + track.title);
      baseUrl = "https://www.amazon.com/s/?_encoding=UTF8&camp=1789&creative=390957&linkCode=ur2&tag=noonpaci-20&url=search-alias%3Ddigital-music&field-keywords=";
      return baseUrl + searchStr;
    }
    };

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
  }
]);
