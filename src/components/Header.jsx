import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/components/Header.css';

class Header extends Component {
  state = {
    activate: false,
    searchInput: '',
  };

  handleClick = () => {
    this.setState((prevState) => ({ activate: !prevState.activate }));
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { title, search = true } = this.props;
    const { activate, searchInput } = this.state;
    return (
      <header>
        <div className="header">
          <Link to="/profile">
            <img
              src={ profileIcon }
              alt="Imagem de perfil"
              data-testid="profile-top-btn"
            />
          </Link>
          {
            search
          && (
            <button
              className="icon-search"
              type="button"
              onClick={ this.handleClick }
            >
              <img
                src={ searchIcon }
                alt="Ícone de pesquisa"
                data-testid="search-top-btn"
              />
            </button>)
          }
        </div>
        <h1 data-testid="page-title">{title}</h1>

        {activate && (
          <div className="filters">
            <label htmlFor="search">
              <input
                data-testid="search-input"
                placeholder="Search"
                id="search"
                name="searchInput"
                value={ searchInput }
                onChange={ this.handleChange }
              />
              <h1> teste</h1>
            </label>
            <SearchBar place={ title } searchInput={ searchInput } />
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
