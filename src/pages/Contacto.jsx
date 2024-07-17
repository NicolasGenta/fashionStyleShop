import React, { useState } from 'react'
import '../componentes/contacto/contacto.css'
import { useUser } from '../hooks/useUser'
import { APP_PROFILES } from '../util/dictionary';
import { useData } from '../hooks/useData';
import '../componentes/registro/auth.css'
import '../index.css';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const Contacto = () => {
  const { user } = useUser();
  const { emprendimientos } = useData();

  const [mensaje, setMensaje] = useState({})

  const handlerChange = (e) => {
    setMensaje({
      ...mensaje,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className='container-contacto flex' style={{ height: '516px', overflow: 'hidden' }}>
      <main className='shadow' style={{ height: 'max-content', alignSelf: 'center', padding: '2em' }}>
        <h2 className='title-contacto'>Contactenos</h2>
        <form className='flex wrap' style={{ gap: 10 }}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size='small'>
            <InputLabel id="demo-simple-select-standard-label">Enviar a</InputLabel>
            <Select
              name='to'
              onChange={handlerChange}
              value={mensaje.to}
            >
              {user && user.rol === APP_PROFILES.EMPRENDEDOR_PROFILE
                ? (<option>Administrador</option>)
                : (emprendimientos.map((emprendimiento) => {
                  if (emprendimiento.estado) return <MenuItem key={emprendimiento.id}>{emprendimiento.nombre}</MenuItem>
                }))
              }
            </Select>
          </FormControl>
          <section className='w-full flex' style={{ gap: 10 }}>
            <TextField
              label="Email"
              type='email'
              required
              name='email'
              value={mensaje.email}
              onChange={handlerChange}
              placeholder='email@gmail.com'
              variant='standard'
              sx={{
                width: '50%'
              }}
            ></TextField>
            <TextField
              label="Telefono"
              type='phone'
              value={mensaje.phone}
              onChange={handlerChange}
              placeholder='2244-123456'
              variant='standard'
              sx={{
                width: '50%'
              }}
            ></TextField>
          </section>
          <section className='w-full flex'>
            <TextField
              label="Mensaje"
              multiline
              name='mensaje'
              variant='standard'
              value={mensaje.mensaje}
              onChange={handlerChange}
              sx={{ width: '100%' }} />
          </section>
          <div className='w-full flex' style={{ justifyContent: 'end' }}>
            <Button type='reset'>Borrar</Button>
            <Button type='submit' variant='contained'>Enviar</Button>
          </div>
        </form>
      </main>
      <main className='flex wrap' style={{ height: '90%', width: '45%', justifyContent: 'center', alignContent: 'center' }}>
        <img src='./src/assets/images/contacto.png' style={{ width: '55%' }} />
        <h2 className='principal-color' style={{ fontWeight: 'bolder' }}>Red de Emprendedores</h2>
        <div className='flex' style={{ gap: 10 }}>
          <FmdGoodIcon />
          <p>Santa Catalina N° 456, Ciudad de Posadas, Misiones</p>
        </div>
        <div className='flex' style={{ gap: 10 }}>
          <LocalPhoneIcon />
          <p>0554446698752</p>
        </div>
      </main>
    </section>
  )
}

export default Contacto