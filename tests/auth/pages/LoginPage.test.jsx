import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartGoogleSingIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
  startGoogleSingIn: () => mockStartGoogleSingIn,
  startLoginWithEmailPassword: ({ email, password }) => {
    return () => mockStartLoginWithEmailPassword({ email, password });
  }
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn(),
}));

describe('Prueba en <Login Page />', () => {

  beforeEach(() => jest.clearAllMocks());

  const store = configureStore({
    reducer: {
      auth: authSlice.reducer
    },
    preloadedState: {
      auth: notAuthenticatedState
    }
  });

  test('debe de mostrar el componente correctamente', () => {

    render(
      <Provider store={store} >
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    // screen.debug();
    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
  });

  test('boton de google deve de llamar el startGoogleSignIn', () => {

    render(
      <Provider store={store} >
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const googleBtn = screen.getByLabelText('google-btn');
    fireEvent.click(googleBtn);

    expect(mockStartGoogleSingIn).toHaveBeenCalled();
  });

  test('submit del formulario debe de llamar el startLoginWithEmailPassword', () => {
    
    const email = 'davia@gmail.com';
    const password = '123456';

    render(
      <Provider store={store} >
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole('textbox', { name: 'Correo' });
    fireEvent.change(emailField, { target: { name: 'email', value: email } });

    const passwordField = screen.getByTestId('password');
    fireEvent.change(passwordField, { target: { name: 'password', value: password } });

    const loginForm = screen.getByLabelText('submit-form');
    fireEvent.submit(loginForm);

    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({ email, password });

  });
});