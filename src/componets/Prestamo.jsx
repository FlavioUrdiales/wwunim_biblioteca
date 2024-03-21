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
import Steps from './Steps'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/CalendarMonth';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/LocationCity';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';
import iconhead from '../assets/3_icon.png'



const Prestamo = () => {


    const { id } = useParams();
    const [data, setData] = useState([])



    const [recomedaciones, setRecomedaciones] = useState([])

    const [prestamo, setPrestamo] = useState([])


    const consultarlibros = async () => {
        let _data = new FormData();
        _data.append('idSolicitud', id);
        const res = await axios.post('http://sci.unimundial.edu.mx/modelos/serviciosLibreria.php?accion=getPrestamo ', _data);

        
        setData(res.data[0])
      

    }

    useEffect(() => {
        consultarlibros()
    }, [])
    const consultarRecomendaciones = () => {
        
        const res = axios.get('http://sci.unimundial.edu.mx/modelos/serviciosLibreria.php', {

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


    const  referencia = "12795D23002400000000004609";
    const monto =  1;
    const concepto = 10;
    const servicio = 107;
    const folio ="230222481";
    const hash = "CrRmE9YZ4ZJYqgzv9-V6JDIlphJwovb3cVOrq4Aljjt1u39nZVFz1zAVC8nhBUo-AIzvcJwd4GQTevOYySR7YX8b45tinpQAEEZwZhGtcS9XLtFA9Z4f1mi8v5pwvavKoxoXP1TdMTbLlMJVag_nSyVoVFouPRvGoz10axdKqFA,+"
    const dl_concepto = "ADEUDO DE LIBRO";


    const pagar = () => {

        //mandar peticion y abrirar en una nueva ventana

      //  <form method="post" action="https://multipagos.bb.com.mx/Estandar/index2.php" target="popup" onsubmit="window.open('','popup','width=870,height=600,menubar=no, scrollbars=yes,directories=no')">

        //Swal.fire({
        //    title: '<h3 class="text-purple "><i class="fas fa-money-check-alt"></i> PAGO EN LÍNEA</h3> ',
        //  html :  ' <div class="col-12  order-1 order-md-2"><p class="text-muted  text-justify">Los datos de pagos son los siguientes.Si tienes dudas y tu pago no se ve reflejado es muy importante tener tu comprobante de pago a la mano para cualquier duda contacte a <b>biblioteca.leon@unimundial.edu.mx </b></p><div class="text-muted"><p class="text-sm"><b class="d-block">Fecha: </b>'+ moment().format('DD/MM/YYYY') +'</p><p class="text-sm"><b class="d-block">Referencia: </b>'+ referencia +'</p><p class="text-sm"><b class="d-block">Concepto: </b>'+ concepto +'</p><p class="text-sm"><b class="d-block">Monto: </b>'+ monto +'</p><p class="text-sm"><b class="d-block">Servicio: </b>'+ servicio +'</p><p class="text-sm"><b class="d-block">Folio: </b>'+ folio +'</p><p class="text-sm"><p class="text-sm"><b class="d-block">Concepto: </b>'+ dl_concepto +'</p></div></div>' +
        //  '<form method="post" action="https://multipagos.bb.com.mx/Estandar/index2.php" target="popup" onsubmit="window.open("","popup","width=870,height=600,menubar=no, scrollbars=yes,directories=no")">   <div class="input-group"> <input type="hidden" class="form-control" value="230222481" name="cl_folio" id="cl_folio" /> <input type="hidden" class="form-control" name="cl_referencia"  value="'+ referencia + '" id="cl_referencia" /> <input type="hidden" class="form-control" name="servicio" id="servicio" value="107" /> <input type="hidden" class="form-control" name="hash" value="CrRmE9YZ4ZJYqgzv9-V6JDIlphJwovb3cVOrq4Aljjt1u39nZVFz1zAVC8nhBUo-AIzvcJwd4GQTevOYySR7YX8b45tinpQAEEZwZhGtcS9XLtFA9Z4f1mi8v5pwvavKoxoXP1TdMTbLlMJVag_nSyVoVFouPRvGoz10axdKqFA, " id="hash" /> <input type="hidden" class="form-control" name="cl_concepto"  value="'+ concepto + '" id="cl_concepto" /> <input type="hidden" class="form-control" name="cl_conceptodes" value="PAGO MATERIA +                                 " id="cl_conceptodes" /> <input type="hidden" class="form-control" name="dl_monto" id="dl_monto" value="'+ monto + '"/> </div> <button type="submit" class="btn btn-primary btn-outline-primary btn-block" style="background-color: purple; color: white; border-color: purple;">Pagar</button> </form>',
         //   showDenyButton: true,
          //  showConfirmButton: false,
          //  showCancelButton: true,
           // denyButtonText: `No pagar`,
           // width: '70%',
           // background: '#fff',
           // backdrop: ` rgba(0,0,123,0.4) 
           // left top
          //  no-repeat`


           // }).then((result) => {
          //  /* Read more about isConfirmed, isDenied below */
          //  if (result.isConfirmed) {
           //     Swal.fire('Saved!', '', 'success')
           //     }
          //  })

        Swal.fire({
            title: '<h3 class="text-purple "><i class="fas fa-money-check-alt"></i> PAGAR ADEUDO DE LIBRO</h3> ',
            html: '<b class="text-purple"> Pase a servicios escolares del plantel mas cercano y pague la cantidad de $' +moment(data.fechaPrestamo).add(3, 'days').diff(moment(), 'days') * -100 + ' </b><br/> <br/> <br/>  <div class="col-12  order-1 order-md-2"><p class="text-muted  text-justify">Si tienes dudas y tu pago no se ve reflejado es muy importante tener tu comprobante de pago a la mano para cualquier duda contacte a <b> <a href="mailto:sistemas.leon@unimundial.edu.mx ">sistemas.leon@unimundial.edu.mx </a>',
            showDenyButton: false,
            showConfirmButton: true,
            showCancelButton: false,
            confirmButtonText: `Entendido`,
            width: '30%',
            background: '#fff',
            backdrop: ` rgba(0,0,123,0.4)
            left top
            no-repeat`
        })

        

    }


    const genrarReferencia = () => {

        let dataAlumno = sessionStorage.getItem('datos');

        let _folio = JSON.parse(dataAlumno).chrClave;

        let numero_serivcio = '1279';

        let folio = _folio.padEnd(19, "0");

        let aletorio1 = Math.round(Math.random() * 9);

        let aletorio2 = Math.round(Math.random() * 9);

        // 1279A26052021NaN00000001801 | 27

        let concepto_pago = '01';

        let referencia = numero_serivcio + folio + aletorio1 + aletorio2 + concepto_pago;


           let id_concepto = 1;

            let matricula = _folio;


            let numero_servicio= 1279;

           let  monto_pago= "1110";

           let status= 0;

           let fecha_vencimiento= '2021-03-09';

           let  tipo= '2';

           let  id_carrera= 1;

           let  id_periodo = 1;

           let id_preregistro = _folio;

           let accion = "insertPagoAspirante";


        let _data = new FormData();

        _data.append('id_concepto', id_concepto);
        _data.append('matricula', matricula);
        _data.append('numero_servicio', numero_servicio);
        _data.append('monto_pago', monto_pago);
        _data.append('status', status);
        _data.append('fecha_vencimiento', fecha_vencimiento);
        _data.append('tipo', tipo);
        _data.append('id_carrera', id_carrera);
        _data.append('id_periodo', id_periodo);
        _data.append('id_preregistro', id_preregistro);
        _data.append('accion', accion);

        axios.post('https://sigev.unimundial.edu.mx/controladores/pago.controlador.php ', _data)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })

        return referencia;

    }

    





    


  




  return (

    <>
    <Navbar/>
    <br/>
    <br/>
    <div className="container"> 
        <div className="row" style={{backgroundImage: "linear-gradient(to right, #21012b, #21012b, #21012b)", color: 'white', padding: '20px', borderRadius: '10px'}}>
            <div className="col-md-3" style={{textAlign: 'center' , fontSize: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '100%', height: '100px', width: '100px', marginLeft: 'auto', marginRight: 'auto'}}> 

                
                 <img src={iconhead}alt="" style={{width: '100%', height: '100%', redius: '10px'}}/>
         



            </div>
            <div className="col-md-5">
            <center>

                <h4><b>Tu prestamo</b></h4>
                
                <i>Numero de seguimiento: {data.id} {data.idSolicitud} {data.idLibro}</i>
                <br/>
                <i>Fecha de solicitud: {data.fechaPrestamo}</i>
                <br/>
                {data.fechaDevolucion ? <i>Fecha de devolucion: {data.fechaDevolucion}</i> : <i>Fecha de devolucion: No Entregado</i>}
                <br/>
                <i>Estado: {data.status}</i>
                <br/>
                {data.status != 'vencido' && data.status == 'Activo' ?  <i>Recuerda que solo tienes hasta el {moment(data.fechaPrestamo).add(3, 'days').format('YYYY-MM-DD') } para entregar el libro sin que se te cobre una multa de $100 Mxn por dia de retraso</i> :
                data.status == 'vencido' ? <i>Se te cobrara una multa de $100 Mxn por dia de retraso</i>
                : <i>Fecha de entrega: {data.fechaPrestamo}</i>  }

</center>

         </div>

         <br/>
    <br/>   
            <div className="col-md-4" style={{marginRight: 'auto', marginLeft: 'auto'}}>

                <Timeline align="alternate">
                    <TimelineItem>
                        <TimelineOppositeContent>
                            <Typography variant="body2" color="white">
                            {data.fechaPrestamo}
                            </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                        <TimelineDot color="primary">
                            <FastfoodIcon />
                        </TimelineDot>
                        <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                        <Typography>Solicitud</Typography>
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineOppositeContent>
                            <Typography variant="body2" color="white">
                            {moment(data.fechaPrestamo).add(3, 'days').format('YYYY-MM-DD') }
                            </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                        <TimelineDot variant="outlined">
                            <LaptopMacIcon />
                        </TimelineDot>
                        <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                        <Typography>Fecha Limite</Typography>
                        </TimelineContent>
                    </TimelineItem>
                        <TimelineItem>
                        <TimelineOppositeContent>
                            <Typography variant="body2" color="white">
                            San francisco
                            </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                        <TimelineDot variant="outlined" color="secondary">
                            <HotelIcon />
                        </TimelineDot>
                        
                        </TimelineSeparator>
                        <TimelineContent>
                        <Typography>Entrega En</Typography>
                        </TimelineContent>
            
                    </TimelineItem>


                    
                    </Timeline>

            </div>
   




            <div className="col-md-8"  style={{marginRight: 'auto', marginLeft: 'auto', backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginTop: '5px'}}>
          
             
            <div className="row">

                <div className="col-md-4">

                {data.img != null ?
                data.img.startsWith("data") ? <img src={data.img} className="img-fluid" alt="Responsive image" style={{width: '70%', height: '200px'}}/> :  <img src="https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg" className="img-fluid" alt="Responsive image" style={{width: '70%', height: '200px'}}/>
                
                : <img src="https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg" className="img-fluid" alt="Responsive image" style={{width: '70%', height: '200px'}}/>
                }
                
            </div>
            <div className="col-md-5" style={{color: 'purple', textAlign: 'left' }}>
            <i className="fas fa-tint" style={{color: 'Purple', fontSize: '15px'}}>  </i> {data.titulo}
                <br/>
                <i className="fas fa-book" style={{color: 'Purple', fontSize: '15px'}}>  </i> {data.Paginas} páginas
                <br/>
                <i className="fas fa-language" style={{color: 'Purple', fontSize: '15px'}}>  </i> IDIOMA: Español
                <br/>
                <i className="fas fa-calendar-alt" style={{color: 'Purple', fontSize: '15px'}}>   </i>  FECHA EDICION: {moment(data.fechaEdicion).format('YYYY-MM-DD')}
                <br/>
                <i className="fas fa-bookmark" style={{color: 'Purple', fontSize: '15px'}}>  </i>CATEGORIA:  {data.area}
                <br/>
                <i className="fas fa-code-branch" style={{color: 'Purple', fontSize: '15px'}}>  </i> ISBN: {data.ISBN}
                <br/>
            </div>

            <div className="col-md-3" style={{backgroundColor: 'white', color: 'black', padding: '10px', borderRadius: '10px', cursor: 'pointer'}}>
               
                {
                    data.status == 'vencido' ? 
                    <div>
                        <i className="fas fa-exclamation-triangle" style={{color: 'red', fontSize: '15px'}}>  </i>  <b>Vencido</b>
                        <br/>
                        <br/>

                         <b>Multa: {data.fechaPrestamo ?  moment(data.fechaPrestamo).add(3, 'days').diff(moment(), 'days') * -100 : 0} Mxn</b>

                         <br/>                         <br/>
                         <br/>

                         <Button variant="outlined" color="secondary" onClick={() => {pagar(data.id)}}>Pagar Multa</Button>
                    </div>
                    : data.status == 'entregado' ?
                    <div>
                        <i className="fas fa-check-circle" style={{color: 'green', fontSize: '15px'}}>  </i>  <b>Libro Entregado</b>
                        <br/>
                        <b>Gracias por tu dedicacion</b>
                    </div>
                    : <div>
                        <i className="fas fa-times-circle" style={{color: 'red', fontSize: '15px'}}>  </i>  <b>Libro Sin Entregar</b>
                        <br/>
                         <b>Multa: $0 Mxn</b>
                    </div>

                }

                </div>
</div>
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

export default Prestamo