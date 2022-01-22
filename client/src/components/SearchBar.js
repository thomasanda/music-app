import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';

import tidal from '../api/tidal';


const SearchBar = ({ setSelectedValue }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = value => {
    setInputValue(value)
  }

  const handleChange = value => {
    setSelectedValue(value)
  }
  const loadOptions = async (inputValue) => {
    if (inputValue !== '') {
      const res = await tidal.get(`/search_artist/${inputValue}`)
      return res.data
    }
  }

  return (
    <div className="search-bar">
      <AsyncSelect
        cacheOptions
        defaultOptions
        getOptionLabel={e => e.name}
        getOptionValue={e => e.id}
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
        placeholder='Search...'
        isClearable={true}
        backspaceRemovesValue={true}
      />
    </div>
  )

}

export default SearchBar;
