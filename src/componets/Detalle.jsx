import axios from 'axios';
import React from 'react'
import { useState, useEffect  } from 'react'
import { Link, Navigate,  useParams} from 'react-router-dom'
import Button from '@mui/material/Button';
import Navbar from './Navbarv2'
import Swal from 'sweetalert2';
import { fontSize } from '@mui/system';
import './share.css'
import moment from 'moment/moment';

const Detalle = () => {

    const { id } = useParams();

    const [data, setData] = useState([])

    const [recomedaciones, setRecomedaciones] = useState([])



    useEffect(() => {

        


axios.get('http://localhost/modelos/serviciosLibreria.php', {
    
    params: {
        accion: 'consultarlibro',
        id: id
    }
})
.then(function (response) {
    // handle success
    setData(response.data)
    
})
.catch(function (error) {
    // handle error
    console.log(error);
})
.finally(function () {
    // always executed
});

    }, [])

    const consultarRecomendaciones = () => {
        
        const res = axios.get('http://localhost/modelos/serviciosLibreria.php', {

            params: {
                accion: 'librosRelacionados',
                id: id
            }
        })
        .then(function (response) {
            // handle success
            console.log(response.data);
            setRecomedaciones(response.data)
        }
        )
        .catch(function (error) {
            // handle error
            console.log(error);
        }
        )
        .finally(function () {
            // always executed
        }
        );

                

   
    }

    useEffect(() => {
        consultarRecomendaciones()
    }, [])







    




    const consultarDisponibilidad = () => {
        axios.get('http://localhost/modelos/serviciosLibreria.php', {

            params: {
                accion: 'consultarDisponibilidad',
                id: data.ISBN
            }
        })
        .then(function (response) {
            // handle success
            console.log(response.data);




            let disponibilidadand = "";
            let disponibilidadjat = "";
            let disponibilidadsfr = "";
            let disponibilidadsil = "";


            if (response.data.andrade == true) {
                disponibilidadand = "<i class='fas fa-check-circle' style='color:purple'></i>";

            } else {
                disponibilidadand = "<i class='fas fa-times-circle' style='color:red'></i>";
            }

            if (response.data.jat == true) {
                disponibilidadjat = "<i class='fas fa-check-circle' style='color:purple'></i>";

            } else {
                disponibilidadjat = "<i class='fas fa-times-circle' style='color:red'></i>";
            }

            if (response.data.sanfrancisco == true) {
                disponibilidadsfr = "<i class='fas fa-check-circle' style='color:purple'></i>";
            } else {
                disponibilidadsfr = "<i class='fas fa-times-circle' style='color:red'></i>";
            }

            if (response.data.silao == true) {
                disponibilidadsil = "<i class='fas fa-check-circle' style='color:purple'></i>";
            } else {
                disponibilidadsil = "<i class='fas fa-times-circle' style='color:red'></i>";
            }




            Swal.fire({
                title: '<strong style="color:purple">DISPONIBILIDAD</strong>',
                html: '<table class="table table-striped table-bordered table-hover table-sm">'+
                '<thead>'+
                    '<tr>'+
                        '<th scope="col">Biblioteca</th>'+
                        
                        '<th scope="col"> Disponibilidad</th>'+
                    '</tr>'+
                '</thead>'+
                '<tbody>'+
                    '<tr>'+
                        
                        '<td>León - Andrade</td>'+
                        '<td>'+disponibilidadand+'</td>'+
                    '</tr>'+
                    '<tr>'+

                        '<td>León - Juan Alonso de Torres</td>'+
                        '<td>'+disponibilidadjat+'</td>'+
                    '</tr>'+
                    '<tr>'+

                    '<td>San Francisco del Rincón - San Francisco del Rincón</td>'+
                    '<td>'+disponibilidadsfr+'</td>'+
                '</tr>'+
                '<tr>'+

                '<td>Silao - Silao</td>'+
                '<td>'+disponibilidadsil+'</td>'+
            '</tr>'+
                    '</tbody>'+
                '</table>' + '<br/>' + '<br/>  <small style="color:red">*Sujeto a cambios en la disponibilidad de la Librería. </small>',
                width: 800,
                showCloseButton: true,
                showCancelButton: false,
                focusConfirm: false,
                confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> OK!',
                showConfirmButton: false,
                confirmButtonAriaLabel: 'Thumbs up, great!',
                cancelButtonText:
                    '<i class="fa fa-thumbs-down"></i>',
                cancelButtonAriaLabel: 'Thumbs down',
                

            })

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        }
        )
        .finally(function () {
            // always executed
        }
        );




        
    }



    const compartir = (red) => {
        let url = window.location.href;

       let  title = data.titulo;
        let text = "Libro: " + data.titulo + " Autor: " + data.autor + " Editorial: " + data.editorial + " ISBN: " + data.ISBN;
        let hashtags = "LibreriaUnimundial";

        if (red == "facebook") {
            window.open("https://www.facebook.com/sharer/sharer.php?u=" + url, "Compartir en Facebook", "width=600, height=400");
        } else if (red == "instagram") {
            window.open("https://www.instagram.com/?url=" + url, "Compartir en Instagram", "width=600, height=400");
        } else if (red == "linkedin") {
            window.open("https://www.linkedin.com/shareArticle?mini=true&url=" + url + "&title=" + title + "&summary=" + text + "&source=LinkedIn", "Compartir en LinkedIn", "width=600, height=400");
        } else if (red == "discord") {
            window.open("https://discord.com/channels/@me", "Compartir en Discord", "width=600, height=400");
        } else if (red == "twitter") {
            window.open("https://twitter.com/intent/tweet?url=" + url + "&text=" + text + "&hashtags=" + hashtags, "Compartir en Twitter", "width=600, height=400");
        } else if (red == "whatsapp") {
            window.open("https://api.whatsapp.com/send?text=" + text + " " + url, "Compartir en Whatsapp", "width=600, height=400");
        } else if (red == "telegram") {
            window.open("https://telegram.me/share/url?url=" + url + "&text=" + text, "Compartir en Telegram", "width=600, height=400");
        } else if (red == "pinterest") {
            window.open("https://pinterest.com/pin/create/button/?url=" + url + "&description=" + text, "Compartir en Pinterest", "width=600, height=400");
        } else if (red == "reddit") {
            window.open("https://reddit.com/submit?url=" + url + "&title=" + title, "Compartir en Reddit", "width=600, height=400");
        } else if (red == "tumblr") {
            window.open("https://www.tumblr.com/widgets/share/tool?canonicalUrl=" + url + "&title=" + title + "&caption=" + text, "Compartir en Tumblr", "width=600, height=400");
        } else if (red == "email") {
            window.open("mailto:?subject=" + title + "&body=" + text + " " + url, "Compartir por Email", "width=600, height=400");
        }
    }



    const [planteles, setPlanteles] = useState([]);

    const getPlanteles = () => {

        axios.get('http://localhost/modelos/serviciosLibreria.php', {
    
        params: {
            accion: 'consultarlibro',
            id: id
        }
    })
    .then(function (response) {
        let _data = new FormData();
        
        _data.append('libro', response.data.ISBN);

        let res = axios.post('http://localhost/modelos/serviciosLibreria.php?accion=getPlanteles', _data)

        res.then((response) => {
            setPlanteles(response.data);
        })
            .catch(function (error) {
                // handle error
                console.log(error);
            }
            )
            .finally(function () {
                // always executed
            }
            );
        
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });

        
  
    }

    useEffect(() => {
        getPlanteles();
    }, []);



    const Solicitar = () => {
        let datos =  sessionStorage.getItem('datos');

        getPlanteles();

        if (datos == null) {
            let url = window.location.href;
            window.open("/login?redirect=" + url, "_self");
        }else{

            
        let datos2 = JSON.parse(datos);

        

        Swal.fire({
            title: 'SOLICITAR LIBRO',
            html: '<div class="form-group">' +
                '<label for="exampleFormControlInput1">Nombre</label>' +
                '<input type="text" class="form-control" id="nombre" value="'+datos2.chrNombre+' '+datos2.chrPaterno+' '+datos2.chrMaterno+'" disabled>' +

                '</div>' +  
                '<div class="form-group">' +
                '<label for="exampleFormControlInput1">Correo</label>' +
                '<input type="email" class="form-control" id="correo" value="'+datos2.chrEmail+'">' +
                '</div>' +
                '<div class="form-group">' +
                '<label for="exampleFormControlInput1">Teléfono</label>' +
                '<input type="text" class="form-control" id="telefono" value="'+datos2.chrTelefono+'">' +
                '</div>' +
                '<div class="form-group">' +
                '<label for="exampleFormControlInput1">Libro</label>' +
                '<input type="text" class="form-control" id="libro" value="'+data.ISBN+'" disabled>' +
                '</div>' + 
                '<div class="form-group">' +
                '<label for="exampleFormControlInput1">Librería</label>' +
                '<select class="form-control" id="libreria">' +
                '<option value="0">Selecciona una opción</option>' +
                planteles.map((item, index) => {
                    return (
                        '<option value="' + item.id_plantel + '">' + item.nombre + '</option>'
                    )
                }) +
                '</select>' +
                '</div>' +
                '<div class="form-group">' +
                '<label for="exampleFormControlInput1">Motivo</label>' +
                '<textarea class="form-control" id="motivo" rows="3"></textarea>' +
                '</div>',
                width: 600,
                padding: '3em',
                background: '#fff url(https://unimundial.edu.mx/images/logo2.png) no-repeat top',
                backdrop: `
                rgba(0,0,123,0.4)
                url("https://unimundial.edu.mx/images/logo22.png")
                no-repeat
                `
            }).then((result) => {
                if (result.isConfirmed) {
                    let nombre = document.getElementById('nombre').value;
                    let correo = document.getElementById('correo').value;
                    let telefono = document.getElementById('telefono').value;
                    let libro = document.getElementById('libro').value;
                    let libreria = document.getElementById('libreria').value;
                    let motivo = document.getElementById('motivo').value;

                    if (nombre == '' || correo == '' || telefono == '' || libro == '' || libreria == '' || motivo == '') {
                        Swal.fire(
                            'Error',
                            'Todos los campos son obligatorios',
                            'error'
                        )
                        return false;
                    }
                    

                    let data = new FormData();
                    data.append('nombre', nombre);
                    data.append('correo', correo);
                    data.append('telefono', telefono);
                    data.append('idLibro', libro);
                    data.append('id_plantel', libreria);
                    data.append('motivo', motivo);
                    data.append('status', "Activo");
                    data.append('fechaSolicitud', moment().format('YYYY-MM-DD'));
                    data.append('idAlumno', datos2.chrClave);

                    axios.post('http://localhost/modelos/serviciosLibreria.php?accion=solicitarLibro', data)
                    .then(res => {

                        if(res.data.response == true){
                            Swal.fire(
                                'Solicitud enviada',
                                'Se ha enviado la solicitud de libro',
                                'success'
                            )
                        }else{
                            if (res.data.mensaje == "2") {
                                Swal.fire({
                                    title: 'Error',
                                    html: '<p>Ocurrio un error al enviar la solicitud</p> <p>Por favor intentelo de nuevo</p> <p>Si el problema persiste contacte a soporte</p>' +
                                    '<p> <a href="mailto:sistemas.leon@unimundial.edu.mx "> Enviar correo </a> </p>',
                                    icon: 'error',
                                    confirmButtonText: 'Aceptar'
                                })

                                return false;

                            } else if (res.data.mensaje == "3") {
                                Swal.fire({
                                    title: 'Error',
                                    html: '<p>' + res.data.contenido + '</p>' + '<p>Por favor devuelva el libro o pague el adeudo para poder solicitar este libro</p>' + '<p> <a href="/prestamos"> Prestamos </a> </p>',
                                    icon: 'error',
                                    confirmButtonText: 'Aceptar'
                                })

                                return false;
                            }

                            else if (res.data.mensaje == "4") {
                                Swal.fire({
                                    title: 'Error',
                                    html: '<p>El libro que intenta solicitar no se encuentra disponible</p> <p>Por favor intentelo mas tarde</p>',
                                    icon: 'error',
                                    confirmButtonText: 'Aceptar'
                                })

                                return false;
                            }

                            else if (res.data.mensaje == "5") {
                                Swal.fire({
                                    title: 'Error',
                                    html: '<p>Ya has solicitado el maximo de libros permitidos de esta edicion </p> <p>Por favor intentelo mas tarde o con otra edicion</p> <p> O cancela alguna de tus solicitudes de este libro en el siguiente apartado </p> <p> <a href="/solicitudes"> Solicitudes </a> </p>',
                                    icon: 'error',
                                    confirmButtonText: 'Aceptar'
                                })

                                return false;
                            }

                        }
                    })

                }
            })
        }

    }
    
    


    const verLibro = (id) => {
        let url = window.location.href;

        //abrir en la misma pestaña 
        window.location.href = "/detail/" + id ;
    }










  return (

    //DETALLE LIBRO
    <>
    <Navbar/>
    <br/>
    <br/>
    <div className="container">
        <div className="row">
            <div className="col-md-4">
                {data.img != null ?
                data.img.startsWith("data") ? <img src={data.img} className="img-fluid" alt="Responsive image" style={{width: '80%', height: '300px'}}/> :  <img src="https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg" className="img-fluid" alt="Responsive image" style={{width: '80%', height: '300px'}}/>
                
                : <img src="https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg" className="img-fluid" alt="Responsive image" style={{width: '80%', height: '300px'}}/>
                }


            </div>
            <div className="col-md-5">
                <h4>"{data.titulo}"</h4>
                <h5>Autor: {data.autor}</h5>
                <h5>Editorial: {data.editorial}</h5>
                <h5>ISBN: {data.ISBN}</h5>


  <div class="main_box">
        <input type="checkbox" id="share_button"/>
        <label for="share_button">
            <span class="sharebtn spanshare">
              <i class="fas fa-share-alt">  </i> Share
            </span>
        </label>
  
        <div class="sm_list">
            <a  class="facebook ashare" onClick={() => compartir("facebook")}>
              <i class="fab fa-facebook-f"></i>
            </a>
            <a  class="instagram ashare" onClick={() => compartir("instagram")}>
              <i class="fab fa-instagram"></i>
            </a>
            <a  class="whatsapp ashare" onClick={() => compartir("whatsapp")}>
              <i class="fab fa-whatsapp"></i>
            </a>
    
        </div>
    </div>            </div>

            <div className="col-md-3" style={{textAlign: 'left', fontSize: '20px', backgroundColor: '#f2f2f2', padding: '20px'}}>
                <i className="fas fa-star" style={{color: 'gold'}}> </i><b> 4.5</b>
                <br/>
                <br/>
                <i className="fas fa-bookmark" style={{color: 'Purple'}}> </i><b> Disponibles: {data.ejemplares}</b>
                <br/>
                <br/>
                <Button variant="outlined" color="secondary" onClick={Solicitar}>Solicitar</Button>
                <br/>
                <br/>
                <i className="fas fa-eye"  style={{color: 'Purple', fontSize: '13px'}}onClick={consultarDisponibilidad}> <span> Ver disponibilidad</span></i>
            </div>
        </div>
    </div>
    <br/>
    <br/>
    <div className="container">
        <div className="row">
            <div className="col-md-8"  style={{textAlign: 'justify', fontSize: '15px', backgroundColor: '#ffff', padding: '20px'}}>
                <h1>SINOPSIS</h1>

                {data.sipnosis}
            </div>
            
            <div className="col-md-4">
                <br/>
                <br />
                <h5>CARACTERISTICAS</h5>
                <i className="fas fa-book" style={{color: 'Purple', fontSize: '15px'}}>  </i> {data.Paginas} páginas
                <br/>
                <i className="fas fa-language" style={{color: 'Purple', fontSize: '15px'}}>  </i> IDIOMA: Español
                <br/>
                <i className="fas fa-calendar-alt" style={{color: 'Purple', fontSize: '15px'}}>   </i>  FECHA EDICION: {data.fecha_edicion} 
                <br/>
                <i className="fas fa-bookmark" style={{color: 'Purple', fontSize: '15px'}}>  </i>CATEGORIA:  {data.area}
                <br/>
                <i className="fas fa-code-branch" style={{color: 'Purple', fontSize: '15px'}}>  </i> ISBN: {data.ISBN}
                <br/>
            </div>


        </div>

    </div>
    <br/>
    <br/>
    <div className="container">
        <div className="row">
            <div className="col-md-12">
                <h4 style={{textAlign: 'center', fontSize: '20px', backgroundColor: '#ffff', padding: '20px' , color: 'Purple'}}>RECOMENDACIONES</h4>
                
            </div>
        </div>
    </div>
    <br/>
    <br/>
    <div className="container">
        <div className="row">
            {recomedaciones.map((libro) => (
            
            <div className="col-md-3" href={libro.id} style={{textAlign: 'center', fontSize: '15px', backgroundColor: '#ffff', padding: '20px', cursor: 'pointer'}} onClick={() => verLibro(libro.id)}>
                {//si no empieza con data no se muestra
                libro.img.startsWith("data") ? <img src={libro.img} className="img-fluid" alt="Responsive image" style={{width: '80%', height: '200px'}}/> :  <img src="https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg" className="img-fluid" alt="Responsive image" style={{width: '80%', height: '200px'}}/>}




                <br/>
                <br/>
                <h6>{libro.titulo}</h6>
                <h6>Autor: {libro.autor}</h6>
                <h6>Editorial: {libro.editorial}</h6>
                <h6 style={{color: 'gray'}}>{libro.ISBN}</h6>
            </div>
            ))}
        
           
        </div>
    </div>
    <br/>
    <br/>


    

</>
    )
}

export default Detalle