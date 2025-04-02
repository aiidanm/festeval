import axios from "axios";

export function testServerApi() {
  return axios
    .get("http://localhost:5000/login")
    .then((res) => console.log(res));
}

export function getLikedSongs(token, offset = 0) {
  return axios
    .get(`https://api.spotify.com/v1/me/tracks?limit=50&offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const likedTracks = response.data.items;
      const nextOffset = offset + 50;

      if (response.data.next) {
        return getLikedSongs(token, nextOffset).then((nextTracks) => {
          return likedTracks.concat(nextTracks);
        });
      } else {
        return likedTracks;
      }
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
  return axios
    .get(`https://api.spotify.com/v1/playlists/${playlistCode}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((data) => {
      return data.data.tracks.items;
    });
}

export function getClashFinder() {
  return axios
    .get(`https://clashfinder.com/m/g2024/?user=14ar4g.s4`)
    .then((data) => console.log(data));
}

export function login() {
  return axios.get("");
}
