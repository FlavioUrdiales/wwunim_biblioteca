import axios from 'axios'
import React from 'react'
import { useEffect , useState } from 'react'
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/ManageSearch';
import GroupAddIcon from '@mui/icons-material/Grading';
import VideoLabelIcon from '@mui/icons-material/Hail';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Navbar from '../componets/Navbarv2';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Swal from 'sweetalert2';
import { PaginatedList } from 'react-paginated-list';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';

const Solicitudes = () => {


const theme = useTheme();
const [solicitudes, setSolicitudes] = useState([])
const [search, setSearch] = useState('')
const [currentPage, setCurrentPage] = useState(1); // Página actual
const [itemsPerPage] = useState(9); // Cantidad de elementos por página
  // Calcular índices de los elementos a mostrar en la página actual
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = solicitudes.slice(indexOfFirstItem, indexOfLastItem);
const paginate = (pageNumber) => setCurrentPage(pageNumber);


const getSolicitudes = async () => {

    let dataAlumno = JSON.parse(sessionStorage.getItem('datos'));
    let idAlumno = dataAlumno.chrClave;

    let _data = new FormData();
    _data.append('idAlumno', idAlumno);

    const res = await axios.post('http://localhost/modelos/serviciosLibreria.php?accion=consultarMisSolitudes' , _data)
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
        
        let _data = new FormData();
        _data.append('idSolicitud', id);

        let res_1 = axios.post(`http://localhost/modelos/serviciosLibreria.php?accion=getSolicitud`, _data)
        .then((res1) => {

          let res_2 = axios.post(`http://localhost/modelos/serviciosLibreria.php?accion=getPrestamo`, _data)
          .then((res2) => {
            console.log(res2.data);
  
            if(res2.data.length == 0){
              
              if(res1.data[0].status != "Activo"){

              Swal.fire({
                icon: 'error',
                html: '<h3>La solicitud ya fue cancelada</h3> <br /> <p>Recuerda que solo tenias 72 horas para recolectar el libro</p>',
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#784af4'
              })

              }else {
                Swal.fire({
                  icon: 'info',
                  html: '<h3>Aun no has recolectado el libro</h3> <br /> <p>Recuerda que tienes 72 horas para recolectar el libro</p>',
                  showConfirmButton: true,
                  confirmButtonText: 'Aceptar',
                  confirmButtonColor: '#784af4'
                })

              }
  
            } else{
              window.location.href = `/prestamo/${id}`;
            }
            
          })
          
          .catch((err) => {
            console.log(err);
          }
          )
       
        })        
      }

      const cancelar = async (id) => {

        let _data = new FormData();
    
        _data.append('idSolicitud', id);
        //mostrar swal para que confirmen el rechazo y de un motivo de rechazo
        Swal.fire({
          title: "¿Estas seguro de cancelar la solicitud?",
          text: "Escribe el motivo de la cancelacion",
          icon: "warning",
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Cancelar',
          showLoaderOnConfirm: true,
          preConfirm: (login) => {
            _data.append('motivoRechazo', login);
            return axios.post(`http://localhost/modelos/serviciosLibreria.php?accion=cancelarSolicitud`, _data)
              .then((res) => {
                if (res.data.response == true) {
                  Swal.fire({
                    title: "Solicitud Cancelada",
                    html: res.data.mensaje,
                    icon: "success",
                    button: "Aceptar",
                  }).then(() => {
                    getSolicitudes();
                  });
                } else {
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
////pagination y busqueda
const handleSearch = (e) => {
  const query = e.target.value.toLowerCase();
  setSearch(query);

  if (query === '') {
    getSolicitudes();
  } else {
    const results = solicitudes.filter(solicitud => solicitud.titulo.toLowerCase().includes(query) || solicitud.status.toLowerCase().includes(query));
    setSolicitudes(results);
  }
}

  return (
    <>
    <Navbar />
    <br />
  <div className="container">
    <div className="row">
        <div className="col-12">
            <h1 className="text-center" style={{color: 'purple'}}>MIS SOLICITUDES</h1>
        </div>
    </div> 
    <Stack spacing={2} direction="row" justifyContent="center" alignItems="center" >

<TextField label="Buscar" variant="outlined" sx={{ width: '50%' }} color="secondary" id="search" onChange={handleSearch} value={search}
  InputProps={{
    endAdornment: (
      <InputAdornment position="start">

        <SearchIcon color="secondary" />

      </InputAdornment>
    ),
  }}
/>
</Stack>
<br />
    <div className="row">
    {solicitudes.length < 1 ? (
      <div className="col-12">

        <br />
        <h3 className="text-center" style={{color: 'purple'}}>No tienes solicitudes</h3>
      </div>
    ) : (
      <PaginatedList
      list={solicitudes}
      itemsPerPage={itemsPerPage}

      nextText={<NavigateNextIcon fontSize='small' />}
      prevText={<NavigateBeforeIcon fontSize='small' />}

      renderList={(list) => (
        <div className="row">
        {list.map((solicitud) => (
          
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
              {solicitud.fechaSolicitud}

            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
                {solicitud.status === "Activo" ? (
                    <span className="badge bg-success">{solicitud.status}</span>
                ) : (
                  solicitud.status === "Prestado" ? (
                    <>
                    {solicitud.prestamoEstado === "Devuelto" ? (
                    <span className="badge bg-success">Entregado</span>
                    ) : solicitud.prestamoEstado === "Activo" ? (
                      <span className="badge bg-warning">Prestado</span>
                    ) : (
                      <span className="badge bg-danger">{solicitud.prestamoEstado}</span>
                    )}
                    </>
                  ) : (
                    <span className="badge bg-danger">{solicitud.status}</span>
                  
                  )

                )}

                <span   style={{marginLeft: '10px', color: 'white', backgroundColor: 'purple',
                 borderRadius: '5px', padding: '3px', fontSize: '12px', fontWeight: 'bold'}}>
                    ANDRADE</span>
            </Typography>

            <Typography variant="subtitle1" color="text.secondary" component="div">
      
            </Typography>
                    <div className="row" style={{marginTop: '30px'}}>
                        <div className="col-12">
                        <Stepper alternativeLabel activeStep={solicitud.paso} connector={<ColorlibConnector />}>
                            {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                            </Step>
                            ))}
                        </Stepper>
                        </div>
                    </div>
       </CardContent>
         <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              <Button variant="outlined"
              color="secondary" size="small"
               onClick={() => verPrestamo(solicitud.id)}>Ver</Button>
              {solicitud.status === "Activo" && (
               <Button variant="outlined" 
                color="error" size="small"
                style={{marginLeft: '10px'}}
                onClick={() => cancelar(solicitud.id)}>Cancelar</Button>
              )}
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
      ///
    )} />


    
    )}
    </div>
  </div>
    </>



  )
}

export default Solicitudes