import React, { useEffect, useState } from "react";
import { updateMatchedArtists } from "../utilFunc";

export default function ArtistList({ myGlastoArtists, searchDone }) {
  const [expandedArtist, setExpandedArtist] = useState(null);
  const [artistsInfo, setArtistsInfo] = useState([]);

  const toggleArtistInfo = (artistName) => {
    setExpandedArtist(expandedArtist === artistName ? null : artistName);
  };

  const groupArtistsByDay = (artists) => {
    return artists.reduce((acc, artist) => {
      if (!acc[artist.day]) {
        acc[artist.day] = [];
      }
      acc[artist.day].push(artist);
      return acc;
    }, {});
  };

  useEffect(() => {
    setArtistsInfo(updateMatchedArtists(myGlastoArtists));
  }, [myGlastoArtists]);

  const groupedArtists = groupArtistsByDay(artistsInfo);

  if (myGlastoArtists.length === 0 && searchDone === true) {
    return (
      <div className="resultsContainer">
        <h3>
          Sorry, no artists you've liked are playing this year! If you think
          this is wrong, please get in contact and i'll check the database
        </h3>
      </div>
    );
  } else if (myGlastoArtists && myGlastoArtists.length !== 0) {
    return (
      <div className="resultsContainer">
        {Object.keys(groupedArtists).map((day) => (
          <div key={day}>
            <h2>{day}</h2>
            <ul>
              {groupedArtists[day].map((artist) => (
                <li key={artist.name}>
                  <div
                    className={`artistCard ${
                      artist.highlight ? "highlight" : ""
                    }`}
                  >
                    <p
                      onClick={() => toggleArtistInfo(artist.name)}
                      style={{
                        cursor: "pointer",
                        color: "var(--primary-color)",
                      }}
                    >
                      {artist.name}
                    </p>
                    {expandedArtist === artist.name && (
                      <div className="artistDiv">
                        <p className="artistInfo">Stage: {artist.info.stage}</p>
                        <p className="artistInfo">Starts: {artist.start}</p>
                        <p className="artistInfo">Ends: {artist.end}</p>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
}
