import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { SideBarItem } from "./SideBarItem";
import React from "react";

const ViewListSide = ({ drawerWidth, displayName, notes = [], setViewSide }) => {
  return (
    <>
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
            <SideBarItem key={ note.id } {...note} setViewSide={ setViewSide } />
          ))
        }
      </List>
    </>
  )
}

export const SideBar = ({ drawerWidth = 280, viewSide, setViewSide }) => {
  
  const { displayName } = useSelector( state => state.auth );
  const { notes } = useSelector( state => state.journal );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }}}
    >
      <Drawer
        open={ viewSide }
        onClose={ () => setViewSide(false) }
        sx={{ display: { sm: 'none' }  }}
      >
        <ViewListSide drawerWidth={ drawerWidth } displayName={ displayName } notes={ notes } setViewSide={ setViewSide } />
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{ display: { sm: 'flex', xs: 'none' }  }}
      > 
        <ViewListSide drawerWidth={ drawerWidth } displayName={ displayName } notes={ notes } setViewSide={ setViewSide } />
      </Drawer>
    </Box>
  )
}
