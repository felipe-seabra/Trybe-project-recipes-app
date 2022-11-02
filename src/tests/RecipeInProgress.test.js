import React from 'react';
import { screen, act, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithContext from './helpers/RenderWithRouterContext';
import App from '../App';
import drinks from '../../cypress/mocks/drinks';
import meals from '../../cypress/mocks/meals';
import { setLocalStorage } from '../services/localStorage';

const FINISH_TEST_ID = 'finish-recipe-btn';
describe('Testa o componente RecipeInProgress com drink', () => {
  beforeEach(() => {
    const favoriteMock = {
      id: '52977',
      type: 'meal',
      nationality: 'Turkish',
      category: 'Side',
      alcoholicOrNot: '',
      name: 'Corba',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    };
    setLocalStorage('favoriteRecipes', [favoriteMock]);
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
    localStorage.clear();
  });

  const DRINK_PATH_TO_TEST = '/drinks/15997/in-progress';

  it('Se existe o botão Finish Recipe', async () => {
    const { history } = RenderWithContext(<App />);

    act(() => {
      history.push(DRINK_PATH_TO_TEST);
    });

    const btnFinish = screen.getByTestId(FINISH_TEST_ID);
    expect(btnFinish).toBeInTheDocument();
  });

  it('Se existe o botão favorite', async () => {
    const { history } = RenderWithContext(<App />);

    act(() => {
      history.push(DRINK_PATH_TO_TEST);
    });

    const btnFavorite = screen.getByTestId('favorite-btn');

    const recipleTitle = await screen.findByRole('heading', {
      name: /gg/i,
    });
    expect(recipleTitle).toBeInTheDocument();

    userEvent.click(btnFavorite);
    userEvent.click(btnFavorite);
  });

  it('É direcionado à pagina doneRecipes ao terminar a receita', async () => {
    const { history } = RenderWithContext(<App />);

    act(() => {
      history.push(DRINK_PATH_TO_TEST);
    });

    const recipleTitle = await screen.findByRole('heading', {
      name: /gg/i,
    });
    expect(recipleTitle).toBeInTheDocument();

    const ingredientOne = screen.getByTestId('0-ingredient-step');
    const step1 = within(ingredientOne).getByRole('checkbox');
    expect(step1).toBeInTheDocument();

    const ingredientTwo = screen.getByTestId('1-ingredient-step');
    const step2 = within(ingredientTwo).getByRole('checkbox');
    expect(step2).toBeInTheDocument();

    const ingredientThree = screen.getByTestId('2-ingredient-step');
    const step3 = within(ingredientThree).getByRole('checkbox');
    expect(step3).toBeInTheDocument();

    act(() => {
      userEvent.click(step1);
      userEvent.click(step1);
      userEvent.click(step2);
      userEvent.click(step3);
    });

    const finishButton = screen.queryByTestId(FINISH_TEST_ID);
    expect(finishButton).not.toBeEnabled();

    act(() => {
      userEvent.click(step1);
    });
    expect(finishButton).toBeEnabled();

    act(() => {
      userEvent.click(finishButton);
    });

    expect(history.location.pathname).toEqual('/done-recipes');
  });
});

describe('Testa o componente RecipeInProgress com comida', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    localStorage.clear();
  });

  afterEach(() => {
    global.fetch.mockClear();
    localStorage.clear();
  });

  const MEAL_PATH_TO_TEST = '/meals/52977/in-progress';
  it('Adiciona aos favoritos a receita', async () => {
    const { history } = RenderWithContext(<App />);

    act(() => {
      history.push(MEAL_PATH_TO_TEST);
    });

    const mealTitle = await screen.findByRole('heading', {
      name: /corba/i,
    });

    expect(mealTitle).toBeInTheDocument();

    const btnFavorite = screen.getByTestId('favorite-btn');
    act(() => {
      userEvent.click(btnFavorite);
      userEvent.click(btnFavorite);
    });
  });

  it('É direcionado à pagina doneRecipes ao terminar a receita', async () => {
    const { history } = RenderWithContext(<App />);

    act(() => {
      history.push(MEAL_PATH_TO_TEST);
    });

    const recipleTitle = await screen.findByRole('heading', {
      name: /corba/i,
    });
    expect(recipleTitle).toBeInTheDocument();

    const ingredient0 = screen.getByTestId('0-ingredient-step');
    const step0 = within(ingredient0).getByRole('checkbox');
    expect(step0).toBeInTheDocument();

    const ingredient1 = screen.getByTestId('1-ingredient-step');
    const step1 = within(ingredient1).getByRole('checkbox');
    expect(step1).toBeInTheDocument();

    const ingredient2 = screen.getByTestId('2-ingredient-step');
    const step2 = within(ingredient2).getByRole('checkbox');
    expect(step2).toBeInTheDocument();

    const ingredient3 = screen.getByTestId('3-ingredient-step');
    const step3 = within(ingredient3).getByRole('checkbox');
    expect(step3).toBeInTheDocument();

    const ingredient4 = screen.getByTestId('4-ingredient-step');
    const step4 = within(ingredient4).getByRole('checkbox');
    expect(step4).toBeInTheDocument();

    const ingredient5 = screen.getByTestId('5-ingredient-step');
    const step5 = within(ingredient5).getByRole('checkbox');
    expect(step5).toBeInTheDocument();

    const ingredient6 = screen.getByTestId('6-ingredient-step');
    const step6 = within(ingredient6).getByRole('checkbox');
    expect(step6).toBeInTheDocument();

    const ingredient7 = screen.getByTestId('7-ingredient-step');
    const step7 = within(ingredient7).getByRole('checkbox');
    expect(step7).toBeInTheDocument();

    const ingredient8 = screen.getByTestId('8-ingredient-step');
    const step8 = within(ingredient8).getByRole('checkbox');
    expect(step8).toBeInTheDocument();

    const ingredient9 = screen.getByTestId('9-ingredient-step');
    const step9 = within(ingredient9).getByRole('checkbox');
    expect(step9).toBeInTheDocument();

    const ingredient10 = screen.getByTestId('10-ingredient-step');
    const step10 = within(ingredient10).getByRole('checkbox');
    expect(step10).toBeInTheDocument();

    const ingredient11 = screen.getByTestId('11-ingredient-step');
    const step11 = within(ingredient11).getByRole('checkbox');
    expect(step11).toBeInTheDocument();

    const ingredient12 = screen.getByTestId('12-ingredient-step');
    const step12 = within(ingredient12).getByRole('checkbox');
    expect(step12).toBeInTheDocument();

    act(() => {
      userEvent.click(step0);
      userEvent.click(step0);
      userEvent.click(step1);
      userEvent.click(step2);
      userEvent.click(step3);
      userEvent.click(step4);
      userEvent.click(step5);
      userEvent.click(step6);
      userEvent.click(step7);
      userEvent.click(step8);
      userEvent.click(step9);
      userEvent.click(step10);
      userEvent.click(step11);
      userEvent.click(step12);
    });

    const finishButton = screen.queryByTestId(FINISH_TEST_ID);
    expect(finishButton).not.toBeEnabled();

    act(() => {
      userEvent.click(step0);
    });
    expect(finishButton).toBeEnabled();

    act(() => {
      userEvent.click(finishButton);
    });

    expect(history.location.pathname).toEqual('/done-recipes');
  });
});
