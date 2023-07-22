import LogoutOutlined from "@mui/icons-material/LogoutOutlined"
import MenuOutlined from "@mui/icons-material/MenuOutlined"
import AppBar from "@mui/material/AppBar"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

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
