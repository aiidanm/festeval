
export default function LikedSong({ handleGetLikedSongs, token, setIsLoading, setMySongs }) {
  return (
    <button
      onClick={() => {
        handleGetLikedSongs(token, setIsLoading, setMySongs);
      }}
    >
      Get liked songs
    </button>
  );
}
