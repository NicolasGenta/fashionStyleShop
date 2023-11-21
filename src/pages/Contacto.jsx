import React from 'react'
import '../componentes/contacto/contacto.css'
import { useUser } from '../hooks/useUser'
import { APP_PROFILES } from '../util/dictionary';
import { useData } from '../hooks/useData';
import '../componentes/registro/auth.css'

export const Contacto = () => {
  const { user } = useUser();
  const { emprendimientos } = useData();
  
  return (
    <section className='container-contacto'>
      <main className='box-shadow'>
        <h2 className='title-contacto'>Contactenos</h2>
        <form>
          <div>
            <label>Enviar a:</label>
            <select>
              {user?.rol === APP_PROFILES.EMPRENDEDOR_PROFILE
                ? (<option>Administrador</option>)
                : (emprendimientos.map((emprendimiento) => {
                  if (emprendimiento.estado) return <option key={emprendimiento.id}>{emprendimiento.nombre}</option>
                }))
              }
            </select>
          </div>
          <div>
            <label for="exampleFormControlInput1">Email address</label>
            <input type="email"
              id="exampleFormControlInput1"
              value={user?.email}
              placeholder="name@example.com" />
          </div>
          <div>
            <label for="telefono">Telefono</label>
            <input type="text"
              id="input-telefono"
              placeholder="2244-123456" />
          </div>
          <div>
            <label for="exampleFormControlTextarea1">Mensaje</label>
            <textarea id="exampleFormControlTextarea1" rrows="3"></textarea>
          </div>
          <div>
            <button type='submit'> Enviar </button>
            <button type='reset'>Borrar</button>
          </div>
        </form>
      </main>
      <main className='box-shadow'>
        <h2>Nuestras Oficinas</h2>
        <p>Santa Catalina N° 456, Ciudad de Posadas, Misiones</p>
        <p>Telefono: 0554446698752</p>
        <p>Horarios</p>
        <ul>
          <li>Lunes: de 8 a 22hrs</li>
          <li>Miercoles: de 8 a 22hrs</li>
          <li>Viernes: de 8 a 22hrs</li>
        </ul>
      </main>
    </section>
  )
}

export default Contacto