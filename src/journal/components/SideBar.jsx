import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { SideBarItem } from "./SideBarItem";


export const SideBar = ({ drawerWidth = 280 }) => {
  
  const { displayName } = useSelector( state => state.auth );
  const { notes } = useSelector( state => state.journal );

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
            notes.map( note => (
              <SideBarItem key={ note.id } {...note} />
            ))
          }
        </List>
      </Drawer>
    </Box>
  )
}
