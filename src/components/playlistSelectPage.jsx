import React, { useState } from "react";
import { compareLists } from "../utilFunc";

export default function PlaylistPage({
  handleGetLikedSongs,
  token,
  setIsLoading,
  setMySongs,
  setPlaylistToggle,
  playlistData
}) {
  const [selectedPlaylist, setSelectedPlaylist] = useState();



  const handleChange = (e) => {
    setSelectedPlaylist(e.target.value);
  };
  return (
    <>
      Select which playlist you want to find artists from!
      <select name="playlists" id="playlists" onChange={handleChange}>
        {playlistData.map((playlist) => (
          <option key={playlist[1]} value={playlist[1]}>
            {playlist[0]}
          </option>
        ))}
      </select>
      <button
        onClick={() =>
          compareLists(token, selectedPlaylist, setMySongs, setIsLoading)
        }
      >
        Find artists playing at glasto
      </button>
    </>
  );
}
