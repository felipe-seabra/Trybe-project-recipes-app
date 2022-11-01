import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
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
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push(PATH_TO_TEST);
    });
    expect(history.location.pathname).toEqual(PATH_TO_TEST);

    const recipeTitle = screen.getByTestId('recipe-title');
    const favoriteButton = screen.getByTestId(FAVORITE_BTN_TEST_ID);
    const share = screen.getByTestId('share-btn');
    const video = screen.getByTestId('video');

    expect(share).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
    expect(video).toBeInTheDocument();
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
  it('Se aparece alcoholic', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks/17222');
    });

    expect(history.location.pathname).toContain('drinks');

    await waitFor(() => {
      const alcoholic = screen.getByTestId('recipe-category');
      expect(alcoholic).toContain(/alcoholic/i);
    });
  });

  it('Se existe o botão favoritar', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks/17222');
    });

    screen.getByTestId(FAVORITE_BTN_TEST_ID).click().then(() => {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

      const expectedFavoriteRecipe = [
        {
          id: '17222',
          type: 'drink',
          nationality: '',
          category: 'Cocktail',
          alcoholicOrNot: 'Alcoholic',
          name: 'A1',
          image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
        },
      ];

      expect(favoriteRecipes).toEqual(expectedFavoriteRecipe);
    });
  });
});

// Object.assign(navigator, {
//   clipboard: {
//     writeText: () => {},
//   },
// });

// describe('Clipboard', () => {
//   it('writeText', () => {
//     jest.spyOn(navigator.clipboard, 'writeText');
//   });
// });

// describe('', () => {
//   it('', () => {
//     const { history } = renderWithRouterAndRedux(<App />);

//     act(() => {
//       history.push('/drinks/13501');
//     });

//     screen.getByTestId('share-btn').click();
//     jest.spyOn(navigator.clipboard, 'writeText');
//     expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/drinks/13501');
//   });
// });
