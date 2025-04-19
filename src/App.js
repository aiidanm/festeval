import "./App.css";
import React, { useState, useEffect } from "react";
import Modal from "./components/popup";
import LoggedInContent from "./components/loggedinContent";
import LoginButton from "./components/LoginButton";
import { parseGlastoData, compareToGlasto } from "./utilFunc";
import glastoData from "./Glasto.json";

function App() {
  const [token, setToken] = useState("");

  const [finalArtists, setFinalArtists] = useState({});
  const [mySongs, setMySongs] = useState([]);
  const [myGlastoArtists, setMyGlastoArtists] = useState([]);
  const [openHowTo, setOpenHowTo] = useState(false);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  function isLoggedIn() {
    return window.localStorage.getItem("token") !== null;
  }

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    const artists = {};
    parseGlastoData(glastoData, artists);
  
    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
  
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
  
    // Validate token with Spotify
    async function validateToken(token) {
      if (!token) return;
      try {
        const res = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (res.status === 401) {
          // Token is invalid or expired
          logout();
        } else {
          setToken(token);
          setFinalArtists(artists);
        }
      } catch (err) {
        console.error("Error validating token:", err);
        logout(); // fallback logout
      }
    }
  
    validateToken(token);
  }, []);

  useEffect(() => {
    compareToGlasto(mySongs, finalArtists, setMyGlastoArtists);
  }, [mySongs]);

  

  

  return (
    <div className="App">
      <div className="mainContainer">
        {isLoggedIn() && (
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        )}
        <h1 className="Festeval">Festeval</h1>
        <h3 className="howToPlay" onClick={() => setOpenHowTo(true)}>
          How to use?
        </h3>
        <Modal isOpen={openHowTo} onClose={() => setOpenHowTo(false)}></Modal>
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
