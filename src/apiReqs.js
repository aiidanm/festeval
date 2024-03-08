import axios from "axios";

export function GetLikedSongs(playlistID) {
  axios
    .get(`https://api.spotify.com/v1/playlists/${playlistID}`)
    .then((playlist) => {
      return playlist;
    });
}

export function GetAllPlaylists() {
  axios
    .get("https://api.spotify.com/v1/playlists/")
    .then((playlists) => playlists);
}
