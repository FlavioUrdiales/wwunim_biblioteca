import React from 'react'
import "./not.css"

const NotFound = () => {
  return (
    <>
    
    
    <div className="notFoundPage" style={{backgraundColor: "purple"}}>
    <section class="notFound">
        <div class="img">
        <img src="https://unimundial.edu.mx/images/logo_footer.png" alt="El Delorean, El Doc y Marti McFly" width={400} height={400} />
        </div>
        <div class="text">
        <h1>404</h1>
        <h2>PAGE NOT FOUND</h2>
        <h3>BACK TO HOME?</h3>
        <a href="/">YES</a>
        <a href="https://www.youtube.com/@universidadhumanimundial3310">NO</a>
        </div>
    </section>
</div>
    
    
    </>
    
  )
}

export default NotFound