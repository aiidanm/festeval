import React, { useEffect, useState } from "react";

export default function ArtistList({ myGlastoArtists }) {
  // State to keep track of which artist's info is expanded
  const [expandedArtist, setExpandedArtist] = useState(null);

  // Function to toggle the artist info
  const toggleArtistInfo = (artistName) => {
    setExpandedArtist(expandedArtist === artistName ? null : artistName);
  }

  function convertDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const time = date.toTimeString().slice(0, 5);
    return { dayOfWeek, time };
  }

  function extractEnd(dateTimeString) {
    const date = new Date(dateTimeString);
    const time = date.toTimeString().slice(0, 5);
    return time;
  }



   return (
     <>
      { myGlastoArtists.length !== 0 ? <h3>Total Artists you like playing: {myGlastoArtists.length}</h3> : null}
       <ul>
         {myGlastoArtists.map((artist) => {
           const { dayOfWeek, time } = convertDateTime(artist.info.start);
           const endTime = extractEnd(artist.info.end);
           return (
             <li key={artist.name}>
               <div className="artistCard">
                 <p
                   onClick={() => toggleArtistInfo(artist.name)}
                   style={{ cursor: "pointer", color: "var(--primary-color)" }}
                 >
                   {artist.name}
                 </p>
                 {expandedArtist === artist.name && (
                   <div className="artistDiv">
                     <p className="artistInfo">Stage: {artist.info.stage}</p>
                     <p className="artistInfo">Day: {dayOfWeek}</p>
                     <p className="artistInfo">Starts: {time}</p>
                     <p className="artistInfo">Ends: {endTime}</p>
                   </div>
                 )}
               </div>
             </li>
           );
         })}
       </ul>
     </>
   );
}
