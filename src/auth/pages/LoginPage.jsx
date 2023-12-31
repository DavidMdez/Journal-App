import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import Google from "@mui/icons-material/Google";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useForm } from "../../hooks/useForm";
import { AuthLayout } from "../layout/AuthLayout";
import { startGoogleSingIn, startLoginWithEmailPassword } from "../../store/auth";

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {
 
  const { status, errorMessage } = useSelector( state => state.auth );
  const dispatch = useDispatch();

  const { email, password, onInputChange, formState } =  useForm(formData);

  const isAuthenticating = useMemo(() => status === 'checking', [status] )

  const onSubmit = ( event ) => {
    event.preventDefault();
    dispatch( startLoginWithEmailPassword( formState ) );
  }

  const onGoogleSingIn = () => {
    dispatch( startGoogleSingIn() );
  }

  return (
    <AuthLayout title="Login">
      <form 
        aria-label="submit-form"
        onSubmit={ onSubmit }
        className="animate__animated animate__fadeIn animate__faster">
        <Grid container>
          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField 
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              autoComplete="username"
              value={ email }
              onChange={ onInputChange }
            />
          </Grid>

          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField 
              inputProps={{ 
                'data-testid': 'password' 
              }}
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              autoComplete="current-password"
              name="password"
              value={ password }
              onChange={ onInputChange }
            />
          </Grid>

          
          <Grid container>
            <Grid
              item
              display={ !!errorMessage ? '' : 'none' }
              xs={ 12 } sx={{ mt: 1 }}>
              <Alert severity="error">{ errorMessage }</Alert>
            </Grid>
          </Grid>

          <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }} >
            <Grid item xs={ 12 } sm={ 6 } >
              <Button
                disabled={ isAuthenticating }
                type="submit" 
                variant="contained" 
                fullWidth>
                <Typography>Login</Typography>
              </Button>
            </Grid>
            
            <Grid item xs={ 12 } sm={ 6 } >
              <Button
                disabled={ isAuthenticating }
                variant="contained" 
                fullWidth
                aria-label="google-btn"
                onClick={ onGoogleSingIn }
              >
                <Google />
                <Typography sx={{ ml: 1 }}>
                  Google
                </Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={ RouterLink } color='inherit' to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
