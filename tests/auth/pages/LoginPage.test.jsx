import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth";

describe('Prueba en <Login Page />', () => {

  const store = configureStore({
    reducer: {
      auth: authSlice.reducer
    },
  });

  test('debe de mostrar el componente correctamente', () => { 

    render(
      <Provider store={store} >
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    // screen.debug();
    expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);
  });
});