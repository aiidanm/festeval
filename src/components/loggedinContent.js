import ArtistList from "./artistsList";
import { useState } from "react";

import { handleGetLikedSongs } from "../utilFunc";

export default function LoggedInContent({
  myGlastoArtists,
  setToken,
  token,
  setMySongs,
}) {

  const [isLoading, setIsLoading] = useState(false);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };



  return (
    <>
      <div className="buttonContainer">
        <button onClick={logout}>Logout</button>
        <button onClick={handleGetLikedSongs(token, setIsLoading, setMySongs)}>
          Get liked songs
        </button>
      </div>
      <div className="songList">
        {myGlastoArtists ? (
          <ArtistList myGlastoArtists={myGlastoArtists} />
        ) : null}
        {isLoading ? <h3>working in background...</h3> : null}
      </div>
    </>
  );
}
