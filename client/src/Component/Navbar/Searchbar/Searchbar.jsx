import React, { useState } from 'react';
import { BsMicFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import Searchlist from './Searchlist';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Searchbar.css';

const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const videoTitles = useSelector(state =>
    state?.videoreducer?.data?.filter(video =>
      video?.videotitle?.toUpperCase().includes(searchQuery.toUpperCase())
    )?.map(video => video?.videotitle)
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
      setShowSuggestions(false);
    }
  };

  return (
    <form className="searchbar-container" onSubmit={handleSearchSubmit}>
      <div className="search-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay to allow click on suggestions
        />
        <button type="submit" className="search-icon" aria-label="Search">
          <FaSearch />
        </button>
        <BsMicFill className="mic-icon" title="Voice search (placeholder)" />
        {searchQuery && showSuggestions && (
          <Searchlist setsearchquery={setSearchQuery} Titlearray={videoTitles} />
        )}
      </div>
    </form>
  );
};

export default Searchbar;
