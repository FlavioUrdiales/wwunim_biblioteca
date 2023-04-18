import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import Stack from '@mui/material/Stack'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Check from '@mui/icons-material/Check'
import SettingsIcon from '@mui/icons-material/ManageSearch'
import logo from '../assets/logo.png'
import "./style.css"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/MenuBook';

import FavoriteIcon from '@mui/icons-material/Newspaper';
import LocationOnIcon from '@mui/icons-material/Movie';
import Badge from '@mui/material/Badge';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { PaginatedList } from 'react-paginated-list';

import Pagination from '@mui/material/Pagination';
import styled from 'styled-components';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import LibrosLista from './Libros';
import PeliculasLista from './Peliculas';
import TesisLista from './Tesis';
import RevistasLista from './Revistas';
import { Link } from 'react-router-dom'


const Booklist = () => {



  const [search , setSearch] = useState('')



  

  const buttons = [
    <Button key="Libros" >Libros</Button>,
    <Button key="Peliculas">Peliculas</Button>,
    <Button key="Tesis">Tesis</Button>,
    <Button key="Revistas">Revistas</Button>,
  ];

  const [value, setValue] = React.useState('Libros');
  const [title , setTitle] = useState('LIBROS')

  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === 'Libros') {
      setTitle('LIBROS')
    } else if (newValue === 'Peliculas') {
      setTitle('PELICULAS')
    }
    else if (newValue === 'Tesis') {
      setTitle('TESIS')
    }
    else if (newValue === 'Revistas') {
      setTitle('REVISTAS')
    }



  };





  return (

    <div className = "container">
            <h1  style={{color: "purple", textAlign: "center"}}>LISTA DE {title}</h1>
            <br/>

      <div className = "row">
        <center>
        <BottomNavigation sx={{ width: 400 }} value={value} onChange={handleChange} height="200px">
      <BottomNavigationAction
        label="Libros"
        value="Libros"
        icon={<RestoreIcon  fontSize='large'/>}
      />
      <BottomNavigationAction
        label="Revistas"
        value="Revistas"
        icon={<FavoriteIcon fontSize='large'/>}
      />
      <BottomNavigationAction
        label="Peliculas"
        value="Peliculas"
        icon={<LocationOnIcon fontSize='large'/>}
      />
      <BottomNavigationAction label="Tesis" value="Tesis" icon={<FolderIcon fontSize='large'/>} />
    </BottomNavigation>
        </center>
      </div>
      <br/><br/>
     
    {value === 'Libros' && <LibrosLista/>}
    {value === 'Peliculas' && <PeliculasLista/>}
    {value === 'Tesis' && <TesisLista/>}
    {value === 'Revistas' && <RevistasLista/>}
    


    </div>
       






  )
}

export default Booklist