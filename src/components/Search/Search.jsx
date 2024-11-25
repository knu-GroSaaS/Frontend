import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    onSearch(keyword);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center w-full max-w-2xl">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyPress}
        className="border border-gray-300 rounded p-2 flex-grow focus:ring focus:ring-indigo-200 focus:outline-none placeholder-gray-500"
        placeholder="Search cases..."
      />

      <button
        onClick={handleSearch}
        className="ml-2 bg-[#BEACEB] text-white p-2 rounded hover:bg-[#9d87c7] transition duration-300 w-12"
      >
        🔍︎
      </button>
    </div>
  );
};

export default Search;
