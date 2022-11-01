import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithContext from './helpers/RenderWithRouterContext';
import App from '../App';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';

const FAVORITE_BTN_TEST_ID = 'favorite-btn';
const PATH_TO_TEST = '/meals/52977';
describe('Testa página RecipeDetails', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
  });
  it('Ao clicar em uma receita, ele direciona corretamente', async () => {
    const { history } = RenderWithContext(<App />);
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

    userEvent.click(favoriteButton);
    userEvent.click(favoriteButton);
  });
});

describe('Testa o drinks', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
  });
  it('Se aparece alcoholic e botão start', () => {
    const { history } = RenderWithContext(<App />);
    act(() => {
      history.push('/drinks/17222');
    });

    expect(history.location.pathname).toContain('drinks');

    const textAlcohol = screen.getByTestId('recipe-category');
    const btnStartRecipe = screen.getByTestId('start-recipe-btn');

    expect(textAlcohol).toBeInTheDocument();
    expect(btnStartRecipe).toBeInTheDocument();

    userEvent.click(btnStartRecipe);
  });
});
