import EditCalendarOutlined from "@mui/icons-material/EditCalendarOutlined"
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";


export const NothingSelectedView = () => {
  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      spacing={ 0 }
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: 'calc(100vh - 120px) ', backgroundColor: 'primary.main', borderRadius: 3 }}
    >
      <Grid item xs={ 12 }>
        <EditCalendarOutlined sx={{ fontSize: 100, color: 'white' }} />
      </Grid>

      <Grid item xs={ 12 } style={{ textAlign: 'center' }}>
        <Typography color="white" variant="h5">
          Selecciona o crea una nota
        </Typography>
      </Grid>
    </Grid>
  )
}
