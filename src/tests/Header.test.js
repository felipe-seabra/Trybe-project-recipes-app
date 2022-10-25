import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import oneDrink from '../../cypress/mocks/oneDrink';

describe('Redirecione a pessoa usuária para a tela de perfil ao clicar no botão de perfil', () => {
  // test ids
  const SEARCH_TOP_TEST_ID = 'search-top-btn';
  const SEARCH_INPUT_TEST_ID = 'search-input';
  const SEARCH_BTN_TEST_ID = 'exec-search-btn';

  test('A rota muda para a tela de perfil /profile', () => {
    renderWithRouterAndRedux(<Header title="header" />);

    const profileLink = screen.getByTestId('profile-top-btn');
    const searchLink = screen.getByTestId(SEARCH_TOP_TEST_ID);

    expect(profileLink).toBeInTheDocument();
    expect(searchLink).toBeInTheDocument();
  });

  test('Se ao clicar na lupa aparece o campo para pesquisar', () => {
    renderWithRouterAndRedux(<Header title="meal" />);
    const searchIcon = screen.getByTestId(SEARCH_TOP_TEST_ID);
    act(() => {
      userEvent.click(searchIcon);
    });
    const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const searchBtn = screen.getByTestId(SEARCH_BTN_TEST_ID);
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
  });

  test('', () => {
    renderWithRouterAndRedux(<Header title="Meals" />);
    const searchIcon = screen.getByTestId(SEARCH_TOP_TEST_ID);
    act(() => {
      userEvent.click(searchIcon);
    });
    const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    const searchBtn = screen.getByTestId(SEARCH_BTN_TEST_ID);
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');

    act(() => {
      userEvent.type(searchInput, 'chicken');
      userEvent.click(ingredientRadio);
      userEvent.click(searchBtn);
    });
  });

  test('', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });

    const searchIcon = screen.getByTestId(SEARCH_TOP_TEST_ID);
    act(() => {
      userEvent.click(searchIcon);
    });

    const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    const searchBtn = screen.getByTestId(SEARCH_BTN_TEST_ID);
    const nameRadio = screen.getByTestId('name-search-radio');
    act(() => {
      userEvent.type(searchInput, 'Aquamarine');
      userEvent.click(nameRadio);
      userEvent.click(searchBtn);
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/178319');
    }, { timeout: 5000 });
  });
});
