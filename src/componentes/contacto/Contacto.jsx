import React from 'react'
import { FormControl } from 'react-bootstrap'
import { useWindowSize } from '../../hooks/useWindowSize'
import './contacto.css';

const Contacto = () => {

  return (
    <>
    
      <h2 className='title-contacto'>Contactenos</h2>
      <section className='container-contacto'>
        <main>
          <div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Email address</label>
              <FormControl type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <div>
              <button type='submit'> Enviar </button>
              <button type='reset'>Borrar</button>
            </div>
          </div>
        </main>
        <section>
          <h2>Nuestras Oficinas</h2>
          <p>Santa Catalina N° 456, Ciudad de Posadas, Misiones</p>
          <p>Telefono: 0554446698752</p>
          <p>Horarios</p>
          <ul>
            <li>Lunes: de 8 a 22hrs</li>
            <li>Miercoles: de 8 a 22hrs</li>
            <li>Viernes: de 8 a 22hrs</li>
          </ul>
        </section>
      </section>
    </>
  )
}

export default Contacto