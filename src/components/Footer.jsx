import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/components/Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer data-testid="footer" className="fixed-bottom">
        <Link to="/drinks">
          <img
            src={ drinkIcon }
            alt="Icon Bebidas"
            data-testid="drinks-bottom-btn"
          />
        </Link>
        <Link to="/meals">
          <img
            className="svg"
            src={ mealIcon }
            alt="Icon comidas"
            data-testid="meals-bottom-btn"
          />
        </Link>
      </footer>
    );
  }
}

export default Footer;
