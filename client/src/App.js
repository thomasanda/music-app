import React, { useState } from "react";

import SearchBar from "./components/SearchBar";
import Albums from "./components/Albums";
import ProfileInfo from "./components/ProfileInfo";
import AudioPlayer2 from "./components/AudioPlayer2";

const App = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [trackURL, setTrackURL] = useState("");
  const [albumTracks, setAlbumTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState("");

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
