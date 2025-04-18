import { getLikedSongs, getPlaylistsSongs, getAllPlaylists } from "./apiReqs";

const parseTracks = (tracks) => {
  return tracks.map((track) => {
    return track.track.artists[0].name;
  });
};

const compareLists = (
  token,
  selectedPlaylist,
  setMySongs,
  setIsLoading,
  setSearchDone
) => {
  setIsLoading(true);
  setSearchDone(false);
  getPlaylistsSongs(token, selectedPlaylist)
    .then((tracks) => {
      setIsLoading(false);
      setSearchDone(true);
      setMySongs(parseTracks(tracks));
    })
    .catch((err) => console.log(err));
};

const getEveryPlaylistsSongs = (
  token,
  setMySongs,
  setIsLoading,
  setSearchDone
) => {
  setIsLoading(true)
  
  getAllPlaylists(token).then((playlists) => {
    let playlistIDS = playlists.map((playlist) => playlist.id); // flatten from [[id]] to [id]
  
    let allArtists = new Set();
  
    let playlistPromises = playlistIDS.map((id) => {
      return getPlaylistsSongs(token, id).then((result) => {
        parseTracks(result).forEach((artist) => allArtists.add(artist));
      });
    });
  
    Promise.all(playlistPromises).then(() => {
      let finalArr = Array.from(allArtists);
      setIsLoading(false);
      setSearchDone(true);
      setMySongs(finalArr); // or maybe pass testArr into setMySongs(testArr)
    });
  });
  



};

const handleGetLikedSongs = (
  token,
  setIsLoading,
  setMySongs,
  setSearchDone
) => {
  setIsLoading(true);
  setSearchDone(false);
  getLikedSongs(token)
    .then((data) => {
      setIsLoading(false);
      setSearchDone(true);

      setMySongs(parseTracks(data));
    })
    .catch((err) => console.log(err));
};

const parsePlaylists = (rawPlaylists) => {
  return rawPlaylists.map((playlist) => {
    return [playlist.name, playlist.id];
  });
};

const parseGlastoData = (glastoData, artists) => {
  glastoData.locations.forEach((location) => {
    location.events.forEach((event) => {
      const artistName = event.name;
      const artistInfo = {
        short: event.short,
        start: event.start,
        end: event.end,
        mbId: event.mbId || null,
        stage: location.name,
      };

      artists[artistName] = artistInfo;
    });
  });
  return artists;
};

const compareToGlasto = (mySongs, glastoArtists, setMyGlastoArtists) => {
  console.log(mySongs)
  if (mySongs.length !== 0) {
    const filteredKeys = Object.keys(glastoArtists).filter((key) =>
      mySongs.includes(key)
    );
    const filteredObjects = filteredKeys.map((key) => ({
      name: key,
      info: glastoArtists[key],
    }));
    console.log(filteredObjects);
    setMyGlastoArtists(filteredObjects);
  }
};

const convertDateTime = (dateTimeString) => {
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
};

const extractEnd = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const time = date.toTimeString().slice(0, 5);
  return time;
};

function parseTime(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

const clashChecker = (artists) => {
  const days = ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  artists.sort((a, b) => {
    if (a.day !== b.day) {
      return days.indexOf(a.day) - days.indexOf(b.day);
    }
    return parseTime(a["start"]) - parseTime(b["start"]);
  });

  return artists;
};

const updateMatchedArtists = (myGlastoArtists) => {
  const updatedArtists = myGlastoArtists.map((artist) => {
    const { dayOfWeek, time } = convertDateTime(artist.info.start);
    const endTime = extractEnd(artist.info.end);
    artist.start = time;
    artist.day = dayOfWeek;
    artist.end = endTime;

    return artist;
  });
  const sortedArtists = clashChecker(updatedArtists);

  for (let i = 0; i < sortedArtists.length; i++) {
    for (let j = i + 1; j < sortedArtists.length; j++) {
      if (sortedArtists[i].day === sortedArtists[j].day) {
        if (
          (sortedArtists[i].start < sortedArtists[j].end &&
            sortedArtists[i].start >= sortedArtists[j].start) ||
          (sortedArtists[j].start < sortedArtists[i].end &&
            sortedArtists[j].start >= sortedArtists[i].start)
        ) {
          sortedArtists[i].highlight = true;
          sortedArtists[j].highlight = true;
        }
      }
    }
  }

  return sortedArtists;
};

export {
  parseTracks,
  parsePlaylists,
  handleGetLikedSongs,
  compareLists,
  parseGlastoData,
  compareToGlasto,
  updateMatchedArtists,
  clashChecker,
  getEveryPlaylistsSongs
};
