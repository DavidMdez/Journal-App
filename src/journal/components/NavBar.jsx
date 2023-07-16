import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { useDispatch } from "react-redux";
import { startLogout } from "../../store/auth";

export const NavBar = ({ drawerWidth = 280, setViewSide }) => {

  const dispatch = useDispatch();
  
  const onLogout = () => {
    dispatch( startLogout() );
  }

  return (
    <AppBar 
      position='fixed'
      sx={{ 
        width: { sm: `calc(100% - ${ drawerWidth }px)` },
        ml: { sm: `${ drawerWidth }px` }
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { sm: 'none' } }}
          onClick={ () =>  setViewSide( true ) }
        >
          <MenuOutlined />
        </IconButton>

        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" noWrap component="div" > JounalApp </Typography>
          <IconButton
            color="error"
            onClick={ onLogout }
            aria-label="salir"
          >
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
