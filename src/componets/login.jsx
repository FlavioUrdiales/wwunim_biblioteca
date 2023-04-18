import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, Navigate,  useParams} from 'react-router-dom'
import { useState, useEffect  } from 'react'
import axios from 'axios';
import logo_uhm from '../assets/logo_uhm.png'
import "./style.css"
import Swal from 'sweetalert2'
import "../pages/not.css"
import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { fontFamily, fontStyle } from '@mui/system';





const login = () => {


    
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
        axios.get('https://sae.unimundial.edu.mx/ani/serviceLogin.php?accion=login&usuario='+usuario+'&password='+password)
        .then(function (response) {
            // handle success
            console.log(response.data);
            setData(response.data)
            if(response.data.chrNombre == undefined){
                Swal.fire({
                  
                    title: '<img src='+logo_uhm+' width="150px" />',
                   html: '<div style="color: #purple"><h6>ERROR EL USUARIO O LA CONTRASEÑA DE <h1/><b><h1 style="color: #purple"> ' + usuario + '</h6> <h6>ES INCORRECTO<h6/></div> ',

                   footer: '<b href="https://www.unimundial.edu.mx/" style="color: #purple">En nuestra ensencia esta la grandeza para transcender</b>',
                    showConfirmButton: false,
                    timer: 3200


                    
                    });

            }else{
                console.log(data)
                setError(false)

                setMensaje("Bienvenido " + response.data.chrNombre)
                Swal.fire({
                    title: '<img src='+logo_uhm+' width="150px" />',
                   html: '<div style="color: #purple"><h1>BIENVENIDO<h1/><b><h1 style="color: #purple"> ' + response.data.chrNombre +' ' + response.data.chrPaterno +' ' + response.data.chrMaterno + '</h1></div> ',

                   footer: '<b href="https://www.unimundial.edu.mx/" style="color: #purple">En nuestra ensencia esta la grandeza para transcender</b>',
                    showConfirmButton: false,

                    timer: 1200
                    }).then(() => {
                        sessionStorage.setItem('datos', JSON.stringify(response.data));
  
                        let url = window.location.href;
                        let url2 = url.split('?');
                        if(url2[1] != undefined){
                            window.location.href = url2[1].split('=')[1];
                        }else{
                            window.location.href = "/";
                        }
                    })

                setTimeout(() => {

                }
                , 1500);


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
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);


  return (   



<div className="container-fluid">
        <div className="row">
            <div className="col-md-6 login">

            <img src="https://unimundial.edu.mx/images/logo_footer.png" alt="logo" style={{width: "50%", height: "50%", display: "block", marginLeft: "auto", marginRight: "auto"}}/>

            <br />
            <br />
            <br />
            <br />
            
            <h2 className="text-center" style={{color: "white" , fontFamily: "Italic"}}>"EN NUESTRA ESENCIA ESTA LA GRANDEZA PARA TRANSCENDER"</h2>
            <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    
                    color: {
                        value: 'url(https://unimundial.edu.mx/images/logo_footer.png) no-repeat center center fixed whit ',
                    },
                },
                //backgraund img
                
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "random",
                        width: 15,
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 1,
                        width: 1,
                    },
                    collisions: {
                        enable: false,
                    },
                    move: {
                        directions: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 3,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 6 },
                    },
                },
                detectRetina: true,
            }}
        />


            </div>

            <div className="col-md-6">
    

    <div className="container">
        <div className="row">
            <div className="col-md-6 mx-auto" style={{marginTop: '25%'}}>
                <br/>
                <p className="text-center" style={{color:'#0c0f63', fontFamily: 'Arial', fontSize: '20px', fontWeight: 'bold'}}>BIBLIOTECA HUMANI MUNDIAL </p>

          
            <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Matricula"
                                variant="outlined"
                                margin="normal"
                                value={usuario}
                                onChange={handleUsuario}
                                color="secondary"
                                
                            />
                            <TextField

                                fullWidth
                                label="Contraseña"
                                variant="outlined"
                                margin="normal"
                                type="password"
                                value={password}
                                onChange={handlePassword}
                                color="secondary"
                                
                                 
                            />
                            <br/>
                            <br/>
                            <div className="text-center" style={{width: '150px', margin: '0 auto'}}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                type="submit"

                            >
                                Iniciar sesión
                            </Button>
                            </div>
                        </form>

                        <br/>
                        <br/>
                        
            <br />
            <br />
            <br />
            <br />
                        <hr style={{border: '1px solid #fff'}}/>


                        </div>
                        </div>
                        </div>

       
                  
              
            </div>
        </div>
    </div>


    





  )
}

export default login