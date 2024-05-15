import {getLikedSongs, getPlaylistsSongs } from "./apiReqs";

const parseTracks = (tracks) => {
    return tracks.map((track) => {
      return track.track.artists[0].name;
    });
  };



const compareLists = (token, selectedPlaylist, setMySongs) => {
    getPlaylistsSongs(token, selectedPlaylist).then((tracks) => {
      setMySongs(parseTracks(tracks));
    });
  };


  const handleGetLikedSongs = (token, setIsLoading, setMySongs) => {
    setIsLoading(true);
    getLikedSongs(token)
      .then((data) => {
        setIsLoading(false);
        setMySongs(parseTracks(data));
      })
      .catch((err) => console.log(err));
  };


  const parsePlaylists = (rawPlaylists) => {
    return rawPlaylists.map((playlist) => {
      return [playlist.name, playlist.id];
    });
  };

  const parseGlastoData = (glastoData,artists) => {
    glastoData.locations.forEach((location) => {
        location.events.forEach((event) => {
          const artistName = event.name;
          const artistInfo = {
            short: event.short,
            start: event.start,
            end: event.end,
            mbId: event.mbId || null,
            stage: location.name,
          };
  
          artists[artistName] = artistInfo;
        });
      });
      return artists
  }

  const compareToGlasto = (mySongs, finalArtists, setMyGlastoArtists) => {
    if (mySongs.length !== 0) {
        const filteredKeys = Object.keys(finalArtists).filter((key) =>
          mySongs.includes(key)
        );
        const filteredObjects = filteredKeys.map((key) => ({
          name: key,
          info: finalArtists[key],
        }));
        setMyGlastoArtists(filteredObjects);
      }
  }

  export {parseTracks, parsePlaylists, handleGetLikedSongs,compareLists, parseGlastoData, compareToGlasto}