import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { SideBarItem } from "./SideBarItem";
import React from "react";

const ViewListSide = ({ drawerWidth, displayName, notes = [], setViewSide, photoURL }) => {
  return (
    <>
      <Toolbar
      sx={{
        width: drawerWidth,
        overflow: 'none',
        padding: 0,
      }}
    >
      <Typography variant="h6" noWrap component="div" style={{ display: 'flex', alignItems: 'center', gap: '10px'}} sx={{ marginLeft: { sm: '0px', xs: '16px'  } }} >
        { photoURL &&
          <img
            src={ photoURL } 
            alt="Foto"
            style={{ borderRadius: '50%', width: '40px', height: '40px' }}
          />
        }
        <span className="truncateLine">{ displayName }</span>
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
  
  const { displayName, photoURL } = useSelector( state => state.auth );
  const { notes } = useSelector( state => state.journal );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }}}
    >
      <Drawer
        open={ viewSide }
        onClose={ () => setViewSide(false) }
        sx={{ display: { sm: 'none' } }}
      >
        <ViewListSide drawerWidth={ drawerWidth } displayName={ displayName } notes={ notes } setViewSide={ setViewSide } photoURL={ photoURL } />
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{ display: { sm: 'flex', xs: 'none' }  }}
      > 
        <ViewListSide drawerWidth={ drawerWidth } displayName={ displayName } notes={ notes } setViewSide={ setViewSide } photoURL={ photoURL } />
      </Drawer>
    </Box>
  )
}
