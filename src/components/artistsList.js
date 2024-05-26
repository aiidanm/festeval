import React, { useEffect, useState } from "react";
import { clashChecker, updateMatchedArtists } from "../utilFunc";

export default function ArtistList({ myGlastoArtists }) {
  const [expandedArtist, setExpandedArtist] = useState(null);
  const [artistsInfo, setArtistsInfo] = useState([])

  const toggleArtistInfo = (artistName) => {
    setExpandedArtist(expandedArtist === artistName ? null : artistName);
  }

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
  setArtistsInfo(updateMatchedArtists(myGlastoArtists))
},[myGlastoArtists])

const groupedArtists = groupArtistsByDay(artistsInfo);

   return (
     <>
       {myGlastoArtists.length !== 0 ? (
         <h3>Total Artists you like playing: {myGlastoArtists.length}</h3>
       ) : null}
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
     </>
   );
}
