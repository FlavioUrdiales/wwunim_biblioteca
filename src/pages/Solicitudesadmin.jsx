import axios from 'axios'
import React from 'react'
import { useEffect , useState } from 'react'
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/ManageSearch';
import GroupAddIcon from '@mui/icons-material/Grading';
import VideoLabelIcon from '@mui/icons-material/Hail';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Navbar from '../componets/Navbarv2';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Swal from 'sweetalert2';

const Solicitudesadmin = () => {

    const theme = useTheme();

const [solicitudes, setSolicitudes] = useState([])


const getSolicitudes = async () => {

    let dataAlumno = JSON.parse(sessionStorage.getItem('datos'));
    let idAlumno = dataAlumno.chrClave;
    let _data = new FormData();
    _data.append('idAlumno', idAlumno);
    _data.append('admin', true);

    const res = await axios.post('http://sci.unimundial.edu.mx/modelos/serviciosLibreria.php?accion=consultarSolitudes' , _data)

    setSolicitudes(res.data)

    }

    useEffect(() => {
        getSolicitudes()
    }, [])

    const QontoConnector = styled(StepConnector)(({ theme }) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
          top: 10,
          left: 'calc(-50% + 16px)',
          right: 'calc(50% + 16px)',
        },
        [`&.${stepConnectorClasses.active}`]: {
          [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#784af4',
          },
        },
        [`&.${stepConnectorClasses.completed}`]: {
          [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#784af4',
          },
        },
        [`& .${stepConnectorClasses.line}`]: {
          borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
          borderTopWidth: 3,
          borderRadius: 1,
        },
      }));
      
      const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
        color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
        ...(ownerState.active && {
          color: '#784af4',
        }),
        '& .QontoStepIcon-completedIcon': {
          color: '#784af4',
          zIndex: 1,
          fontSize: 18,
        },
        '& .QontoStepIcon-circle': {
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'currentColor',
        },
      }));
      
      function QontoStepIcon(props) {
        const { active, completed, className } = props;
      
        return (
          <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
              <Check className="QontoStepIcon-completedIcon" />
            ) : (
              <div className="QontoStepIcon-circle" />
            )}
          </QontoStepIconRoot>
        );
      }
      
      QontoStepIcon.propTypes = {
        /**
         * Whether this step is active.
         * @default false
         */
        active: PropTypes.bool,
        className: PropTypes.string,
        /**
         * Mark the step as completed. Is passed to child components.
         * @default false
         */
        completed: PropTypes.bool,
      };
      
      const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
          top: 22,
        },
        [`&.${stepConnectorClasses.active}`]: {
          [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
              'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
          },
        },
        [`&.${stepConnectorClasses.completed}`]: {
          [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
              'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
          },
        },
        [`& .${stepConnectorClasses.line}`]: {
          height: 3,
          border: 0,
          backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
          borderRadius: 1,
        },
      }));
      
      const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 30,
        height: 30,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        ...(ownerState.active && {
          backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
          boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        }),
        ...(ownerState.completed && {
          backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        }),
      }));
      
      function ColorlibStepIcon(props) {
        const { active, completed, className } = props;
      
        const icons = {
          1: <SettingsIcon />,
          2: <GroupAddIcon />,
          3: <VideoLabelIcon />,
        };
      
        return (
          <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
          </ColorlibStepIconRoot>
        );
      }
      
      ColorlibStepIcon.propTypes = {
        /**
         * Whether this step is active.
         * @default false
         */
        active: PropTypes.bool,
        className: PropTypes.string,
        /**
         * Mark the step as completed. Is passed to child components.
         * @default false
         */
        completed: PropTypes.bool,
        /**
         * The label displayed in the step icon.
         */
        icon: PropTypes.node,
      };
      
      const steps = ['Solicitalo', 'Recolectalo antes de 72h', 'Entregalo antes de 72h'];
      


      const verPrestamo = (id) => {
        
        console.log(id);

        
        let _data = new FormData();
        _data.append('idSolictud', id);

        return axios.post(`http://sci.unimundial.edu.mx/modelos/serviciosLibreria.php?accion=prestarLibro`, _data)
        .then((res1) => {

          //si response es true entonces se actualiza el estado de la solicitud muestra un swal y se redirecciona a la pagina de prestamos
          if(res1.data.response == true){

            Swal.fire({
              title: "Prestamo realizado",
              text: "El prestamo se realizo correctamente",
              icon: "success",
              showCancelButton: false,
              confirmButtonText: 'Aceptar',
              showLoaderOnConfirm: true,
              preConfirm: (login) => {
                getSolicitudes();
                return true;
              },
              allowOutsideClick: () => !Swal.isLoading()
            })

          }else{
            //si response es false entonces se muestra un swal con el error
            Swal.fire({
              title: "Error",
              text: res1.data.mensaje,
              icon: "error",
              showCancelButton: false,
              confirmButtonText: 'Aceptar',
              showLoaderOnConfirm: true,
              preConfirm: (login) => {
                return true;
              },
              allowOutsideClick: () => !Swal.isLoading()
            })
          }

        })

      }



      const verRechazo = (id) => {

        console.log(id);

        let _data = new FormData();

        _data.append('idSolicitud', id);


        //mostrar swal para que confirmen el rechazo y de un motivo de rechazo
        Swal.fire({
          title: "¿Estas seguro de rechazar la solicitud?",
          text: "Escribe el motivo de rechazo",
          icon: "warning",
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Rechazar',
          showLoaderOnConfirm: true,
          preConfirm: (login) => {
            _data.append('motivoRechazo', login);
            return axios.post(`http://sci.unimundial.edu.mx/modelos/serviciosLibreria.php?accion=cancelarSolicitud`, _data)
            .then((res) => {

              console.log(res.data);
              if(res.data.response == true){
                Swal.fire({
                  title: "Solicitud rechazada",
                  html: res.data.mensaje,
                  icon: "success",
                  button: "Aceptar",
                }).then(() => {
                  getSolicitudes();
                });
              }else{
                Swal.fire({
                  title: "Error",
                  text: res.data.mensaje,
                  icon: "error",
                  button: "Aceptar",
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
          },
          allowOutsideClick: () => !Swal.isLoading()
        })
      }

  return (
    <>
    <Navbar />
    <br />
  <div className="container">
    <div className="row">
        <div className="col-12">
            <h1 className="text-center" style={{color: 'purple'}}>SOLICITUDES</h1>
        </div>
    </div>
    
    {solicitudes.length < 1 ? (


          <div className="row">
         <div className="col-12">

        <br />
        <h3 className="text-center" style={{color: 'purple'}}>No tienes solicitudes pero eres admin</h3>
      </div>
    </div>
    ) : (
      <div className="row">
      <div className="col-12">
        {solicitudes.map((solicitud) => (
          

            <div className="col-12 col-md-6 col-lg-4">
                  <br /> 
            <br />
                  <Card sx={{ display: 'flex' }}>
     <Box sx={{ display: 'flex', flexDirection: 'column' }}>
       <CardContent sx={{ flex: '1 0 auto' }}>
         <Typography component="div" variant="h6">
           {solicitud.titulo}
         </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {solicitud.nombreAlumno}
              

            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {solicitud.fechaSolicitud}
              

            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
                {solicitud.status === "Activo" ? (
                    <span className="badge bg-success">{solicitud.status}</span>

                    
                ) : (
                  solicitud.status === "Prestado" ? (

                    <span className="badge bg-success">Recogido</span>
                  ) : (
                    <span className="badge bg-danger">{solicitud.status}</span>
                  
                  )

                )}

                <span   style={{marginLeft: '10px', color: 'white', backgroundColor: 'purple',
                 borderRadius: '5px', padding: '3px', fontSize: '12px', fontWeight: 'bold'}}>
                    {solicitud.biblioteca}
                </span>
            </Typography>

                    <div className="row" style={{marginTop: '30px'}}>

                        <div className="col-12">
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                        {solicitud.motivo}
                        </Typography>
                        </div>
                    </div>
                  
       </CardContent>
         <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              <Button variant="outlined"
              color="secondary" size="small"
               onClick={() => verPrestamo(solicitud.id)}>Aceptar</Button>

               <Button variant="outlined" 
                color="error" size="small"
                style={{marginLeft: '10px'}}
                onClick={() => verRechazo(solicitud.id)}>Rechazar</Button>
                </Box>
     
     </Box>
 

 <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={solicitud.img}
        alt="Live from space album cover"
      />
   </Card>
   
    </div>
        ))}
      </div>
    </div>
    )}
  </div>
    </>
  )
}

export default Solicitudesadmin 