angular.module('np.services').service('mixService', ['$rootScope', '$location', '$q', 'api', 'MixCollection', 'TrackCollection',
  function($rootScope, $location, $q, api, MixCollection, TrackCollection) {
    var mixService = {
      Mixes: MixCollection,
      CurrentMixID: null,
      Tracks: TrackCollection,
      PlayingMixID: null,
      PlayingTrackID: null,
      PlayingTrack: null,
      wl: new WhiteLabel('***REMOVED***')
    }

    mixService.SelectMix = function(playlistID) {
      var deferred = $q.defer();
      var self = this;

      this.GetMix(playlistID)
      .then(function(mix) {
        self.CurrentMix = mix;
        self.CurrentMixID = mix.id;
        return self.GetMixTracks(mix.id);
      });

      return deferred.promise;
    }

    mixService.GetMix = function(mixID) {
      var deferred = $q.defer();
      var self = this;

      var mix = this.Mixes.get(mixID);
      if (mix) {
        deferred.resolve(mix);
      }

      var url = '/noon-pacific/playlists/current/'
      if (mixID) {
        this.CurrentMixID = mixID;
        url = '/noon-pacific/playlists/' + mixID + '/';
      }

      return api.get(url)
      .then(function(res) {
        self.Mixes.add(res.data);
        return self.Mixes.get(res.data.id);
      })

      return deferred.promise;
    }

    mixService.GetPlayingMix = function() {
      return this.Mixes.get(this.PlayingMixID);
    }

    mixService.GetMixTracks = function(mixID) {
      var deferred = $q.defer();
      var self = this;

      var mix = this.Mixes.get(mixID);
      if (!mix.Tracks) {
        api.get('/noon-pacific/playlists/' + mixID + '/tracks/?detail=true')
        .then(function(res) {
          self.Mixes.AddTracks(mixID, res.data);
          deferred.resolve(self.Mixes.get(mixID));
        }).then(function() {
          self.GetFirstTrack();
        });
      }
      else {
        deferred.resolve(mix);
      }

      return deferred.promise;
    }

    mixService.GetFirstTrack = function() {
      track = this.CurrentMix.Tracks.at(0);
      $rootScope.currentTrack = track;
      mixService.PlayingTrackID = track.track_id;
      $rootScope.play();
      return track;
    }

    mixService.MoveUpDownTrack = function(trackID, increment) {
      var deferred = $q.defer();
      var self = this;

      var track = this.GetPlayingMix().Tracks.MoveUpDownSong(trackID, increment);

      if (!track) {
        var mix = this.Mixes.MoveUpDownMix(this.PlayingMixID, increment*-1);
        self.GetMixTracks(mix.id)
        .then(function(mix) {
          deferred.resolve(mix.Tracks.at(0));
          self.CurrentMix = mix;
          self.CurrentMixID = mix.id;
        })
      }
      else {
        deferred.resolve(track);
      }

      return deferred.promise;
    }

    mixService.GetNextTrack = function(trackID) {
      return this.MoveUpDownTrack(trackID, 1);
    }

    mixService.GetPreviousTrack = function(trackID) {
      return this.MoveUpDownTrack(trackID, -1);
    }

    mixService.SetPlaying = function(mixID, track) {
      $rootScope.currentTrack = track;
      mixService.PlayingTrackID = track.track_id;
      mixService.PlayingMixID = mixID;
    }

    mixService.GetAllPlaylists = function() {
      var self = this;

      return this.wl.getCollectionMixtapes('weekly', {all: true, results: true})
        .then(function(mixtapes) {
          self.Mixes.addAll(mixtapes);
          $rootScope.$apply();
          return mixtapes;
        });
    }

    return mixService
  }
  ]);
