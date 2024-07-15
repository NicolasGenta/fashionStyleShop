import './Registro.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useForm } from '../../hooks/useForm';
import { convertFormToObject, updateCreate, validateFormRegister } from '../../util/functions';
import { Message } from './message';
import { METHODS, RESOURCES } from '../../util/dictionary';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel'

const Registro = () => {

  const navigate = useNavigate();
  const { windowSize } = useWindowSize()

  const { type, firstName, lastName, email, password, onInputChange, onResetForm } = useForm({
    type: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [viewPassword, setViewPassword] = React.useState(false);

  //Handlers
  const handleViewPassword = () => {
    if (viewPassword) {
      setViewPassword(false)
    } else {
      setViewPassword(true)
    }
  }

  const onRegister = (e) => {
    e.preventDefault();
    const form = document.getElementById('form-register');
    const formData = new FormData(form);
    if (validateFormRegister(formData) === undefined) {
      const data = convertFormToObject(formData);
      console.log(JSON.stringify(data));
      updateCreate(RESOURCES.ENDPOINTS.USUARIOS.REGISTER, data, METHODS.POST)
        .then(data => {
          navigate('/login', {
            replace: true
          })
          onResetForm();
        })
    };
  }


  return (
    <main id="registro" className='form-container' style={{ height: windowSize.height - 56 }}>
      <section className='register-container'>
        <h2>Registrarse</h2>
        <form id="form-register" className='form-auth' onSubmit={onRegister}>
          {/* <main id="type" className='container-select'>
            <input type='radio'
              name='type'
              onChange={onInputChange}
              required
              value='Cliente' />
            <label className="input-option" htmlFor="type"> Cliente </label>
            <input type='radio'
              name='type'
              onChange={onInputChange}
              value='Emprendedor'
              required />
            <label className="input-option" htmlFor="type">Emprendedor </label>
          </main> */}
          <section style={{ display: "flex", flexDirection: 'row', gap: 9, "margin-bottom": "0.5rem" }}>
            <main>
              <TextField
                label="Nombre"
                name='firstName'
                type='text'
                value={firstName}
                required
                onChange={onInputChange}
                variant='standard'
              />
            </main>
            <main>
              <TextField
                label="Apellido"
                name='lastName'
                type='text'
                value={lastName}
                required
                onChange={onInputChange}
                variant='standard'
              />
            </main>
          </section>
          <FormControl style={{width: '100%', display: 'flex'}}>
            <FormLabel id="role">Tipo de usuario</FormLabel>
            <RadioGroup row name='type'>
              <FormControlLabel value="Emprendedor" control={<Radio/>} label="Emprendedor"/>
              <FormControlLabel value="Cliente" control={<Radio/>} label="Cliente"/>
            </RadioGroup>
          </FormControl>

          <FormControl sx={{width: '100%'}}>
            <TextField
              label="Correo Electronico"
              name='email'
              type='email'
              value={email}
              required
              onChange={onInputChange}
              variant='standard' />
          </FormControl>
          <main>
            <FormControl sx={{ width: '50%' }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">Contraseña</InputLabel>
              <Input
                id="password"
                name='password'
                value={password}
                onChange={onInputChange}
                type={viewPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <Tooltip title={viewPassword ? 'Ocultar' : 'Ver'}>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleViewPassword}
                      >
                        {viewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl sx={{ width: '50%' }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">Confirmar contraseña</InputLabel>
              <Input
                id="password"
                name='password'
                value={password}
                onChange={onInputChange}
                type={viewPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <Tooltip title={viewPassword ? 'Ocultar' : 'Ver'}>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleViewPassword}
                      >
                        {viewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                }
              />
            </FormControl>
          </main>
          <main>
            <Button type="submit">Registrarse</Button>
          </main>
        </form>
      </section>
    </main>
  );
};

export default Registro