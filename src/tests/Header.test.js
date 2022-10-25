import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Redirecione a pessoa usuária para a tela de perfil ao clicar no botão de perfil', () => {
  test('A rota muda para a tela de perfil /profile', () => {
    renderWithRouterAndRedux(<Header title="header" />);

    const profileLink = screen.getByTestId('profile-top-btn');
    const searchLink = screen.getByTestId('search-top-btn');

    expect(profileLink).toBeInTheDocument();
    expect(searchLink).toBeInTheDocument();
  });

  test('Se ao clicar na lupa aparece o campo para pesquisar', () => {
    renderWithRouterAndRedux(<Header title="meal" />);
    const searchIcon = screen.getByTestId('search-top-btn');
    act(() => {
      userEvent.click(searchIcon);
    });
    const searchInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const searchBtn = screen.getByTestId('exec-search-btn');
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
  });

  test('', () => {
    renderWithRouterAndRedux(<Header title="Meals" />);
    const searchIcon = screen.getByTestId('search-top-btn');
    act(() => {
      userEvent.click(searchIcon);
    });
    const searchInput = screen.getByTestId('search-input');
    const searchBtn = screen.getByTestId('exec-search-btn');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');

    act(() => {
      userEvent.type(searchInput, 'chicken');
      userEvent.click(ingredientRadio);
      userEvent.click(searchBtn);
    });
  });
});
