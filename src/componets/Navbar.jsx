import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
import icon from '../assets/3_icon.png'
import logo2 from '../assets/logo2.png'
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import logo_uhm from '../assets/logo_uhm.png'
import { purple } from '@mui/material/colors'
import "./style.css"
import logo3 from '../assets/logo_footer.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Routes, Route } from 'react-router-dom';
import Login from './login'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Input } from '@mui/material'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useState, useEffect  } from 'react'
import Button from '@mui/material/Button';
import axios from 'axios';
import Swal from 'sweetalert2'
import Alert from'@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple , green, red} from '@mui/material/colors';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';






export const Navbar = () => {


  const [datosSesion, setDatosSesion] = useState([]);

  const [open, setOpen] = React.useState(false);

  const [url, setUrl] = React.useState('');

 useEffect(() => {
    const datos = sessionStorage.getItem('datos');
    //obtener url
    let url = window.location.href;
    //solo agarrar la ultima parte de la url
    url = url.split('/').pop();
    setUrl(url);

    let data = JSON.parse(datos)
    if (datos) {
      setDatosSesion(JSON.parse(datos));
    }
  }, []);


  const cerrarSesion = () => {
    sessionStorage.removeItem('datos');
    window.location.href = "/";
  }


  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'transparent',
    boxShadow: 24,
    p: 4,
  };


  const [anchorEl, setAnchorEl] = React.useState(null);
  const openn = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [data, setData] = useState([])
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [mensaje, setMensaje] = useState('')

  const handleUsuario = (e) => {
      setUsuario(e.target.value)
  }

  const handlePassword = (e) => {
      setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
      e.preventDefault()
      axios.get('http://sae.unimundial.edu.mx/ani/serviceLogin.php?accion=login&usuario='+usuario+'&password='+password)
      .then(function (response) {
          // handle success
          console.log(response.data);
          setData(response.data)
          if(response.data == false){
              setError(true)
              setMensaje("Usuario o contraseña incorrectos" )
          }else{
              console.log(data)
              setError(false)

              setMensaje("Bienvenido " + response.data.chrNombre)

              sessionStorage.setItem('datos', JSON.stringify(response.data));
              window.location.href = "/";
          }

      })
      .catch(function (error) {
          // handle error
          console.log(error);
      })
      .finally(function () {
          // always executed
      });
  }


  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

  return (
    
    <div>
    <Modal open={open} onClose={() => setOpen(false)}>
    <Box sx={style}>
     
 
        <Login/>
  



    

    </Box>
  </Modal>




  <nav className="navbar navbar-expand-lg navbar-dark bg-dark nav2" style={{  backgroundImage: "linear-gradient(to right, #21012b, #21012b, #21012b)"}}>
  <div class="container-fluid" >
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="#"><img src={logo3} alt="logo" style={{width: "100px", height: "100px"}}/></a>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo03" >
 <ul class="navbar-nav me-auto mb-2 mb-lg-0">
       


        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/"><b id='home'>Inicio</b></Link>
          {url === '' &&
          <hr style={{color: "white" ,background: "white",  height: "5px", marginLeft: "0px", marginTop: "0px", marginBottom: "0px", marginRight: "0px" , width: "100%"}}/>
          }
     
    

        </li>
        <li class="nav-item">
            <Link class="nav-link" to="/solicitudes">Prestamos</Link>
            {url === 'solicitudes' &&
          <hr style={{color: "white" ,background: "white",  height: "5px", marginLeft: "0px", marginTop: "0px", marginBottom: "0px", marginRight: "0px" , width: "100%"}}/>
          }
          
        </li>

       

      </ul>      


        <div class="dropdown d-flex" style={{marginRight: "50px"}} onMouseEnter={handleClick} onMouseLeave={handleClose}>
            <span >
            <AccountCircleIcon style={{color: "white", fontSize: "40px"}} onClick={handleClick}/>
            </span>
            

            <Menu id="basic-menu" anchorEl={anchorEl} open={openn} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button' }}>
      

        {datosSesion.chrNombre ? (
          <div>
            <center>
            <MenuItem >  <br></br><b style={{fontSize: "15px" , marginLeft: "10px"}}>{datosSesion.chrNombre + " " + datosSesion.chrPaterno}</b></MenuItem>
            <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        {datosSesion.chrTipoUsuario == "usuario" ? ( 

        <Avatar alt="Remy Sharp" sx = {{backgroundColor: "blue"}}> {datosSesion.chrNombre.charAt(0) + datosSesion.chrPaterno.charAt(0)}</Avatar>

        ) : ( 
          
          <Avatar alt="Remy Sharp" > {datosSesion.chrNombre.charAt(0) + datosSesion.chrPaterno.charAt(0)}</Avatar>

        )}
      </StyledBadge>
      {datosSesion.chrTipoUsuario == "usuario" ? ( 

        
      <h6 style={{fontSize: "15px" , marginLeft: "10px"}}>Administrativo</h6> 

      ) : (

      <h6 style={{fontSize: "15px" , marginLeft: "10px"}}>{datosSesion.chrTipoUsuario}</h6>

      )}
            </center>
            <MenuItem > <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                onClick={cerrarSesion}
                            >
                                Cerrar Sesión
                            </Button>
                            </MenuItem>

          </div>
        ) : (
          <div>
           <form onSubmit={handleSubmit}>
           <MenuItem > <TextField
                                fullWidth
                                label="Usuario"
                                variant="outlined"
                                margin="normal"
                                value={usuario}
                                onChange={handleUsuario}
                                color="secondary"
                            />
                            </MenuItem>
                            <MenuItem > <TextField

                                fullWidth
                                label="Contraseña"
                                variant="outlined"
                                margin="normal"
                                value={password}
                                onChange={handlePassword}
                                color="secondary"
                                type="password"
                            />
                            </MenuItem>
                            <MenuItem > <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Iniciar sesión
                            </Button>


                            </MenuItem>

                            {error ? (
                                <MenuItem > <Alert severity="error">{mensaje}</Alert></MenuItem>
                            ) : (
                                <MenuItem > <Alert severity="success">{mensaje}</Alert></MenuItem>
                            )}


            
            </form>

          </div>
        )}

    </Menu>






            </div>


    </div>
    
  </div>
</nav>

<br/>
<div id="carouselExampleDark" class="carousel carousel-dark slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="10000">
    <center> 

<img src={logo_uhm } alt="logo" style={{width: "283px", height: "283px"}}/>
<br></br><br></br><br></br><br></br><br></br>

        </center>
    </div>
    <div class="carousel-item" data-bs-interval="2000">
    <center> 

<img src={icon } alt="logo" style={{width: "100px", height: "100px"}}/>
<h1 style={{color: "purple"}}><b style={{background: "purple" , color: "white" , borderRadius: "10px", fontSize : "25px"}}>UNIVERSIDAD</b><br></br> <b style ={{color: "red"}}>HUMANI</b><br></br> <b style={{color: "purple", fontSize: "50px"}}>MUNDIAL</b></h1>
<h2 style={{color: "gray", fontSize:"50px"}}><b>BIBLIOTECA</b></h2>
<br/><br/>



        </center>
    </div>
    <div class="carousel-item">
    <center> 

<img src={icon } alt="logo" style={{width: "100px", height: "100px"}}/>
<h1 style={{color: "purple"}}><b style={{background: "purple" , color: "white" , borderRadius: "10px", fontSize : "25px"}}>UNIVERSIDAD</b><br></br> <b style ={{color: "red"}}>HUMANI</b><br></br> <b style={{color: "purple", fontSize: "50px"}}>MUNDIAL</b></h1>
<h2 style={{color: "gray", fontSize:"50px"}}><b>BIBLIOTECA</b></h2>
<br/><br/>



        </center>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Anterior</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Siguiente</span>
  </button>
</div>

        <br/>
        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
      <LinearProgress color="secondary" />

    </Stack>




    </div>
  )
}

export default Navbar