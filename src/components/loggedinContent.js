import ArtistList from "./artistsList";
import { useState } from "react";
import { handleGetLikedSongs } from "../utilFunc";
import LikedSong from "./likedSongspage";
import PlaylistPage from "./playlistSelectPage";

export default function LoggedInContent({
  myGlastoArtists,
  setToken,
  token,
  setMySongs,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [playlistToggle, setPlaylistToggle] = useState(false);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <>
      <div className="buttonContainer">
        <button onClick={logout}>Logout</button>

        {playlistToggle ? (
          <PlaylistPage
            handleGetLikedSongs={handleGetLikedSongs}
            token={token}
            setIsLoading={setIsLoading}
            setMySongs={setMySongs}
          />
        ) : (
          <div className="select-button-container">
            <button
              onClick={() => {
                setPlaylistToggle(true);
              }}
            >
              Select a specific playlist instead
            </button>
            <LikedSong
              handleGetLikedSongs={handleGetLikedSongs}
              token={token}
              setIsLoading={setIsLoading}
              setMySongs={setMySongs}
            />
          </div>
        )}
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
