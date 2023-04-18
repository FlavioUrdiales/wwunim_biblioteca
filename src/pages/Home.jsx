import React from 'react'
import { Navbar } from '../componets/Navbar'
import Steps from '../componets/Steps'
import ListBooks from '../componets/Booklist'
import { sha1 } from 'object-hash'
import moment from 'moment'
import { useEffect, useState } from 'react'


const Home = () => {

  const [token, setToken] = useState("")

  useEffect(() => {
    const datos = JSON.parse(sessionStorage.getItem('datos'))
    if (datos) {
      //recoger chrclave y chrpassword

      let chrClave = datos.chrClave
      let chrPassword = datos.chrPassword


      
      let caducidad = moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss')

                //el token tiene la siguiente estructura, usuario:usuario, password:password,caducidad:fecha
      let token = "usuario:" + chrClave + ",password:" + chrPassword + ",caducidad:" + caducidad


      setToken(token)



    } 

  }, [])



  return (
    <>

      <div className="App-header">
        <Navbar />
      </div>


      <div className="App-body">
        <br />


        <h1 style={{ color: "purple", textAlign: "center" }}>PASOS A SEGUIR PARA EL PRESTAMO</h1>
        <Steps />
        <br />      <br />

        <ListBooks />


      </div>

    </>

  )
}

export default Home