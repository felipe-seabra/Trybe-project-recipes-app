import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setLocalStorage } from '../services/localStorage';
import { actLogin as loginAction } from '../redux/actions';
import '../styles/pages/Login.css';

class Login extends React.Component {
  state = {
    password: '',
    email: '',
  };

  handleChange = ({ target }) => {
    const {
      name, value,
    } = target;
    this.setState({ [name]: value });
  };

  verifyBtn = () => {
    const { password, email } = this.state;
    const MIN_LENGTH = 6;
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    return !(password.length > MIN_LENGTH && emailRegex.test(email));
  };

  handleLogin = async () => {
    const { history, actLogin } = this.props;
    const { email } = this.state;
    actLogin(this.state);
    setLocalStorage('user', { email });
    history.push('/meals');
  };

  render() {
    const { password, email } = this.state;
    return (
      <div className="login">
        <section className="login-inputs">
          <input
            type="email"
            placeholder="Qual é o seu e-mail?"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            data-testid="password-input"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
        </section>
        <div className="link">
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ this.verifyBtn() }
            onClick={ this.handleLogin }
          >
            Entrar
          </button>
        </div>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actLogin: (state) => dispatch(loginAction(state)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
