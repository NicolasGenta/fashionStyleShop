import React from 'react'
import '../componentes/contacto/contacto.css'
import { useUser } from '../hooks/useUser'
import { APP_PROFILES } from '../util/dictionary';
import { useData } from '../hooks/useData';
import '../componentes/registro/auth.css'
import '../index.css';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import  TextField from '@mui/material/TextField';

export const Contacto = () => {
  const { user } = useUser();
  const { emprendimientos } = useData();

  return (
    <section className='container-contacto' style={{height: '516px', overflow: 'hidden'}}>
      <main className='shadow' style={{height: '90%'}}>
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
      <main className='flex wrap' style={{ height: '90%', width: '45%', justifyContent: 'center', alignContent: 'center' }}>
        <img src='./src/assets/images/contacto.png' style={{ width: '55%' }} />
        <h2 className='principal-color' style={{ fontWeight: 'bolder' }}>Red de Emprendedores</h2>
        <div className='flex' style={{gap: 10}}>
          <FmdGoodIcon />
          <p>Santa Catalina N° 456, Ciudad de Posadas, Misiones</p>
        </div>
        <div className='flex' style={{gap: 10}}>
          <LocalPhoneIcon />
          <p>0554446698752</p>
        </div>
      </main>
    </section>
  )
}

export default Contacto