import React, { Component } from 'react';
import Header from '../components/Header';

class Profile extends Component {
  render() {
    return (
      <div>
        <Header title="Profile" search={ false } />
        Profile
      </div>
    );
  }
}

export default Profile;
