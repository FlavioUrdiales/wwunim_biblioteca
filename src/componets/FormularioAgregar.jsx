import React from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
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
import { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LinearProgress from '@mui/material/LinearProgress';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';

const FormularioAgregar = () => {
    
    const [img, setImg] = useState('');
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [editorial, setEditorial] = useState('');
    const [fecha_edicion, setFecha_edicion] = useState( new Date());
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
    const [sipnosis, setSipnosis] = useState('');
    const [ejemplares, setEjemplares] = useState('');


  const [open, setOpen] = React.useState(false);

const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    console.log(base64);

    setImg(base64);

};


const planteles = [
    {
      value: '1',
      label: 'San Francisc del Rincon',
    },
    {
      value: '2',
      label: 'Silao',
    },
    {
      value: '3',
      label: 'León Andrade',
    },
    {
      value: '4',
      label: 'Juan Alonso de Torres',
    },
  ];

  const areas = [

    {
        value: 'Criminología',
        label: 'Criminología',
        },
        {
        value: 'Derecho',
        label: 'Derecho',
        },
        {
        value: 'Logística',
        label: 'Logística',
        },
        {
        value: 'Pedagogía',
        label: 'Pedagogía',
        },
        {
        value: 'Psicología',
        label: 'Psicología',
        },
        {
        value: 'Tecnologías de la Información',
        label: 'Tecnologías de la Información',
        },
        {
        value: 'Nutrición',
        label: 'Nutrición',
        },
        {
        value: 'Geronotología',
        label: 'Geronotología',
        },
        
    ];



    const limpiarCampos = () => {
        setImg('');
        setTitulo('');
        setAutor('');
        setEditorial('');
        setFecha_edicion('');
        setRegistro('');
        setArea('');
        setUbicacion('');
        setId_plantel('');
        setId_dep('');
        setId_categoria('');
        setId_departamento('');
        setCodigo('');
        setStatus('');
        setEstado('');
        setAsesor('');
        setImpreso('');
        setDescripcion('');
        setTipo('');
        setTipoLibro('');
        setISBN('');
        setPaginas('');
        setSipnosis('');
    }



    const agregarLibro = async (e) => {
        
       let  _data = new FormData();
        _data.append('titulo', titulo);
        _data.append('autor', autor);
        _data.append('editorial', editorial);
        _data.append('fecha_edicion', fecha_edicion);
        _data.append('registro', registro);
        _data.append('area', area);
        _data.append('ubicacion', ubicacion);
        _data.append('id_plantel', id_plantel);
        _data.append('id_dep', id_dep);
        _data.append('id_categoria', id_categoria);
        _data.append('id_departamento', id_departamento);
        _data.append('codigo', codigo);
        _data.append('status', status);
        _data.append('estado', estado);
        _data.append('id_usuario', null);
        _data.append('fecha_alta', null);
        _data.append('auditoria', null);
        _data.append('motivo_baja', null);
        _data.append('observacion_baja', null);
        _data.append('fecha_baja', null);
        _data.append('periodo', null);
        _data.append('asesor', asesor);
        _data.append('impreso', impreso);
        _data.append('descripcion', descripcion);
        _data.append('tipo', tipo);
        _data.append('tipoLibro', tipoLibro);
        _data.append('ISBN', ISBN);
        _data.append('Paginas', Paginas);
        _data.append('img', img);
        _data.append('sipnosis', sipnosis);
        _data.append('ejemplares', ejemplares);

        const res = await fetch('http://sci.unimundial.edu.mx/modelos/serviciosLibreria.php?accion=agregar', {
            method: 'POST',
            body: _data
        });
        const data = await res.json();
        alert(data);
        console.log(data);
        if (data === '{"response":true}') {
            Swal.fire(
                'Correcto',
                'Se agregó el libro',
                'success'
            )
            limpiarCampos();
        } else {
            Swal.fire(
                'Error',
                'No se agregó el libro',
                'error'
            )
        
        }

        const generarCodigo = async () => {

            let data = new FormData();
            data.append('plantel', id_plantel);
            data.append('departamento', id_dep);
            data.append('categoria', id_categoria);
            data.append('departamento', id_departamento);
            data.append('tipo', tipo);
            data.append('tipoLibro', tipoLibro);
            
          
              const res = await axios.post('http://sci.unimundial.edu.mx/modelos/generarCodigo.php', data);
              console.log(res);
              setCodigo(res.data);
          
          
          
          }



        }


  return (
    <div>
        <center>
        <h1 style={{color: 'purple'}}>AGREGAR LIBRO</h1>
        <LinearProgress color="secondary" />
        
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 2, width: '20ch' },
            }}
            noValidate
            autoComplete="off"
        >
<div>

            <div className='card'>
                
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-md-12'>
                            
                            <div className='form-group'>
                                <input type='file' className='form-control' onChange={handleFileChange}  accept="image/*" color='purple' />
                            </div>
                            <br />
                         <img src={img} alt='img' width='200' height='200' />
                        </div>

             
                        </div>
                       

            <TextField id="txtPlantel" select label="Plantel" variant="outlined" color='secondary' defaultValue="1" helperText="Selecciona el plantel" onChange={(e) => setPlantel(e.target.value)} >
            {planteles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                {option.label}
                </MenuItem>
            ))}

            </TextField>
            <TextField id="txtDepartamento" select label="Departamento" variant="outlined" color='secondary' defaultValue="CA" helperText="Selecciona el plantel" onChange={(e) => setPlantel(e.target.value)} > 
            <MenuItem value="CA">Coordinacion Academica </MenuItem>
            </TextField>
            <TextField id="txtUbicacion" select label="Ubicacion" variant="outlined" color='secondary' defaultValue="14" helperText="Selecciona el plantel" onChange={(e) => setPlantel(e.target.value)} >
            <MenuItem value="14">Biblioteca</MenuItem>
            </TextField>
            <TextField id="txtCategoria" select label="Categoria" variant="outlined" color='secondary' defaultValue="LB" helperText="Selecciona el plantel" onChange={(e) => setPlantel(e.target.value)} >
            <MenuItem value="LB">Libros </MenuItem>
            </TextField>
            <TextField id="txtArea" select label="Area" variant="outlined" color='secondary' defaultValue="LB" helperText="Selecciona el plantel" onChange={(e) => setPlantel(e.target.value) } >
                {areas.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
            </TextField>




            <TextField id="txtCodigo" label="Codigo" variant="outlined" color='secondary' onChange={(e) => setCodigo(e.target.value)}  focused  value={codigo}    InputProps={{
            readOnly: true,
          }}  />
            <TextField id="txtTitulo" label="Titulo" variant="outlined" color='secondary' onChange={(e) => setTitulo(e.target.value)} 

                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                            ),
                        }}
                    value={titulo}
            />
            <TextField id="txtAutor" label="Autor" variant="outlined" color='secondary' onChange={(e) => setAutor(e.target.value)} 
             InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <AccountCircle />
                </InputAdornment>
                ),
            }}
            value={autor}
/>
            <TextField id="txtEditorial" label="Editorial" variant="outlined" color='secondary' onChange={(e) => setEditorial(e.target.value)} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileDatePicker
          label="Fecha de edicion"
          inputFormat="MM/DD/YYYY"
          value={fecha_edicion}
          onChange={(newValue) => { setFecha_edicion(newValue); }}
            renderInput={(params) => <TextField {...params}  color='secondary' />}
        />
        </LocalizationProvider>
            <TextField id="txtEdicion" label="Registro" variant="outlined" color='secondary' onChange={(e) => setRegistro(e.target.value)} value={registro} />
            <TextField id="txtPaginas" label="Paginas" variant="outlined" color='secondary' onChange={(e) => setPaginas(e.target.value)} value={Paginas} />
            <TextField id="txtISBN" label="ISBN" variant="outlined" color='secondary' onChange={(e) => setISBN(e.target.value)} value={ISBN} />
            <TextField id="txtEjemplares" label="Ejemplares" variant="outlined" color='secondary' onChange={(e) => setEjemplares(e.target.value)}           type="number" value={ejemplares} />
           
            
            <textarea className='form-control' placeholder='sinopsis' onChange={(e) => setSipnosis(e.target.value)} value={sipnosis} style={{width: '84%', height: '100px', marginLeft: '8%'}}></textarea>
            <br />
            <Button variant="contained" color='secondary' onClick={agregarLibro}>Agregar</Button>

          
            </div>
            </div> </div>
           </Box>
           </center>

           
    </div>




                

    
  )
}

export default FormularioAgregar