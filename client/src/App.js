import React, { useState } from 'react';

import SearchBar from './components/SearchBar';
import Albums from './components/Albums';
import ProfileInfo from './components/ProfileInfo';
import AudioPlayer from './components/AudioPlayer';

const App = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [trackURL, setTrackURL] = useState('');
  const [albumTracks, setAlbumTracks] = useState([])

  return (
    <div className='App'>
      <ProfileInfo />
      <SearchBar setSelectedValue={setSelectedValue} />
      <Albums selectedValue={selectedValue} setTrackURL={setTrackURL} setAlbumTracks={setAlbumTracks} albumTracks={albumTracks} />
      {trackURL &&
        <AudioPlayer trackURL={trackURL} albumTracks={albumTracks} />
      }
    </div>
  );
}

export default App;

