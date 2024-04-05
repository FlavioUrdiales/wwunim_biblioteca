import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./style.css"
import logo3 from '../assets/logo_footer.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Login from './login'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';


export const Navbar = () => {


  const [datosSesion, setDatosSesion] = useState([]);

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const datos = sessionStorage.getItem('datos');
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
    axios.get('http://sae.unimundial.edu.mx/ani/serviceLogin.php?accion=login&usuario=' + usuario + '&password=' + password)
      .then(function (response) {
        // handle success
        console.log(response.data);
        setData(response.data)
        if (response.data == false) {
          setError(true)
          setMensaje("Usuario o contraseña incorrectos")
        } else {
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
          <Login />
        </Box>
      </Modal>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark nav2" style={{ backgroundImage: "linear-gradient(to right, #21012b, #21012b, #21012b)" }}>
        <div className="container-fluid" >
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="#"><img src={logo3} alt="logo" style={{ width: "100px", height: "100px" }} /></a>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03" >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">



              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/"><b id='home'>Inicio</b></Link>
                <hr style={{ color: "white", background: "white", height: "5px", marginLeft: "0px", marginTop: "0px", marginBottom: "0px", marginRight: "0px", width: "100%" }} />




              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/solicitudes">Prestamos</Link>

              </li>


              {datosSesion.chrTipoUsuario == "usuario" && (
        <li className="nav-item" style={{marginLeft: "10 px"}}>
          <Link className="nav-link" to="/Devolucion">Devoluciones</Link>
        </li>
        ) }

            </ul>


            <div className="dropdown d-flex" style={{ marginRight: "50px" }} onMouseEnter={handleClick} onMouseLeave={handleClose}>
              <span >
                <AccountCircleIcon style={{ color: "white", fontSize: "40px" }} onClick={handleClick} />
              </span>


              <Menu id="basic-menu" anchorEl={anchorEl} open={openn} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button' }}>


                {datosSesion.chrNombre ? (
                  <div>
                    <center>
                      <MenuItem >  <br></br><b style={{ fontSize: "15px", marginLeft: "10px" }}>{datosSesion.chrNombre + " " + datosSesion.chrPaterno}</b></MenuItem>
                      <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                      >
                        {datosSesion.chrTipoUsuario == "usuario" ? (

                          <Avatar alt="Remy Sharp" sx={{ backgroundColor: "blue" }}> {datosSesion.chrNombre.charAt(0) + datosSesion.chrPaterno.charAt(0)}</Avatar>

                        ) : (

                          <Avatar alt="Remy Sharp" > {datosSesion.chrNombre.charAt(0) + datosSesion.chrPaterno.charAt(0)}</Avatar>

                        )}
                      </StyledBadge>
                      {datosSesion.chrTipoUsuario == "usuario" ? (


                        <h6 style={{ fontSize: "15px", marginLeft: "10px" }}>Administrativo</h6>

                      ) : (

                        <h6 style={{ fontSize: "15px", marginLeft: "10px" }}>{datosSesion.chrTipoUsuario}</h6>

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






    </div>
  )
}

export default Navbar