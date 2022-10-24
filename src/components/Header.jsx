import React, { Component } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

class Header extends Component {
  state = {
    activate: false,
  };

  handleClick = () => {
    this.setState((prevState) => ({ activate: !prevState.activate }));
  };

  render() {
    const { title, search = true } = this.props;
    const { activate } = this.state;
    return (
      <header>
        <div>
          <img
            src={ profileIcon }
            alt="Imagem de perfil"
            data-testid="profile-top-btn"
          />
          {
            search
          && (
            <button type="button" onClick={ this.handleClick }>
              <img
                src={ searchIcon }
                alt="Ícone de pesquisa"
                data-testid="search-top-btn"
              />
            </button>)
          }
          <h1 data-testid="page-title">{title}</h1>
        </div>

        {activate && (
          <div>
            <label htmlFor="search">
              <input data-testid="search-input" placeholder="Search" id="search" />
            </label>
            <SearchBar />
          </div>
        )}
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
  search: PropTypes.bool,
}.isRequired;

export default Header;
