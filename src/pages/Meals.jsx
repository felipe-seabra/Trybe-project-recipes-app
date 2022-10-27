import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ButtonFilter from '../components/ButtonFilter';

class Meals extends Component {
  render() {
    return (
      <div>
        <Header title="Meals" />
        <ButtonFilter />
        <Footer />
      </div>
    );
  }
}

export default Meals;
