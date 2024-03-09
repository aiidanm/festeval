import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

import { getAllPlaylists } from "./apiReqs";

const CLIENT_ID = "381df114364a4177b35739c970141a6b";
const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

function App() {
  const { clientID, setClientID } = useState("");
  const { code, setCode } = useState("");
  const [token, setToken] = useState("");
  const [playlistData, setPlaylistData] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

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
    console.log(token);
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

  const handleGetAllPlaylists = () => {
    getAllPlaylists(token).then((data) => console.log(parsePlaylists(data)));
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
      </div>
    </div>
  );
}

export default App;
