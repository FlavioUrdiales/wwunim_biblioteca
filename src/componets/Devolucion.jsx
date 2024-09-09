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

const Devolucion = () => {

    const theme = useTheme();

const [devoluciones, setDevoluciones] = useState([])


const getDevolucion = async () => {

    let dataAlumno = JSON.parse(sessionStorage.getItem('datos'));
    let idAlumno = dataAlumno.chrClave;

    let _data = new FormData();
    _data.append('idAlumno', idAlumno);
    _data.append('admin', true);

    const res = await axios.post('http://localhost/modelos/serviciosLibreria.php?accion=consultarSolicitudesdos', _data)

    setDevoluciones(res.data)

    console.log(res.data)

    }

    useEffect(() => {
        getDevolucion()

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




  return (
    <>
    <Navbar />
    <br />
  <div className="container">
    <div className="row">
        <div className="col-12">
            <h1 className="text-center" style={{color: 'purple'}}>Devoluciones</h1>
        </div>
    </div>
    
    {devoluciones.length < 1 ? (


          <div className="row">
         <div className="col-12">
        <br />
        <h3 className="text-center" style={{color: 'purple'}}>No tienes devoluciones pero eres admin</h3>
      </div>
    </div>
    ) : (
      <div className="row">
        {devoluciones.map((devolucion) => (
          

            <div className="col-12 col-md-6 col-lg-4">
                  <br /> 
            <br />
                  <Card sx={{ display: 'flex' }}>
     <Box sx={{ display: 'flex', flexDirection: 'column' }}>
       <CardContent sx={{ flex: '1 0 auto' }}>
         <Typography component="div" variant="h6">
           {devolucion.titulo}
         </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {devolucion.nombreAlumno}
              

            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {devolucion.fechaSolicitud}
              

            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
                {devolucion.status === "Activo" ? (
                    <span className="badge bg-success">{devolucion.status}</span>    
                                    
                ) : (
                    devolucion.status === "Prestado" ? (

                    <span className="badge bg-success">Recogido</span>
                  ) : (
                    <span className="badge bg-danger">{devolucion.status}</span>
                  
                  )
                )}
                
                <span   style={{marginLeft: '10px', color: 'white', backgroundColor: 'purple',
                 borderRadius: '5px', padding: '3px', fontSize: '12px', fontWeight: 'bold'}}>
                    {devolucion.biblioteca}
                </span>

          
            </Typography>
                    <div className="row" style={{marginTop: '30px'}}>

                        <div className="col-12">
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                        {devolucion.motivo}
                        </Typography>
                     
                        </div>
                    </div>
                    

       </CardContent>

  

         {devolucion.status === "Prestado" && (
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              <Button variant="contained" color="primary" onClick={() => {
                  Swal.fire({
                      title: '¿Estás seguro de devolver este libro?',
                      showDenyButton: true,
                      confirmButtonText: `Si`,
                      denyButtonText: `No`,
                    }).then((result) => {
                      /* Read more about isConfirmed, isDenied below */
                      if (result.isConfirmed) {
                          Swal.fire('Libro devuelto', '', 'success')
                      } else if (result.isDenied) {
                        Swal.fire('No se ha devuelto el libro', '', 'info')
                      }
                    }) 
              }}>
                  Devolver
              </Button>
          </Box>
          ) } 
            
     </Box>

 <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={devolucion.img}
        alt="Live from space album cover"
      />
   </Card>
   
    </div>
        ))}
      
    </div>
    )}
  </div>

    </>



  )
}

export default Devolucion 