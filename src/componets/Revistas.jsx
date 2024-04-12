import React from 'react'
import { useState } from 'react'
import Stack from '@mui/material/Stack';
import "./style.css"
import Chip from '@mui/material/Chip';
import { PaginatedList } from 'react-paginated-list';
import styled from 'styled-components';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios'
import { useEffect } from 'react'


const Revistas = () => {

    const [search , setSearch] = useState('')

     const [detail , setDetail] = useState([])

    const [open, setOpen] = React.useState(false);



    const [revistas, setRevistas] = useState([])
       
      const consultarevistas = async () => {
        const res = await axios.get('http://localhost/modelos/serviciosLibreria.php?accion=consultarevistas');
        const data = await res.data;
        console.log(data);
        setRevistas(data);
    
     }


    useEffect(() => {
        consultarevistas()
      }, [])



    
    
      const handleSearch  = (e) => {

        if (e.target.value === '') {
          consultarevistas()
        }
      
    
        setSearch(e.target.value)
    
        //hace la busqueda en el arreglo de libros
        const results = revista.filter(revista => revista.titulo.toLowerCase().includes(search.toLowerCase()))
        setRevistas(results)
    
      }


      const handleDetail = (id) => {
       
        window.location.href = `/detail/${id}`
     
      }

      const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'rgb(255, 255, 255)',
        border: '2px solid purple',
        boxShadow: 24,
        p: 4,
        animation: 'fade-in 1s ease-in-out',
      };

  return (
    <div>  <Stack spacing={2} direction="row" justifyContent="center" alignItems="center" >

    <TextField label="Buscar" variant="outlined"  sx={{ width: '50%' }} color="secondary"  id="search" onChange={handleSearch} value={search }
    InputProps={{
      endAdornment: (
        <InputAdornment position="start">
          
          <SearchIcon color="secondary" />

        </InputAdornment>
      ),
    }}
    />
          </Stack>
          <br/>

    
    <div className = "row">
      
  
      
      <PaginatedList 
        list={revistas}
        itemsPerPage={9}
        ControlItem = { styled.li `list-style: none;
        display: inline-block;
        padding: 10px;
        border: 1px solid rgba(128, 128, 128, 0.8);
        margin: 0 5px;
        cursor: pointer;
        color: black;
        font-style: arial;
        border-radius: 100%;
        margin-bottom: 20px;
        text-align: center;
        width: 43px;
        &:hover {
        background: rgba(127, 18, 90, 0.2);
        color: rgba(127, 18, 90, 1.5);
        border: 1px solid rgba(127, 12, 90, 0.8);

        }
        &.active {
        background: rgba(127, 18, 90, 0.2);
        color: rgba(127, 18, 90, 1.5);
        border: 1px solid rgba(127, 12, 90, 0.8);


        }
        &.disabled {
          opacity: 0.5;
          border: 1px solid rgba(127, 12, 90, 0.8);

          cursor: not-allowed;
        }
        &.ellipsis {
          cursor: default;
        }
        &.ellipsis:hover {
          background: transparent;
        }
        &.ellipsis:active {
          background: transparent;
        }
        &.ellipsis:visited {
          background: transparent;
        }
        &.ellipsis:focus {
          background: transparent;
        }
        &.ellipsis:link {
          background: transparent;
        }
        &.ellipsis:active {
          background: transparent;
        }
       
        `}

        nextText= {<NavigateNextIcon fontSize='small' />}
        prevText= {<NavigateBeforeIcon fontSize='small' />}


        renderList={(list) => (
          <div className="row">
            
              {list.map((revista) => {
        

                return (
                  
                  <div className = "col-10 mx-auto col-md-6 col-lg-4 my-3"   onClick={() => handleDetail(revista.id)} >
                 
                
                    <div className = "card" style = {{width: '18rem'}}>
                   
                   
                    {revista.img != null ?
                revista.img.startsWith("data") ?  <img src = {revista.img} className = "card-img-top" alt = "revista" style = {{height: '13rem'}} /> :  <img src="https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg" className="img-fluid" alt="Responsive image" style = {{height: '14rem'}} />
                
                : <img src="https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg" className="img-fluid" alt="Responsive image" style = {{height: '14rem'}} />
                }

                   <div className = "card-body">
                
                
                        <h5 className = "card-title text-capitalize">{revista.titulo}</h5>
                     
                        <br />
      
                        
                        <Stack direction="row" spacing={1}>
                          {revista.ejemplares < 1 ? <Chip label="Prestado" color="error" variant='outlined' size="small"  /> : <Chip label="Disponible" color="success" variant='outlined' size="small"   /> }
          </Stack>
              </div>
              </div>
              </div>

                ) } ) } </div>
                
                
                
                ) } />

    </div>
  </div>
  )
}

export default Revistas