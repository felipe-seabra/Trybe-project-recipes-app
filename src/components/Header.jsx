import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

class Header extends Component {
  render() {
    const { title, search = true } = this.props;
    return (
      <div>
        <Link to="/profile">
          <img
            src={ profileIcon }
            alt="Imagem de perfil"
            data-testid="profile-top-btn"
          />
        </Link>
        {
          search
          && <img
            src={ searchIcon }
            alt="Ícone de pesquisa"
            data-testid="search-top-btn"
          />
        }
        <h1 data-testid="page-title">{title}</h1>
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};

export default Header;
