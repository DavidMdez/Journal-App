
import { logoutFirabase, singInWithGoogle, singWithEmailPassword } from "../../../src/firebase/provider";
import { checkingAuthnetication, checkingCredentials, login, logout, startGoogleSingIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth";
import { clearNoteLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/provider');

describe('Pruebas en AuthTunks', () => {
  const dispatch = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test('Pruebas de invocar el checkingAuthnetication', async () => {
    await checkingAuthnetication()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test('startGoogleSingIn debe de llamar checkingCredentials y login - Exito', async () => {

    const loginData = { ok: true, ...demoUser }
    await singInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSingIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('startGoogleSingIn debe de llamar checkingCredentials y login - Error', async () => {

    const loginData = { ok: false, errorMessage: 'Error' }
    await singInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSingIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test('startLoginWithEmailPassword debe de llamar checkingCredentials y login -Exito', async() => {
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: '123456' };

    await singWithEmailPassword.mockResolvedValue(loginData);

    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('startLoginWithEmailPassword debe de llamar checkingCredentials y login -Error', async() => {
    const loginData = { ok: false, errorMessage: 'Error'  };
    const formData = { email: demoUser.email, password: '123456' };

    await singWithEmailPassword.mockResolvedValue(loginData);

    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: loginData.errorMessage}));
  });

  test('startLogout debe de llamar logoutFirabase y clearNote y Logout', async() => {
    
    await startLogout()(dispatch);

    expect(logoutFirabase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(logout());
    expect(dispatch).toHaveBeenCalledWith(clearNoteLogout());
  });
});