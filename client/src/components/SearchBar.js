import React from "react";
import AsyncSelect from "react-select/async";
import useFetch from "../hooks/useFetch";

const SearchBar = ({ setSelectedValue }) => {
  const { data, setData } = useFetch();

  const handleInputChange = (value) => {
    setData({ ...data, slug: value });
  };

  const handleChange = (value) => {
    setSelectedValue(value);
  };
  const loadOptions = async (inputValue) => {
    return data.results;
  };

  return (
    <div className="search-bar">
      <AsyncSelect
        getOptionLabel={(e) => e.name}
        getOptionValue={(e) => e.id}
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
        placeholder="Search Artists..."
        isClearable={true}
        backspaceRemovesValue={true}
      />
    </div>
  );
};

export default SearchBar;
