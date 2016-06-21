angular.module('app.services')
.service('mixService', ['$rootScope', '$location', '$q', 'GENERAL_CONFIG', 'MixCollection', 'TrackCollection',
  function($rootScope, $location, $q, Config, MixCollection, TrackCollection) {
    var mixService = {
      Mixes: MixCollection,
      CurrentMixID: null,
      Tracks: TrackCollection,
      PlayingMixID: null,
      PlayingTrackID: null,
      PlayingTrack: null,
      wl: new WhiteLabel(Config.WHITE_LABEL_CLIENT_ID)
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

      var mix = this.Mixes.GetPlaylistNumber(mixID);
      if (mix) {
        deferred.resolve(mix);
      }


      if (!mixID && this.Mixes.array.length > 0) {
        deferred.resolve(this.Mixes.array[0]);
      }
      return deferred.promise;

      if (!mixID) {
        deferred.resolve();
      }
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
        var mix;
        if (this.Shuffle) {
          mix = this.Mixes.GetRandomMix();
        } else {
          mix = this.Mixes.MoveUpDownMix(this.CurrentMix, increment);
        }
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

    mixService.GetTrackURL = function(collection, mixtape, track) {
      if (!collection) collection = this.CurrentCollection;
      if (!mixtape) mixtape = this.CurrentMix.slug;
      var pathArray = location.href.split( '/' );
      var protocol = pathArray[0];
      var host = pathArray[2];
      var url = protocol + '//' + host + '/';
      if (!Config.HTML_5_MODE) url += '#/';
      return url + collection + '/' + mixtape + '/' + track;
    }

    return mixService
  }
]);
