import React from 'react';
import { FaSearch } from "react-icons/fa";
import './Searchlist.css';

const Searchlist = ({ Titlearray, setsearchquery }) => {
  return (
    <div className="Container_SearchList">
      {Titlearray.length > 0 ? Titlearray.map(title => (
        <p
          key={title}
          onClick={() => setsearchquery(title)}
          className="titleItem"
        >
          <FaSearch style={{ marginRight: '0.5rem' }} />
          {title}
        </p>
      )) : (
        <p className="titleItem">No suggestions</p>
      )}
    </div>
  );
};

export default Searchlist;
