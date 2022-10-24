import React from 'react';
import { screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Redirecione a pessoa usuária para a tela de perfil ao clicar no botão de perfil', () => {
  test('A rota muda para a tela de perfil /profile', () => {
    renderWithRouter(<Header title="header" />);

    const profileLink = screen.getByTestId('profile-top-btn');
    const searchLink = screen.getByTestId('search-top-btn');

    expect(profileLink).toBeInTheDocument();
    expect(searchLink).toBeInTheDocument();
  });
});
