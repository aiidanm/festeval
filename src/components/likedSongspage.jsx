export default function LikedSong({
  handleGetLikedSongs,
  token,
  setIsLoading,
  setMySongs,
  setSearchDone,
}) {
  return (
    <button
      onClick={() => {
        handleGetLikedSongs(token, setIsLoading, setMySongs, setSearchDone);
      }}
    >
      Get liked songs
    </button>
  );
}
