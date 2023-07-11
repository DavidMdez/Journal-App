import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux"


export const SideBar = ({ drawerWidth = 280 }) => {

  const { displayName } = useSelector( state => state.auth );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open
      > 
        <Toolbar
          sx={{
            width: drawerWidth,
            overflow: 'none',
            padding: 0
          }}
        >
          <Typography variant="h6" noWrap component="div" >
            { displayName }
          </Typography>
        </Toolbar>
        <Divider />

        <List
          sx={{
            display: { xs: 'block' },
            boxSizing: 'border-box',
            width: drawerWidth,
            overflow: 'auto',
            padding: 0
          }}
        >
          {
            ['Enero', 'Febrero', 'Marzo', 'Abril'].map( text => (
              <ListItem key={ text } disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TurnedInNot />
                  </ListItemIcon>
 
                  <Grid container>
                    <ListItemText primary={ text } />
                    <ListItemText secondary={ 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.' } />
                  </Grid>
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
      </Drawer>
    </Box>
  )
}
