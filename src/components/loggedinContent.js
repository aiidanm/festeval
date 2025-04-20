import ArtistList from "./artistsList";
import { useState } from "react";
import {
  handleGetLikedSongs,
  parsePlaylists,
  getEveryPlaylistsSongs,
} from "../utilFunc";
import LikedSong from "./likedSongspage";
import PlaylistPage from "./playlistSelectPage";
import { getAllPlaylists } from "../apiReqs";

export default function LoggedInContent({
  myGlastoArtists,
  setToken,
  token,
  setMySongs,
}) {
  const [isLoading, setIsLoading] = useState({ status: false, msg: "" });
  const [playlistToggle, setPlaylistToggle] = useState(false);
  const [playlistData, setPlaylistData] = useState([]);
  const [searchDone, setSearchDone] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <>
      <div className="loggedincontainer">
        <button
          onClick={() => {
            getEveryPlaylistsSongs(
              token,
              setMySongs,
              setIsLoading,
              setSearchDone,
              setProgress
            );
          }}
        >
          Match me with Glasto Artists!
        </button>
        {/* {playlistToggle ? (
          <PlaylistPage
            handleGetLikedSongs={handleGetLikedSongs}
            token={token}
            setIsLoading={setIsLoading}
            setMySongs={setMySongs}
            playlistData={playlistData}
            setSearchDone={setSearchDone}
          />
        ) : (
          <div className="select-button-container">
             <LikedSong
              handleGetLikedSongs={handleGetLikedSongs}
              token={token}
              setIsLoading={setIsLoading}
              setMySongs={setMySongs}
              setSearchDone={setSearchDone}
            />
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
           
            <button
        onClick={() => {
          getEveryPlaylistsSongs(token, setMySongs, setIsLoading, setSearchDone, setProgress)
          }}
      >
        Use all my playlists
      </button>
          </div>
        )} */}
      </div>

      <div className="songList">
        <ArtistList myGlastoArtists={myGlastoArtists} searchDone={searchDone} />
        {isLoading.status ? <h3>{isLoading.msg}</h3> : null}
      </div>
    </>
  );
}
