import React from 'react'
import { useState } from 'react'
import "./style.css"
import Button from '@mui/material/Button';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/MenuBook';
import FavoriteIcon from '@mui/icons-material/Newspaper';
import LocationOnIcon from '@mui/icons-material/Movie';
import LibrosLista from './Libros';
import PeliculasLista from './Peliculas';
import TesisLista from './Tesis';
import RevistasLista from './Revistas';


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