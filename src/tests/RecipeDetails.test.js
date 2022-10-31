import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import meals from '../../cypress/mocks/meals';

describe('Testa página RecipeDetails', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
  });
  const FAVORITE_BTN_TEST_ID = 'favorite-btn';
  const PATH_TO_TEST = '/meals/52977';
  it('Ao clicar em uma receita, ele direciona corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(PATH_TO_TEST);
    });
    expect(history.location.pathname).toEqual(PATH_TO_TEST);

    const recipeTitle = screen.getByTestId('recipe-title');
    const favoriteButton = screen.getByTestId(FAVORITE_BTN_TEST_ID);
    const share = screen.getByTestId('share-btn');

    expect(share).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
  });

  it('É possível favoritar uma receita', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals/52771');
    });

    expect(screen.getByTestId(FAVORITE_BTN_TEST_ID)).toHaveAttribute('src', 'whiteHeartIcon.svg');

    act(() => {
      userEvent.click(screen.getByTestId(FAVORITE_BTN_TEST_ID));
    });
  });

  it('', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(PATH_TO_TEST);
    });
  });
});
