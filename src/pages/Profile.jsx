import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actLogout as logoutAction } from '../redux/actions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/Profile.css';

class Profile extends Component {
  state = {
    email: '',
  };

  componentDidMount() {
    this.fetchLocalStorage();
  }

  fetchLocalStorage = () => {
    try {
      const emailStorage = localStorage.getItem('user');
      const parsedObj = JSON.parse(emailStorage);
      const { email } = parsedObj;
      this.setState({
        email,
      });
    } catch (e) { console.log(e); }
  };

  handleRedirect = (route) => {
    const { history } = this.props;
    history.push(route);
  };

  handleLogout = async () => {
    const { history, actLogout } = this.props;
    actLogout();
    localStorage.clear();
    // localStorage.removeItem('user');
    history.push('/');
  };

  render() {
    const { email } = this.state;
    return (
      <div>
        <Header title="Profile" search={ false } />
        <h4 className="text-center mt-5 email" data-testid="profile-email">{email}</h4>
        <div className="container d-flex justify-content-center mt-5">
          <button
            className="btn"
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => this.handleRedirect('/done-recipes') }
          >
            Done Recipes
          </button>
          <button
            className="btn"
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => this.handleRedirect('/favorite-recipes') }
          >
            Favorite Recipes
          </button>
          <button
            className="btn"
            type="button"
            data-testid="profile-logout-btn"
            onClick={ this.handleLogout }
          >
            Logout
          </button>
        </div>

        <Footer />
      </div>
    );
  }
}

Profile.propTypes = {
  email: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  actLogout: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  actLogout: (state) => dispatch(logoutAction(state)),
});

export default connect(null, mapDispatchToProps)(Profile);
