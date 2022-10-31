import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import RenderWithContext from './helpers/RenderWithRouterContext';
import App from '../App';

describe('Verifica cobertura de teste de 45% da página Recipes', () => {
  it('Verifica se está na tela as informações', async () => {
    const { history } = RenderWithContext(<App />);
    history.push('/meals');
    const checkboxAll = await screen.findByTestId('All-category-filter');
    const checkBoxBeef = await screen.findByTestId('Beef-category-filter');
    const chekcboxBreakfast = await screen.findByTestId('Breakfast-category-filter');
    const constChicken = await screen.findByTestId('Chicken-category-filter');
    const clickDring = await screen.findByTestId('drinks-bottom-btn');

    expect(checkboxAll).toBeInTheDocument();
    expect(checkBoxBeef).toBeInTheDocument();
    expect(chekcboxBreakfast).toBeInTheDocument();
    expect(constChicken).toBeInTheDocument();
    expect(clickDring).toBeInTheDocument();

    userEvent.click(chekcboxBreakfast);
    const mealZero = await screen.findByTestId('0-recipe-card');
    const mealOne = await screen.findByTestId('1-recipe-card');
    const mealTwo = await screen.findByTestId('2-recipe-card');
    const mealThree = await screen.findByTestId('3-recipe-card');
    const mealFour = await screen.findByTestId('4-recipe-card');
    const mealFive = await screen.findByTestId('5-recipe-card');
    const mealSix = await screen.findByTestId('6-recipe-card');
    const mealSeven = await screen.findByTestId('7-recipe-card');
    const mealEight = await screen.findByTestId('8-recipe-card');
    const mealNine = await screen.findByTestId('9-recipe-card');
    const mealTen = await screen.findByTestId('10-recipe-card');
    const mealeleven = await screen.findByTestId('11-recipe-card');

    expect(mealZero).toBeInTheDocument();
    expect(mealOne).toBeInTheDocument();
    expect(mealTwo).toBeInTheDocument();
    expect(mealThree).toBeInTheDocument();
    expect(mealFour).toBeInTheDocument();
    expect(mealFive).toBeInTheDocument();
    expect(mealSix).toBeInTheDocument();
    expect(mealSeven).toBeInTheDocument();
    expect(mealEight).toBeInTheDocument();
    expect(mealNine).toBeInTheDocument();
    expect(mealTen).toBeInTheDocument();
    expect(mealeleven).toBeInTheDocument();

    userEvent.click(checkboxAll);

    const allbtnMealsZero = await screen.findByTestId('0-recipe-card');
    const allbtnMealsOne = await screen.findByTestId('1-recipe-card');
    const allbtnMealsTwo = await screen.findByTestId('2-recipe-card');
    const allbtnMealsThree = await screen.findByTestId('3-recipe-card');
    const allbtnMealsFour = await screen.findByTestId('4-recipe-card');
    const allbtnMealsFive = await screen.findByTestId('5-recipe-card');
    const allbtnMealsSix = await screen.findByTestId('6-recipe-card');
    const allbtnMealsSeven = await screen.findByTestId('7-recipe-card');
    const allbtnMealsEight = await screen.findByTestId('8-recipe-card');
    const allbtnMealsNine = await screen.findByTestId('9-recipe-card');
    const allbtnMealsTen = await screen.findByTestId('10-recipe-card');
    const allbtnMealseleven = await screen.findByTestId('11-recipe-card');

    expect(allbtnMealsZero).toBeInTheDocument();
    expect(allbtnMealsOne).toBeInTheDocument();
    expect(allbtnMealsTwo).toBeInTheDocument();
    expect(allbtnMealsThree).toBeInTheDocument();
    expect(allbtnMealsFour).toBeInTheDocument();
    expect(allbtnMealsFive).toBeInTheDocument();
    expect(allbtnMealsSix).toBeInTheDocument();
    expect(allbtnMealsSeven).toBeInTheDocument();
    expect(allbtnMealsEight).toBeInTheDocument();
    expect(allbtnMealsNine).toBeInTheDocument();
    expect(allbtnMealsTen).toBeInTheDocument();
    expect(allbtnMealseleven).toBeInTheDocument();

    expect(mealZero).not.toBeInTheDocument();
    expect(mealOne).not.toBeInTheDocument();
    expect(mealTwo).not.toBeInTheDocument();
    expect(mealThree).not.toBeInTheDocument();
    expect(mealFour).not.toBeInTheDocument();
    expect(mealFive).not.toBeInTheDocument();
    expect(mealSix).not.toBeInTheDocument();
    expect(mealSeven).not.toBeInTheDocument();
    expect(mealEight).not.toBeInTheDocument();
    expect(mealNine).not.toBeInTheDocument();
    expect(mealTen).not.toBeInTheDocument();
    expect(mealeleven).not.toBeInTheDocument();
  });

  it('Testa os clicks da imagem', async () => {
    const { history } = RenderWithContext(<App />);
    history.push('/meals');
    const btnProfile = await screen.findByTestId('profile-top-btn');
    act(() => {
      userEvent.click(btnProfile);
    });
    const { location: { pathname } } = history;
    expect(pathname).toBe('/profile');
  });

  it('Testa se ao clicar no botão drinks a página se altera', async () => {
    const { history } = RenderWithContext(<App />);
    history.push('/drinks');

    const { location: { pathname } } = history;

    expect(pathname).toBe('/drinks');
    const drinkZero = await screen.findByTestId('0-recipe-card');
    const drinkOne = await screen.findByTestId('1-recipe-card');
    const drinkTwo = await screen.findByTestId('2-recipe-card');
    const drinkThree = await screen.findByTestId('3-recipe-card');
    const drinkFour = await screen.findByTestId('4-recipe-card');
    const drinkFive = await screen.findByTestId('5-recipe-card');
    const drinkSix = await screen.findByTestId('6-recipe-card');
    const drinkSeven = await screen.findByTestId('7-recipe-card');
    const drinkEight = await screen.findByTestId('8-recipe-card');
    const drinkNine = await screen.findByTestId('9-recipe-card');
    const drinkTen = await screen.findByTestId('10-recipe-card');
    const drinkeleven = await screen.findByTestId('11-recipe-card');
    const verifyAllDrink = await screen.findByTestId('All-category-filter');
    expect(verifyAllDrink).toBeInTheDocument();

    expect(verifyAllDrink).toBeInTheDocument();
    expect(drinkZero).toBeInTheDocument();
    expect(drinkOne).toBeInTheDocument();
    expect(drinkTwo).toBeInTheDocument();
    expect(drinkThree).toBeInTheDocument();
    expect(drinkFour).toBeInTheDocument();
    expect(drinkFive).toBeInTheDocument();
    expect(drinkSix).toBeInTheDocument();
    expect(drinkSeven).toBeInTheDocument();
    expect(drinkEight).toBeInTheDocument();
    expect(drinkNine).toBeInTheDocument();
    expect(drinkTen).toBeInTheDocument();
    expect(drinkeleven).toBeInTheDocument();
  });
});
