import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Meals extends Component {
  render() {
    return (
      <div>
        <Header title="Meals" />
        <Footer />
      </div>
    );
  }
}

export default Meals;
