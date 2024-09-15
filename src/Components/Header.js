import React, { useEffect } from "react";
import "./Header.css";
import logo from "../images/logo_trademarkia.png";
import cameraIcon from "../images/camera.png";
import ownersIcon from "../images/account.png";
import logosIcon from "../images/autumn.png";
import internetBrandIcon from "../images/internet.png";
import copyrightIcon from "../images/copy-right.png";
import trademarkIcon from "../images/trademark.png";

const Header = ({ setSearchTerm, searchTerm }) => {
  useEffect(() => { }, [searchTerm]);

  console.log(searchTerm);

  return (
    <>
      <header className="header">
        <div className="header-left">
          <div className="logo">
            {/* <h1>Trademarkia</h1> */}
            <img src={logo} alt="Trademarkia" />
          </div>
        </div>

        <div className="header-center">
          <div className="search-bar">
            <input
              type="text"
              placeholder="nike"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <button className="camera-button">
              <img src={cameraIcon} alt="Camera" />
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
        <ul className="active">
          <li href="#">
            <img src={trademarkIcon} alt="Trademarks" />
            Trademarks
          </li>
          <li href="#">
            <img src={ownersIcon} alt="Owners" />
            Owners
          </li>
          <li href="#">
            <img src={logosIcon} alt="Logos" />
            Logos
          </li>
          <li href="#">
            <img src={internetBrandIcon} alt="Internet Brand Search" />
            Internet Brand Search
          </li>
          <li href="#">
            <img src={copyrightIcon} alt="Copyrights" />
            Copyrights
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
