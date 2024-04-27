import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

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
const SCOPE = "user-read-private"

function App() {
  const { clientID, setClientID } = useState("");
  const { code, setCode } = useState("");
  const [token, setToken] = useState("");
  const [playlistData, setPlaylistData] = useState();
  const [selectedPlaylist, setSelectedPlaylist] = useState();
  const [finalArtists, setFinalArtists] = useState({});
  const [mySongs, setMySongs] = useState([]);
  const [myGlastoArtists, setMyGlastoArtists] = useState([])


  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    const artists = {};
    console.log(token)

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

  useEffect(() => {
    if (mySongs.length !== 0) {
      const filteredKeys = Object.keys(finalArtists).filter((key) =>
        mySongs.includes(key)
      );
      const filteredObjects = filteredKeys.map((key) => ({
        name: key,
        info: finalArtists[key],
      }));
      setMyGlastoArtists(filteredObjects)
    }
  }, [mySongs]);

  const handleLogin = () => {
   

    return axios 
      .get("https://accounts.spotify.com/authorize"),{
      params : {
      response_type: "code",
      client_id: CLIENT_ID,
      scope: SCOPE,
      redirect_uri: REDIRECT_URI,
      }}
  }


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
    getPlaylistsSongs(token, selectedPlaylist).then((tracks) => {
      setMySongs(parseTracks(tracks));
    });
  };



  return (
    <div className="App">
      <div className="mainContainer">
        <h1>Festeval</h1>

        {window.localStorage.getItem("token") !== null ? (
          <>
            <button onClick={logout}>Logout</button>
            <div>
              

              {playlistData ? (
                <>
                Select which playlist you want to find artists from!
                <select name="playlists" id="playlists" onChange={handleChange}>
                  {playlistData.map((playlist) => {
                    return (
                      <option value={playlist[1]}>{`${playlist[0]}`}</option>
                    );
                  })}
                </select>
                <button onClick={compareLists}>
                Find artists playing at glasto
              </button></>
              ) : <button onClick={handleGetAllPlaylists}>Get my playlists!</button>}

              
            </div>
            {myGlastoArtists ? <ul>{myGlastoArtists.map((artist) => <li>{artist.name}</li>)}</ul> : null}
          </>
        ) : (
          // <a
          //   href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
          // >
            <button onClick={handleLogin}>Login to spotify</button>
          // </a>
        )}
      </div>
      <button onClick={handleGetLikedSongs}>Get liked songs</button>
    </div>
  );
}

export default App;
