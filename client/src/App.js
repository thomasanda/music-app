import React, { useState } from 'react';

import SearchBar from './components/SearchBar';
import Albums from './components/Albums';
import ProfileInfo from './components/ProfileInfo';

const App = () => {
  const [selectedValue, setSelectedValue] = useState(null)
  return (
    <div className='App'>
      <ProfileInfo />
      <SearchBar setSelectedValue={setSelectedValue} />
      <Albums selectedValue={selectedValue} />
    </div>
  );
}

export default App;

