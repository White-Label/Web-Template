angular.module('np.services')
.service('mixService', ['$rootScope', '$location', '$q', 'GENERAL_CONFIG', 'MixCollection', 'TrackCollection',
  function($rootScope, $location, $q, Config, MixCollection, TrackCollection) {
    var mixService = {
      Mixes: MixCollection,
      CurrentMixID: null,
      Tracks: TrackCollection,
      PlayingMixID: null,
      PlayingTrackID: null,
      PlayingTrack: null,
      wl: new WhiteLabel(Config.WHITE_LABEL_TOKEN)
    }

    mixService.SelectMix = function(playlistID) {
      var self = this;

      return this.GetMix(playlistID)
      .then(function(mix) {
        self.CurrentMix = mix;
        self.CurrentMixID = mix.id;
        return self.GetMixTracks(mix);
      });
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
        mixID = 296;
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

    // Returns track obj from slug
    // Searches current mixtape
    mixService.getTrackFromSlug = function(slug) {
        var matchingTracks = this.CurrentMix.Tracks.array.filter(function(t) {
            return t.slug === slug;
        });
        return matchingTracks.length === 0 ? null : matchingTracks[0];
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
        var mix = this.Mixes.MoveUpDownMix(this.CurrentMix, increment);
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

    mixService.GetAllPlaylists = function(collection) {
      collection = collection || Config.DEFAULT_COLLECTION;
      var self = this;
      mixService.CurrentCollection = collection;
      return this.wl.getCollectionMixtapes(collection, {all: true, results: true})
        .then(function(mixtapes) {
          self.Mixes.addAll(mixtapes);
          $rootScope.$apply();
          return mixtapes;
        });
    }

    return mixService
  }
  ]);
