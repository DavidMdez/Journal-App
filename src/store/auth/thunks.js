import { singWithEmailPassword, registerUserWithEmailPassword, singInWithGoogle, logoutFirabase } from "../../firebase/provider";
import { clearNoteLogout } from "../journal";
import { checkingCredentials, login, logout } from "./"

export const checkingAuthnetication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  }
}

export const startGoogleSingIn = () => {
  return async (dispatch) => {

    dispatch(checkingCredentials());

    const result = await singInWithGoogle();

    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));
  }
}

export const startCreateUserWithEmailPassword = ({ email, password, displayName }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, displayName, email, photoURL }));
  }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, displayName, photoURL, errorMessage } = await singWithEmailPassword({ email, password });
    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ ok, uid, displayName, email, photoURL }));
  }
}

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirabase();
    dispatch(clearNoteLogout())
    dispatch(logout());
  }
}