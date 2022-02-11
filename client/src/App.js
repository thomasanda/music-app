import React, { useState, useEffect } from "react";

import SearchBar from "./components/SearchBar";
import Albums from "./components/Albums";
import ProfileInfo from "./components/ProfileInfo";
import AudioPlayer2 from "./components/AudioPlayer2";
import tidal from "./api/tidal";

const App = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [trackURL, setTrackURL] = useState("");
  const [albumTracks, setAlbumTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState("");
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    try {
      tidal
        .get("/get_user_playlists")
        .then((result) => setPlaylists(...playlists, result.data));
    } catch (err) {
      console.error(err);
    }
  }, [playlists]);
  console.log(playlists.playlists);

  return (
    <div className="App flex flex-col h-screen ">
      <ProfileInfo className="" />
      <SearchBar setSelectedValue={setSelectedValue} />
      <Albums
        selectedValue={selectedValue}
        setTrackURL={setTrackURL}
        setAlbumTracks={setAlbumTracks}
        albumTracks={albumTracks}
        setSelectedTrack={setSelectedTrack}
        selectedTrack={selectedTrack}
        playlists={playlists}
      />
      {trackURL && (
        <AudioPlayer2
          trackURL={trackURL}
          albumTracks={albumTracks}
          selectedTrack={selectedTrack}
        />
      )}
    </div>
  );
};

export default App;
