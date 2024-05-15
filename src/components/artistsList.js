export default function ArtistList({ myGlastoArtists }) {
  return (
    <ul>
      {myGlastoArtists.map((artist) => (
        <li key={artist.name}>{artist.name}</li>
      ))}
    </ul>
  );
}
