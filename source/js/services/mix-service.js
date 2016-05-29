angular.module('np.services').service('mixService', ['$rootScope', '$location', '$q', 'MixCollection', 'TrackCollection',
  function($rootScope, $location, $q, MixCollection, TrackCollection) {
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
        return self.GetMixTracks(mix);
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

      // TODO
      if (!mixID) {
        mixID = 287;
      }

      return this.wl.getMixtape(mixID).then(function(mixtape) {
        self.Mixes.add(mixtape);
        return self.Mixes.get(mixtape.id);
      });

      return deferred.promise;
    }

    mixService.GetPlayingMix = function() {
      return this.Mixes.get(this.PlayingMixID);
    }

    mixService.GetMixTracks = function(mix) {
      var deferred = $q.defer();
      var self = this;

      var mix = this.Mixes.get(mix.id);
      if (!mix.Tracks) {
        var slug = mix.slug;

        // TODO
        if (mix.id > 251) slug = 251;

        this.wl.getMixtapeTracks(slug, {results: true}).then(function(tracks) {
          self.Mixes.AddTracks(mix.id, tracks);
          deferred.resolve(self.Mixes.get(mix.id));
        }).then(function() {
          self.GetFirstTrack();
        });
      } else {
        deferred.resolve(mix);
      }

      return deferred.promise;
    }

    mixService.GetFirstTrack = function() {
      track = this.CurrentMix.Tracks.at(0);
      $rootScope.currentTrack = track;
      mixService.PlayingTrackID = track.id;
      $rootScope.play();
      return track;
    }

    mixService.MoveUpDownTrack = function(trackID, increment) {
      var deferred = $q.defer();
      var self = this;

      var track = this.GetPlayingMix().Tracks.MoveUpDownSong(trackID, increment);

      if (!track) {
        var mix = this.Mixes.MoveUpDownMix(this.PlayingMixID, increment*-1);
        self.GetMixTracks(mix)
        .then(function(mix) {
          self.CurrentMix = mix;
          self.CurrentMixID = mix.id;
          deferred.resolve(mix.Tracks.at(0));
        });
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
      mixService.PlayingTrackID = track.id;
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
