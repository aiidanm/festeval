import ArtistList from "./artistsList";
import { useState } from "react";
import { handleGetLikedSongs, parsePlaylists } from "../utilFunc";
import LikedSong from "./likedSongspage";
import PlaylistPage from "./playlistSelectPage";
import { getAllPlaylists } from "../apiReqs";

export default function LoggedInContent({
  myGlastoArtists,
  setToken,
  token,
  setMySongs,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [playlistToggle, setPlaylistToggle] = useState(false);
  const [playlistData, setPlaylistData] = useState([]);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <>
      <button onClick={logout} className="logout-button">
        Logout
      </button>
      <div className="loggedincontainer">
        {playlistToggle ? (
          <PlaylistPage
            handleGetLikedSongs={handleGetLikedSongs}
            token={token}
            setIsLoading={setIsLoading}
            setMySongs={setMySongs}
            playlistData={playlistData}
          />
        ) : (
          <div className="select-button-container">
            <button
              onClick={() => {
                getAllPlaylists(token).then((data) => {
                  setPlaylistData(parsePlaylists(data));
                  setPlaylistToggle(true);
                });
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
          <ArtistList myGlastoArtists={myGlastoArtists} />
        {isLoading ? <h3>working in background...</h3> : null}
      </div>
    </>
  );
}
