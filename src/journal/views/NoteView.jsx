import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css'

import { ImagesGallery } from "../components"
import { useForm } from "../../hooks/useForm";
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFile } from "../../store/journal";
import { dateFormat } from "../../helpers";

export const NoteView = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef();

  const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );

  const { body, title, date, onInputChange, formState } = useForm( note );

  const dateString = useMemo(() => {
    return dateFormat( new Date(date) );
  }, [date]);

  useEffect(() => {
    dispatch( setActiveNote( formState ) );
  }, [formState])

  useEffect(() => {
    if ( messageSaved.length > 0 ){
      Swal.fire('Nota actualizada', messageSaved, 'success');
    }
  }, [messageSaved])

  const onSaveNote = () => {
    dispatch( startSaveNote() );
  }

  const onFileInputChange = ({ target }) => {
    if ( target.files.length === 0 ) return;

    dispatch( startUploadingFile( target.files ) );
  }

  const onDelete = () => {
    Swal.fire({
      title: 'Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch( startDeletingNote() );
        Swal.fire(
          'Nota Eliminada!',
          'La nota ha sido eliminada correctamente.',
          'success'
        )
      }
    })
  }

  return (
    <Grid 
      container direction="row" 
      justifyContent="space-between" 
      alignItems="center" 
      sx={{ mb: 1}}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Grid item>
        <Typography fontSize={ 39 } fontWeight="light">
          { dateString }
        </Typography>
      </Grid>

      <Grid item>
        <input 
          type="file"
          multiple
          ref={ fileInputRef }
          onChange={ onFileInputChange }
          style={{ display: 'none' }}
        />

        <Button
          color="primary"
          disabled={ isSaving }
          onClick={ () => fileInputRef.current.click() }
        >
          <UploadOutlined sx={{ fontSize: 30, mr: 1 }} />
          Subir
        </Button>

        <Button
          disabled={ isSaving }
          onClick={ onSaveNote }
          color="primary" 
          sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un titulo"
          label="Titulo"
          name='title'
          value={ title }
          onChange={ onInputChange }
          sx={{ border: 'none', mb: 1 }}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="Que sucedio en el dia de hoy?"
          sx={{ border: 'none', mb: 1 }}
          minRows={ 5 }
          name='body'
          value={ body }
          onChange={ onInputChange }
        />
      </Grid>

      <Grid container justifyContent='end' >
        <Button
          onClick={ onDelete }
          sx={{ mt: 2 }}
          color="error"
        >
          <DeleteOutline />
          Eliminar Nota
        </Button>
      </Grid>

      <ImagesGallery images={ note.imageUrls } />
      
    </Grid>
  )
}
