import "./App.css";
import React, { useState, useEffect } from "react";
import Modal from "./components/popup";

import LoggedInContent from "./components/loggedinContent";
import { getAllPlaylists, getPlaylistsSongs } from "./apiReqs";
import {
  parseTracks,
  parsePlaylists,
  compareLists,
  parseGlastoData,
  compareToGlasto,
} from "./utilFunc";

import glastoData from "./Glasto.json";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const AUTH_ENDPOINT = process.env.REACT_APP_AUTH_ENDPOINT;
const RESPONSE_TYPE = process.env.REACT_APP_RESPONSE_TYPE;
const SCOPE = process.env.REACT_APP_SCOPE;

function App() {
  const [token, setToken] = useState("");
  const [playlistData, setPlaylistData] = useState();
  const [selectedPlaylist, setSelectedPlaylist] = useState();
  const [finalArtists, setFinalArtists] = useState({});
  const [mySongs, setMySongs] = useState([]);
  const [myGlastoArtists, setMyGlastoArtists] = useState([]);
  const [openHowTo, setOpenHowTo] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    const artists = parseGlastoData(glastoData);

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
    compareToGlasto(mySongs, finalArtists, setMyGlastoArtists);
  }, [mySongs]);

  const handleGetAllPlaylists = () => {
    getAllPlaylists(token).then((data) =>
      setPlaylistData(parsePlaylists(data))
    );
  };

  const handleChange = (e) => {
    setSelectedPlaylist(e.target.value);
  };

  const handleFind = (e) => {
    getPlaylistsSongs(token, selectedPlaylist).then((tracks) => {
      setMySongs(parseTracks(tracks));
    });
  };

  function isLoggedIn() {
    return window.localStorage.getItem("token") !== null;
  }

  function PlaylistSelector() {
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
        <button onClick={compareLists(token, selectedPlaylist, setMySongs)}>
          Find artists playing at glasto
        </button>
      </>
    );
  }

  function LoginButton() {
    return (
      <a
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
      >
        <button>Login to spotify</button>
      </a>
    );
  }

  return (
    <div className="App">
      <div className="mainContainer">
        <h1 className="Festeval">Testing</h1>
        <h3 className="howToPlay" onClick={() => setOpenHowTo(true)}>
          How to play?
        </h3>
        <Modal isOpen={openHowTo} onClose={() => setOpenHowTo(false)}>
          <title>How to use this webapp</title>
          <p>
            Simply click the login button, link your spotify account and then
            click "get liked songs" this will then compare your liked songs
            playlist on spotify with artists playing at glastonbury.
          </p>
          <p>It may take a few minutes but bear with it.</p>
          <p>
            Afterwards you will see a list of any artists you've liked that are
            performing. click on these for more information such as stage, time
            and which songs of theres you have liked.
          </p>

          <p>
            We ask for permission to use some of your spotify account data, all
            that happens in the background is pulling your playlists and then
            the songs you have in the liked songs playlist{" "}
          </p>
        </Modal>
        {isLoggedIn() ? (
          <LoggedInContent
            myGlastoArtists={myGlastoArtists}
            setToken={setToken}
            token={token}
            setMySongs={setMySongs}
          />
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
}

export default App;
