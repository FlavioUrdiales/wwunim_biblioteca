import React from 'react'
import { Link } from 'react-router-dom'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Navbar from '../componets/navbar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import AddCircle from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
  import { DataGrid, GridToolbar, gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
    GridToolbarContainer } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import FormularioAgregar from '../componets/FormularioAgregar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import RemoveCircle from '@mui/icons-material/RemoveCircle';

const CrudLibro = () => {


//titulo, autor, editorial, fecha_edicion, registro, area, ubicacion, id_plantel, id_dep, id_categoria, id_departamento, codigo, status, estado, asesor, impreso, descripcion, tipo, tipoLibro, ISBN, Paginas

const [titulo, setTitulo] = useState('');
const [autor, setAutor] = useState('');
const [editorial, setEditorial] = useState('');
const [fecha_edicion, setFecha_edicion] = useState('');
const [registro, setRegistro] = useState('');
const [area, setArea] = useState('');
const [ubicacion, setUbicacion] = useState('');
const [id_plantel, setId_plantel] = useState('');
const [id_dep, setId_dep] = useState('');
const [id_categoria, setId_categoria] = useState('');
const [id_departamento, setId_departamento] = useState('');
const [codigo, setCodigo] = useState('');
const [status, setStatus] = useState('');
const [estado, setEstado] = useState('');
const [asesor, setAsesor] = useState('');
const [impreso, setImpreso] = useState('');
const [descripcion, setDescripcion] = useState('');
const [tipo, setTipo] = useState('');
const [tipoLibro, setTipoLibro] = useState('');
const [ISBN, setISBN] = useState('');
const [Paginas, setPaginas] = useState('');
const [img, setImg] = useState('');
const [sipnosis, setSipnosis] = useState('');
const [open, setOpen] = React.useState(false);
const [classdatagrid, setClassdatagrid] = useState('col-md-12');



const agregarLibro = async () => {
    const res = await axios.get('http:sci.unimundial.edu.mx/modelos/insertarLibro.php?titulo='+titulo+'&autor='+autor+'&editorial='+editorial+'&fecha_edicion='+fecha_edicion+'&registro='+registro+'&area='+area+'&ubicacion='+ubicacion+'&id_plantel='+id_plantel+'&id_dep='+id_dep+'&id_categoria='+id_categoria+'&id_departamento='+id_departamento+'&codigo='+codigo+'&status='+status+'&estado='+estado+'&asesor='+asesor+'&impreso='+impreso+'&descripcion='+descripcion+'&tipo='+tipo+'&tipoLibro='+tipoLibro+'&ISBN='+ISBN+'&Paginas='+Paginas);
    console.log(res);
    alert('Libro agregado');
    
}







const [libros, setLibros] = useState([]);

const getLibros = async () => {
    const res = await axios.get('http://sci.unimundial.edu.mx/modelos/serviciosLibreria.php?accion=consultarlibros ');
    const data = res.data;
    setLibros(data);
    console.log(data);

   
}


useEffect(() => {
    getLibros();
}, [])

const columns = [
    { field: 'id', headerName: 'ID', width: 70 , editable : false},
    { field: 'titulo', headerName: 'Titulo', width: 130  , editable : true},
    { field: 'autor', headerName: 'Autor', width: 130 },
    { field: 'editorial', headerName: 'Editorial', width: 130 },
    { field: 'fecha_edicion', headerName: 'Fecha de Edicion', width: 130 },
    { field: 'registro', headerName: 'Registro', width: 130 },
    { field: 'area', headerName: 'Area', width: 130 },
    { field: 'ubicacion', headerName: 'Ubicacion', width: 130 },
    { field: 'id_plantel', headerName: 'ID Plantel', width: 130 , editable : true },
    { field: 'codigo', headerName: 'Codigo', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'estado', headerName: 'Estado', width: 130 },
    { field: 'asesor', headerName: 'Asesor', width: 130 },
    { field: 'impreso', headerName: 'Impreso', width: 130 },
    { field: 'descripcion', headerName: 'Descripcion', width: 130 },
    { field: 'tipo', headerName: 'Tipo', width: 130 },
    { field: 'tipoLibro', headerName: 'Tipo de Libro', width: 130 },
    { field: 'ISBN', headerName: 'ISBN', width: 130 },
    { field: 'Paginas', headerName: 'Paginas', width: 130 },
    { field: 'img', headerName: 'Imagen', width: 130 },
    { field: 'sipnosis', headerName: 'Sipnosis', width: 130 },
    
];

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="secondary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}



function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton color='secondary' />
      <GridToolbarFilterButton color='secondary' />
      <GridToolbarDensitySelector color='secondary' />
      <GridToolbarExport color='secondary' />
      {ocultar ?       <IconButton onClick=  {() => {mostrarAgregar()}} color='secondary'>  <AddCircle color='secondary' /> <a style={{color: "purple" , fontSize: "13px", fontFamily: "Arial"}}>AGREGAR LIBRO</a></IconButton>
:       <IconButton onClick=  {() => {ocultarAgregar()}} color='secondary'>  <RemoveCircle color='secondary' /> <a style={{color: "purple" , fontSize: "13px", fontFamily: "Arial"}}>OCULTAR AGREGAR LIBRO</a></IconButton>
}

    </GridToolbarContainer>

  );
}



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'rgb(255, 255, 255)',
  border: '2px solid purple',
  boxShadow: 24,
  p: 4,
  animation: 'fade-in 1s ease-in-out',
};



const [ocultar, setOcultar] = useState(true);

const ocultarAgregar = () => {

  setClassdatagrid("col-md-12");

  setOcultar(true);
}

const mostrarAgregar = () => {

  setClassdatagrid("col-md-7");

  setOcultar(false);
}



  return (
    <>
    <Navbar/>


    <div className="container" style={{marginTop: "50px" , backgroundColor : " #rgba(127, 18, 90, 0.2) "}}>
      <div className="row">
        <div className="col-md-12">
        <center>            <h1  style={{color: "purple", textAlign: "center"}}>GESTOR DE LIBROS</h1>
</center>


<br></br>

        <div className='row'>
        <div className='col-md-5'>
          {ocultar ? null :<FormularioAgregar/>}

        </div>
        
        <div className={classdatagrid}>

                  <div style={{ height: 990, width: '100%' }}>
                    <br></br><br/><br/>
                    <DataGrid
                      rows={libros}
                      columns={columns}
                      //hiden true in columns id_plantel
                      pageSize={5}
                      checkboxSelection
                      disableSelectionOnClick
                      components={{
                        Toolbar: CustomToolbar,
                        Pagination: CustomPagination,
                      }}
                    />


                    </div>

                  </div>
                  </div>

   
        </div>
        </div>

          </div>





     <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                  <Box sx={style}>
                    <BottomNavigation  showLabels>
                      <BottomNavigationAction label="Libro" />
                      <BottomNavigationAction label="Revista" />
                      <BottomNavigationAction label="Tesis" />
                    </BottomNavigation>


 
                    <br></br>
                    <div className="row">
                      <div className="col-md-12">
                        <center>

                    <FormularioAgregar/>
                    </center>
                    </div>
                    </div>

                    
                  </Box>
                </Modal>


    </>


    





  )
}

export default CrudLibro