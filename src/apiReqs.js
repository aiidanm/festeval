import axios from "axios";

export function getLikedSongs(playlistID) {
  axios
    .get("https://api.spotify.com/v1/me/playlists/")
    .then((playlist) => {
      return playlist;
    });
}

export function getAllPlaylists(token) {
  return axios
    .get("https://api.spotify.com/v1/me/playlists/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 50,
      },
    })
    .then((data) => {
      return data.data.items;
    });
}


