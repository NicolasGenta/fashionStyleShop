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
import { useApp } from '../../hooks/useApp';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

const Registro = () => {

  const navigate = useNavigate();
  const { windowSize } = useWindowSize();
  const { loader, error, handlerError, openLoader, closeLoader } = useApp();

  const { type, firstName, lastName, email, password, onInputChange, onResetForm } = useForm({
    type: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [viewPassword, setViewPassword] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validation, setValidation] = useState(null);

  //Handlers
  const handleViewPassword = () => {
    if (viewPassword) {
      setViewPassword(false)
    } else {
      setViewPassword(true)
    }
  }

  const handlerConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if(e.target.value !== password) {
      setValidation('PASS_ERR')
    }else {
      setValidation(null)
    }
  }

  const onRegister = (e) => {
    if(error) {
      handlerError(false)
    }
    e.preventDefault();
    openLoader();
    const form = document.getElementById('form-register');
    const formData = new FormData(form);
    if (validateFormRegister(formData) === undefined) {
      const data = convertFormToObject(formData);
      fetch(RESOURCES.ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => {
        if(!res.ok) throw new Error('Problema al precesar el fetch')
      })
        .then(() => {
          closeLoader()
          navigate('/login', {
            replace: true
          })
          onResetForm();
        })
      .catch(error => {
        handlerError(true)
      })
    };
  }


  return (
    <main id="registro" className='flex wrap' style={{ height: windowSize.height - 56, alignItems: 'center', justifyContent: 'space between', overflowY: 'hidden' }}>
      <section className=' flex wrap shadow' style={{ width: '40%', height: '80%', minHeight: '90%', margin: '1.5em', padding: '2em', justifyContent: 'center', overflow: 'hidden', alignContent: 'center' }}>
        <main className='flex wrap' style={{gap:10, justifyContent: 'center', marginTop: '1.5em'}}>
          <h2 className="principal-color " style={{ fontWeight: 'bolder', fontSize: '2em' }} >Registrarse</h2>
          <main style={{ width: '90%' }}>
            <p style={{ fontSize: '0.7em', textAlign: 'center' }}>Regístrate para descubrir y apoyar a emprendedores locales, y accede a productos únicos y hechos a mano.</p>
          </main>
        </main>
        <div className='flex wrap' style={{alignContent: 'start'}}>
        {loader &&  
        <div className='w-full flex justify-center'>
          <CircularProgress/>
        </div>
        }
        {error && <Alert severity='error' sx={{width: '100%'}}>No se pudo crear el usuario</Alert>}
          <form id="form-register" style={{gap: 5}} className='form-auth' onSubmit={onRegister}>
            <section style={{ display: "flex", flexDirection: 'row', gap: 10 }}>
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
            <FormControl variant="standard" sx={{ minWidth: 120 }} size='small' className='w-full'>
              <InputLabel id="demo-simple-select-standard-label">Tipo de Usuario</InputLabel>
              <Select
                label="Tipo de usuario"
                name='type'
                value={type}
                onChange={onInputChange}
                required
              >
                <MenuItem value="Emprendedor">Emprendedor</MenuItem>
                <MenuItem value="Cliente">Cliente</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: '100%' }}>
              <TextField
                label="Correo Electronico"
                name='email'
                type='email'
                value={email}
                required
                onChange={onInputChange}
                variant='standard' />
            </FormControl>
            <main className='flex' style={{gap: 10}}>
              <FormControl  sx={{ width: '50%' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Contraseña</InputLabel>
                <Input
                  id="password"
                  name='password'
                  error = {validation === 'PASS_ERR' && true}
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
                {validation === 'PASS_ERR' && <FormHelperText sx={{color: 'red'}} >La contraseña no coincide</FormHelperText>}
              </FormControl>
              <FormControl sx={{ width: '50%' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Confirmar contraseña</InputLabel>
                <Input
                  id="password"
                  name='password'
                  value={confirmPassword}
                  error = {validation === 'PASS_ERR' && true}
                  onChange={handlerConfirmPassword}
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
                {validation === 'PASS_ERR' && <FormHelperText sx={{color: 'red'}} >La contraseña no coincide</FormHelperText>}
              </FormControl>
            </main>
            <main className='w-full flex justify-center'>
              <Button type="submit" variant='contained' disabled={validation && true} color='primary'>Registrarse</Button>
            </main>
          </form>
          <div className='flex w-full' style={{ gap: 10, alignContent: 'center', padding: '0.5em', justifyContent: 'center' }}>
            <p style={{ height: '100%', alignContent: 'center', fontSize: '0.9em' }}>¿Ya tienes cuenta?</p>
            <Button onClick={() => { 
              handlerError(false)
              navigate('/login')
              }}>Iniciar Sesión</Button>
          </div>
        </div>
      </section>
      <section className="flex" style={{ width: '50%', height: '80%', alignContent: 'center', justifyContent: 'center' }}>
        <img src='./src/assets/images/illustration_buy.jpg' style={{ width: '80%', scale: '1:1' }} />
      </section>
    </main>
  );
};

export default Registro