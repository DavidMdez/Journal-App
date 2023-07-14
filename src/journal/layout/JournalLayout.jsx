import { Box, Toolbar } from "@mui/material"
import { NavBar, SideBar } from "../components";
import { useState } from "react";


const drawerWidth = 280;

export const JournalLayout = ({ children }) => {
  const [viewSide, setViewSide] = useState(false)

  return (
    <Box sx={{ display: 'flex' }} className="animate__animated animate__fadeIn animate__faster">
      <NavBar drawerWidth={ drawerWidth } setViewSide={ setViewSide } />

      <SideBar drawerWidth={ drawerWidth } viewSide={ viewSide } setViewSide={ setViewSide } />

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
        <Toolbar />
        { children }
      </Box>
    </Box>
  )
}
