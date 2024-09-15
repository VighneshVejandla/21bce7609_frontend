import React, { useEffect } from 'react';
import './Header.css'; // Import the necessary CSS file

const Header = ({setSearchTerm, searchTerm}) => {

useEffect(() => {

}, [searchTerm])

console.log(searchTerm);

  return (
    <>
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <h1>Trademarkia</h1>
          </div>
        </div>

        <div className="header-center">
          <div className="search-bar">
            <input type="text" placeholder="nike" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
            <button className="camera-button">
              <img src="camera-icon.png" alt="Camera" />
            </button>
            <button className="search-button">Search</button>
          </div>
        </div>

        <div className="header-right">
          <button className="apply-button">Apply for Trademark</button>
        </div>
      </header>

      {/* Navigation Bar placed below the header */}
      <nav className="main-nav">
        <ul>
          <li className="active">TM Trademarks</li>
          <li>Owners</li>
          <li>Logos</li>
          <li>Internet Brand Search</li>
          <li>Copyrights</li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
