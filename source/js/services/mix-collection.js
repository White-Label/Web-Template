angular.module('app.services')
.service('MixCollection', ['$collection', 'TrackCollection',
  function($collection, TrackCollection) {
    var MixCollection = $collection.getInstance({comparator: '-release'});

    MixCollection.GetPlaylistNumber = function(playlistNumber) {
      return _.findWhere(MixCollection.array, {slug: playlistNumber});
    };

    MixCollection.MoveUpDownMix = function(mix, amount) {
      if (this.length === 0) { return; }

      var number = this.array.indexOf(mix) + amount;
      if (number >= 0 && number < this.array.length) {
        return this.array[number];
      } else {
        return null;
      }
    };

    MixCollection.GetRandomMix = function() {
      if (this.array.length > 0) {
        return this.array[Math.floor(Math.random() * this.array.length)];
      } else {
        return null;
      }
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
      var newTrackNumber = this.get(trackID).order + amount;
      return _.findWhere(this.array, {order: newTrackNumber});
    };

    TrackCollection.Init = function(rawTracks) {
      var collection = this.getInstance({idAttribute: 'id', comparator: 'order'});
      return collection.addAll(rawTracks);
    };

    return TrackCollection;
  }
]);
