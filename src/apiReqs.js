import axios from "axios";

export function getLikedSongs(token) {
  console.log(token);
  return axios
    .get("https://api.spotify.com/v1/me/tracks/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((data) => {
      return data;
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

export function getPlaylistsSongs(token, playlistCode) {
  console.log(playlistCode);
  return axios
    .get(`https://api.spotify.com/v1/playlists/${playlistCode}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((data) => {
      return data.data.tracks.items
    });
}
