import { registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/provider";
import { checkingCredentials, login, logout } from "./"

export const checkingAuthentication = ( email, password ) => {
  return async ( dispatch ) => {

    dispatch( checkingCredentials() );
  }
}

export const startGoogleSingIn = () => {
  return async ( dispatch ) => {

    dispatch( checkingCredentials() );

    const result = await singInWithGoogle();

    if ( !result.ok ) return dispatch( logout( result.errorMessage ) );

    dispatch( login( result ) );
  }
}

export const startCreateUserWithEmailPassword = ({ email, password, displayName }) => {
  return async ( dispatch ) => {
    dispatch( checkingCredentials() );

    const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });

    if ( !ok ) return dispatch( logout({ errorMessage }) );

    dispatch( login({ uid, displayName, email, photoURL }) );
  }
}