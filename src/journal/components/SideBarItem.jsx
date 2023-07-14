import { useMemo } from "react"
import { useDispatch } from "react-redux";
import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import { setActiveNote } from "../../store/journal";

export const SideBarItem = ({ title = '', body, id, date, imageUrls = [], setViewSide }) => {

  const newTitle = useMemo(() => {
    return title.length > 17
      ? title.substring(0, 17) + '...'
      : title
  }, [title]);
  
  const dispath = useDispatch();

  const onActiveNote = () => {
    dispath( setActiveNote({ title, body, id, date, imageUrls }) );
    setViewSide( false );
  }

  return (
      <ListItem disablePadding>
        <ListItemButton onClick={ onActiveNote } >
          <ListItemIcon>
            <TurnedInNot />
          </ListItemIcon>

          <Grid container direction='column'>
            <ListItemText primary={ newTitle } />
            <ListItemText secondary={ body } />
          </Grid>
        </ListItemButton>
      </ListItem>
  )
}
