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


  export {parseTracks, parsePlaylists, handleGetLikedSongs,compareLists}