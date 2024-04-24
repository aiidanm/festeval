import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

import {
  getAllPlaylists,
  getLikedSongs,
  getPlaylistsSongs,
  getClashFinder,
} from "./apiReqs";

import glastoData from "./Glasto.json";

const CLIENT_ID = "381df114364a4177b35739c970141a6b";
const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

function App() {
  const { clientID, setClientID } = useState("");
  const { code, setCode } = useState("");
  const [token, setToken] = useState("");
  const [playlistData, setPlaylistData] = useState();
  const [selectedPlaylist, setSelectedPlaylist] = useState();
  const [finalArtists, setFinalArtists] = useState({});
  const [mySongs, setMySongs] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    const artists = {};

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

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);

    setFinalArtists(artists);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const parsePlaylists = (rawPlaylists) => {
    return rawPlaylists.map((playlist) => {
      return [playlist.name, playlist.id];
    });
  };

  const handleGetLikedSongs = () => {
    getLikedSongs(token).then((data) => console.log(data));
  };

  const handleGetAllPlaylists = () => {
    getAllPlaylists(token).then((data) =>
      setPlaylistData(parsePlaylists(data))
    );
  };

  const handleChange = (e) => {
    setSelectedPlaylist(e.target.value);
  };

  const parseTracks = (tracks) => {
    return tracks.map((track) => {
      return track.track.artists[0].name;
    });
  };

  const handleFind = (e) => {
    getPlaylistsSongs(token, selectedPlaylist).then((tracks) => {
      setMySongs(parseTracks(tracks));
    });
  };

  const compareLists = (e) => {
    const filteredKeys = Object.keys(finalArtists).filter((key) =>
      mySongs.includes(key)
    );
    const filteredObjects = filteredKeys.map((key) => ({
      name: key,
      info: finalArtists[key],
    }));
    console.log(filteredObjects);
  };

  return (
    <div className="App">
      <div className="mainContainer">
        <h1>Festeval</h1>
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to Spotify
        </a>
        <button onClick={logout}>Logout</button>
        <button onClick={handleGetAllPlaylists}>Get all playlists info</button>
        <select name="playlists" id="playlists" onChange={handleChange}>
          {playlistData
            ? playlistData.map((playlist) => {
                return <option value={playlist[1]}>{`${playlist[0]}`}</option>;
              })
            : null}
        </select>
        <button onClick={handleFind}>load playlists songs</button>
        <button onClick={compareLists}>Find artists playing at glasto</button>
      </div>
    </div>
  );
}

export default App;
