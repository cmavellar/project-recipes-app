import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import SearchBar from './SearchBar';
/* import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg'; */
import lupa from '../images/lupa.png';
import profile from '../images/profile.png';
import '../styles/header.css';

function Header() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const {
    title, search, showHeader,
  } = useContext(MyContext);
  const newTitle = title.length > 0 ? title[0].toUpperCase() + title.substr(1) : '';
  const history = useHistory();
  const sendProfile = () => {
    history.push('/profile');
  };

  return (
    <div>
      { showHeader && (
        <div className="header-container">
          <h1 className="header-title" data-testid="page-title">{ newTitle }</h1>
          <div className="buttons-div">
            <button
              className="header-button"
              type="button"
              onClick={ sendProfile }
              alt="icone de perfil"
            >
              <img
                className="profile-icon"
                src={ profile }
                data-testid="profile-top-btn"
                alt="profile-icon"
              />
            </button>
            {
              search && (
                <button
                  className="header-button"
                  type="button"
                  onClick={ () => setShowSearchBar(!showSearchBar) }
                  alt="icone de pesquisa"
                >
                  <img
                    className="search-icon"
                    data-testid="search-top-btn"
                    src={ lupa }
                    alt="search-icon"
                  />
                </button>
              )
            }
          </div>
        </div>
      )}
      { showSearchBar && <SearchBar /> }
    </div>
  );
}

export default Header;
