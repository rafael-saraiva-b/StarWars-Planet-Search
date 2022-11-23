import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

test('testa tudo', async() => {
  render(<App />);
  const carregando = screen.getByRole('heading');
  expect(carregando).toBeInTheDocument();
  waitForElementToBeRemoved(carregando,{timeout:2000});
  const table = await screen.findByRole('table');
  expect(table).toBeInTheDocument();
  const buscar = screen.getByTestId('name-filter')
  expect(buscar).toBeInTheDocument();
  userEvent.type(buscar,'oo')
  const selectCollum = screen.getAllByRole('combobox')[0]
  userEvent.selectOptions(selectCollum,'diameter')
  const selectCompa = screen.getAllByRole('combobox')[1]
  userEvent.selectOptions(selectCompa,'igual a')
  const value = screen.getByTestId('value-filter')
  userEvent.type(value,'120000')
  const filtrar = screen.getByTestId('button-filter')
  userEvent.click(filtrar)

});
