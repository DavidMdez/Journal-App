import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux";
import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import { setActiveNote } from "../../store/journal";
import './styless.css'

export const SideBarItem = ({ title = '', body, id, date, imageUrls = [], setViewSide }) => {

  const { active } = useSelector( state => state.journal );

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

  const select = id === active?.id;

  return (
      <ListItem disablePadding style={{ backgroundColor: select ? '#262254' : '', color: select ? 'white' : '' }}>
        <ListItemButton onClick={ onActiveNote } >
          <ListItemIcon>
            <TurnedInNot color={ select ? 'error' : '' } />
          </ListItemIcon>

          <Grid container direction='column' >
            <ListItemText primary={ newTitle } />
            <ListItemText secondary={<span style={{ color: select ? 'white' : ''}}> {body} </span>} className="truncate"/>
          </Grid>
        </ListItemButton>
      </ListItem>
  )
}
