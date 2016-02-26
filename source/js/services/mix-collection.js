angular.module('np.services')
.service('MixCollection', ['$collection', 'TrackCollection',
  function($collection, TrackCollection) {
    var MixCollection = $collection.getInstance({comparator: '-release_date'});

    MixCollection.GetPlaylistNumber = function(playlistNumber) {
      return _.findWhere(MixCollection.array, {playlist_number: playlistNumber});
    };

    MixCollection.MoveUpDownMix = function(mixID, amount) {
      if (this.length === 0) { return; }

      var number = this.get(mixID).playlist_number;
      return this.GetPlaylistNumber(number + amount);
    };

    MixCollection.AddTracks = function(mixID, rawTracks) {
      tracks = TrackCollection.Init(rawTracks);
      this.update({id: mixID, Tracks: tracks});
    };

    return MixCollection;
  }
])
.service('TrackCollection', ['$collection',
  function($collection) {
    var TrackCollection = $collection;

    TrackCollection.prototype.MoveUpDownSong = function(trackID, amount) {
      if (this.length === 0) { return ; }
      var newTrackNumber = this.get(trackID).track_number + amount;
      return _.findWhere(this.array, {track_number: newTrackNumber});
    };

    TrackCollection.Init = function(rawTracks) {
      var collection = this.getInstance({idAttribute: 'track_id', comparator: 'track_number'});
      return collection.addAll(rawTracks);
    };

    return TrackCollection;
  }
]);