import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import { Navbar } from './componets/Navbar'
import { BrowserRouter, json, Route, Routes } from 'react-router-dom'
import Steps from './componets/Steps'
import ListBooks from './componets/Booklist'
import Detalle from './componets/Detalle'
import Login from './componets/login'
import CrudLibro from './pages/CrudLibro'
import Home from './pages/Home'
import Error from './pages/NotFound'
import Solicitudes from './pages/Solicitudes'
import Prestamo from './componets/Prestamo'
import Solicitudesadmin from './pages/Solicitudesadmin'
import axios from 'axios'


function App() {

  const [login, setLogin] = useState(false)
  const [data, setData] = useState([])
  const [tipeUser, setTipeUser] = useState('')

  useEffect(() => {
    const datos = JSON.parse(sessionStorage.getItem('datos'))
    if (datos) {
      axios.get('https://sae.unimundial.edu.mx/ani/serviceLogin.php?accion=login2&usuario=' + datos.chrClave + '&password=' + datos.chrPassword)
        .then(function (response) {
          // handle success
          setData(response.data)
          if (response.data.chrClave == datos.chrClave && response.data.chrPassword == datos.chrPassword) {

            let array1 = Object.values(response.data)
            let array2 = Object.values(datos)
            //contar cuantos elementos son iguales
            let count = 0
            for (let i = 0; i < array1.length; i++) {
              if (array1[i] == array2[i]) {
                count++
              }
            }
            //si los dos arreglos son iguales
            if (count == array1.length) {
              setLogin(true)
              if (response.data.bibliotecario == true) {
                setTipeUser('bibliotecario')
              }
              else if (response.data.bibliotecarioand == true) {
                setTipeUser('bibliotecarioand')
              }
              else if (response.data.bibliotecariojat == true) {
                setTipeUser('bibliotecariojat')
              }
              else if (response.data.bibliotecariosfr == true) {
                setTipeUser('bibliotecariosfr')
              }
              else if (response.data.bibliotecariosil == true) {
                setTipeUser('bibliotecariosil')
              }
              else {
                setTipeUser('usuario')
              }
            }
          } else {
            setLogin(false)
          }
        })
    }
  }, [
    login
  ])

  return (

    <BrowserRouter>
      {login ? (
        <>
          {tipeUser == 'bibliotecario' ? (
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/crudlibro" element={<CrudLibro />} />
            <Route path="/detail/:id" element={<Detalle />} />
            <Route path="/solicitudes" element={<Solicitudesadmin />} />
            <Route path="/prestamo/:id" element={<Prestamo />} />
            <Route path="*" element={<Error />} />
          </Routes>
          ) : tipeUser == 'bibliotecarioand' ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/crudlibro" element={<CrudLibro />} />
              <Route path="/detail/:id" element={<Detalle />} />
              <Route path="/solicitudes" element={<Solicitudes />} />
              <Route path="/prestamo/:id" element={<Prestamo />} />
              <Route path="*" element={<Error />} />
            </Routes>
          ) : tipeUser == 'bibliotecariojat' ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/crudlibro" element={<CrudLibro />} />
              <Route path="/detail/:id" element={<Detalle />} />
              <Route path="/solicitudes" element={<Solicitudes />} />
              <Route path="/prestamo/:id" element={<Prestamo />} />
              <Route path="*" element={<Error />} />
            </Routes>
          ) : tipeUser == 'bibliotecariosfr' ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/crudlibro" element={<CrudLibro />} />
              <Route path="/detail/:id" element={<Detalle />} />
              <Route path="/solicitudes" element={<Solicitudes />} />
              <Route path="/prestamo/:id" element={<Prestamo />} />
              <Route path="*" element={<Error />} />
            </Routes>
          ) : tipeUser == 'bibliotecariosil' ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/crudlibro" element={<CrudLibro />} />
              <Route path="/detail/:id" element={<Detalle />} />
              <Route path="/solicitudes" element={<Solicitudes />} />
              <Route path="/prestamo/:id" element={<Prestamo />} />
              <Route path="*" element={<Error />} />
            </Routes>
          ) : tipeUser == 'usuario' ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/crudlibro" element={<CrudLibro />} />
              <Route path="/detail/:id" element={<Detalle />} />
              <Route path="/solicitudes" element={<Solicitudes />} />
              <Route path="/prestamo/:id" element={<Prestamo />} />
              <Route path="*" element={<Error />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/crudlibro" element={<CrudLibro />} />
              <Route path="/detail/:id" element={<Detalle />} />
              <Route path="/solicitudes" element={<Solicitudes />} />
              <Route path="/prestamo/:id" element={<Prestamo />} />
              <Route path="*" element={<Error />} />
            </Routes>
          )}
          
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/crudlibro" element={<Login />} />
          <Route path="/detail/:id" element={<Login />} />
          <Route path="/solicitudes" element={<Login />} />
          <Route path="/prestamo/:id" element={<Login />} />

          <Route path="*" element={<Error />} />
        </Routes>

      )}
    </BrowserRouter>

  );
}

export default App;