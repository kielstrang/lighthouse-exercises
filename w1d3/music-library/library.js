var library = {
  tracks: { t01: { id: "t01",
                   name: "Code Monkey",
                   artist: "Jonathan Coulton",
                   album: "Thing a Week Three" },
            t02: { id: "t02",
                   name: "Model View Controller",
                   artist: "James Dempsey",
                   album: "WWDC 2003"},
            t03: { id: "t03",
                   name: "Four Thirty-Three",
                   artist: "John Cage",
                   album: "Woodstock 1952"}
          },
  playlists: { p01: { id: "p01",
                      name: "Coding Music",
                      tracks: ["t01", "t02"]
                    },
               p02: { id: "p02",
                      name: "Other Playlist",
                      tracks: ["t03"]
                    }
             },

  printPlaylistString : function(playlist) {
    console.log(`${playlist.id}: ${playlist.name} - ${playlist.tracks.length} tracks`);
  },

  printTrackString : function(track) {
    console.log(`${track.id}: ${track.name} by ${track.artist} (${track.album})`);
  },

  // prints a list of all playlists, in the form:
  // p01: Coding Music - 2 tracks
  // p02: Other Playlist - 1 tracks

  printPlaylists : function () {
    for(var id in this.playlists) {
      this.printPlaylistString(this.playlists[id]);
    }
  },


  // prints a list of all tracks, in the form:
  // t01: Code Monkey by Jonathan Coulton (Thing a Week Three)
  // t02: Model View Controller by James Dempsey (WWDC 2003)
  // t03: Four Thirty-Three by John Cage (Woodstock 1952)

  printTracks : function () {
    for(var id in this.tracks) {
      this.printTrackString(this.tracks[id]);
    }
  },


  // prints a list of tracks for a given playlist, in the form:
  // p01: Coding Music - 2 tracks
  // t01: Code Monkey by Jonathan Coulton (Thing a Week Three)
  // t02: Model View Controller by James Dempsey (WWDC 2003)

  printPlaylist : function (playlistId) {
    var playlist = this.playlists[playlistId];
    this.printPlaylistString(playlist);

    for (var trackId of playlist.tracks) {
      if (trackId in this.tracks) {
        var track = this.tracks[trackId];
        this.printTrackString(track);
      }
      else {
        console.log('Unknown track with id ' + trackId);
      }
    }
  },

  // adds an existing track to an existing playlist

  addTrackToPlaylist : function (trackId, playlistId) {
    var playlist = this.playlists[playlistId];
    playlist.tracks.push(trackId);
  },


  // generates a unique id
  // (use this for addTrack and addPlaylist)

  uid : function() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  },


  // adds a track to the this

  addTrack : function (name, artist, album) {
    var newId = this.uid();
    var newTrack = { id : newId , name : name, artist : artist, album : album};
    this.tracks[newId] = newTrack;
    return newId;
  },

  // adds a playlist to the this

  addPlaylist : function (name) {
    var newId = this.uid();
    var newPlaylist = { id : newId , name : name, tracks : []};
    this.playlists[newId] = newPlaylist;
    return newId;
  },


  // STRETCH:
  // given a query string string, prints a list of tracks
  // where the name, artist or album contains the query string (case insensitive)
  // tip: use "string".search("tri")
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search

  printSearchResults : function(query) {
    query = query.toLowerCase();
    for (var id in this.tracks) {
      var track = this.tracks[id];
      for (var key in track) {
        if (['name', 'artist', 'album'].includes(key)) {
          var searchString = track[key].toLowerCase();
          if(searchString.search(query) > -1) {
            this.printTrackString(track);
            break;
          }
        }
      }
    }
  }
}



var newTrack = library.addTrack('All About Windmills', 'Peatbog Faeries', 'Croftwork');
var newPlaylist = library.addPlaylist('Awesome Music');
library.addTrackToPlaylist(newTrack, newPlaylist);
library.printPlaylists();
console.log('--------');
library.printTracks();
console.log('--------');
library.printPlaylist(newPlaylist);
console.log('--------');
library.printSearchResults('windmill');