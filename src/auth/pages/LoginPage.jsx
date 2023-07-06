import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Google } from "@mui/icons-material"

import { AuthLayout } from "../layout/AuthLayout";
import { checkingAuthentication, startGoogleSingIn } from "../../store/auth";
import { useForm } from "../../hooks/useForm";

export const LoginPage = () => {
 
  const { status } = useSelector( state => state.auth );
  const dispatch = useDispatch();

  const { email, password, onInputChange } =  useForm({
    email: '',
    password: ''
  });

  const isAuthenticating = useMemo(() => status === 'checking', [status] )

  const onSubmit = ( event ) => {
    event.preventDefault();
    dispatch( checkingAuthentication() )
  }

  const onGoogleSingIn = () => {
    dispatch( startGoogleSingIn() )
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={ onSubmit } >
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
