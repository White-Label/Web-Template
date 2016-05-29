angular.module('np.services').service('audio', ['$http', '$rootScope', 'mixService',
  function($http, $rootScope, mixService) {

    var constant = {
      STOPPED: 'stopped',
      PLAYING: 'playing'
    }
    var currentTrack = null;

    var Audio = {
      state: constant.STOPPED
    };

    soundManager.setup({
      useConsole: false,
      debugMode: false,
      defaultOptions: {
        onplay: handlePlay,
        onpause: handlePause,
        onresume: handlePlay,
        onload: handleLoad,
        onfinish: handleFinish,
        whileplaying: progress
      }
    });

    function progress() {
      $("#progress").css('width', ((this.position/this.duration) * 100) + '%');
    }

    function handlePlay() {
      Audio.state = constant.PLAYING;
    }
    function handlePause() {
      Audio.state = constant.STOPPED;
    }
    function handleLoad(success) {
      if (!success) {
        // error loading move to next song
        Audio.PlayNextSong();
      }
    }
    function handleFinish() {
      Audio.PlayNextSong();
    }

    Audio.TogglePlayState = function() {
      if (!currentTrack) {
        this.PlaySong();
        return;
      }

      if (currentTrack.paused) {
        currentTrack.resume();
      }
      else {
        currentTrack.pause();
      }
    }

    Audio.PlaySong = function(song) {
      if (!song) {
        song = mixService.GetFirstTrack();
      }

      if (currentTrack) {
        currentTrack.destruct();
      }

      var url = song.stream_url + '?client_id=***REMOVED***';
      currentTrack = soundManager.createSound({
        id: song.id,
        url: url,
        consumer_key: '***REMOVED***',
        whileplaying: progress
      });
      soundManager.setVolume(currentTrack.id, $rootScope.volume);
      mixService.SetPlaying(mixService.CurrentMix.id, song);
      currentTrack.play();
      $('.play-mix-button').toggle();
    }

    Audio.PlayNextSong = function() {
      var self = this;

      mixService.GetNextTrack(currentTrack.id)
      .then(function(track) {
        self.PlaySong(track);
      });
    }

    Audio.PlayPreviousSong = function() {
      var self = this;

      mixService.GetPreviousTrack(currentTrack.id)
      .then(function(track) {
        self.PlaySong(track);
      });
    }

    Audio.SetVolume = function(value) {
      soundManager.setVolume(currentTrack.id, value);
    }

    Audio.ToggleMute = function() {
      soundManager.toggleMute(currentTrack.id);
    }

    return Audio;
  }
  ]);
