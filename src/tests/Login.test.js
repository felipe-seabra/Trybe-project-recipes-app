import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testando o componente Login', () => {
  it('Verificando se a pagina login tem o comportamento desejado', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
    const password = screen.getByTestId('password-input');
    const emailInput = screen.getByTestId('email-input');
    const loginButton = screen.getByTestId('login-submit-btn');
    expect(password).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();

    userEvent.type(password, 'abc1234');
    userEvent.type(emailInput, 'abc@hotmail.com');
    expect(password.value).toBe('abc1234');
    expect(emailInput.value).toBe('abc@hotmail.com');
    expect(loginButton).toBeEnabled();
    userEvent.click(loginButton);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals');
    }, { timeout: 5000 });
  });
});
