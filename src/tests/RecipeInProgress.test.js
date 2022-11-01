import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import drinks from '../../cypress/mocks/drinks';

describe('Testa o componente RecipeInProgress', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it('Se existe o botão Start Recipe', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/drinks/15997');
    });

    const btnStart = screen.getByTestId('start-recipe-btn');
    expect(btnStart).toBeInTheDocument();

    act(() => {
      userEvent.click(btnStart);
    });

    await waitFor(() => {
      expect(history.location.pathname).toEqual('/drinks/undefined/in-progress');
    }, {
      timeout: 3000,
    });
  });
});
