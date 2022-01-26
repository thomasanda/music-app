import React, { useState } from "react";

import SearchBar from "./components/SearchBar";
import Albums from "./components/Albums";
import ProfileInfo from "./components/ProfileInfo";
import AudioPlayer from "./components/AudioPlayer";
// import Album from "https://framer.com/m/Album-VI6H.js@K9xaOeafsr8b3fZ8u3Pn";

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
      />
      {trackURL && (
        <AudioPlayer
          trackURL={trackURL}
          albumTracks={albumTracks}
          selectedTrack={selectedTrack}
        />
      )}
    </div>
  );
};

export default App;
