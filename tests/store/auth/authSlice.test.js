import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures";

describe('Pruebas en authSlice', () => { 
 
  test('debe de regresar el esatdo inicail y llamarse auth', () => { 
    
    expect( authSlice.name ).toBe('auth');
    const state = authSlice.reducer( initialState, {} );
    
    expect( state ).toEqual( initialState );
  });

  test('debe de realizar la autenticacion', () => { 
    const state = authSlice.reducer( initialState, login( demoUser ) );
    
    expect( state ).toEqual({
      status: 'authenticated',
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null
    })
  });

  test('debe de realizar el logout', () => {
    const state = authSlice.reducer( authenticatedState, logout({ errorMessage: null }) );
    expect( state ).toEqual( notAuthenticatedState );
  });

  test('debe de realizar el logout con error', () => {
    const errorMessage = 'Credenciales no son correctas';
    const state = authSlice.reducer( authenticatedState, logout({ errorMessage }) );

    expect( state ).toEqual({
      status: 'not-authenticated',
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: errorMessage
    });
  });

  test('debe de cambiar el state a cheacking', () => {
    const state = authSlice.reducer( authenticatedState, checkingCredentials() );
    expect( state.status ).toBe( 'checking' );
  });
})