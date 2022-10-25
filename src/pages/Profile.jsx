import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Profile extends Component {
  render() {
    return (
      <div>
        <Header title="Profile" search={ false } />
        <Footer />
      </div>
    );
  }
}

export default Profile;
