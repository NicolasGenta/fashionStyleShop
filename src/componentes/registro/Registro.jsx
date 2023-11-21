import './Registro.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from '../../hooks/useWindowSize';
import { NavForm } from './NavForm';
import { useForm } from '../../hooks/useForm';
import { convertFormToObject, updateCreate, validateFormRegister } from '../../util/functions';
import { Message } from './message';
import { METHODS, RESOURCES } from '../../util/dictionary';

const Registro = () => {

  const navigate = useNavigate();
  const {windowSize} = useWindowSize()

  const { type, firstName, lastName, email, password, onInputChange, onResetForm} = useForm({
    type: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  
  const onRegister = (e)=>{
    e.preventDefault();
    const form = document.getElementById('form-register');
    const formData = new FormData(form);
    if(validateFormRegister(formData) === undefined) {
      const data = convertFormToObject(formData);
      console.log(JSON.stringify(data));
      updateCreate(RESOURCES.ENDPOINTS.USUARIOS.REGISTER, data, METHODS.POST)
      .then(data => {
          navigate('/login', {
            replace:true
          })
          onResetForm();
      })
    };
  }


  return (
    <main id="registro" className='form-container' style={{height: windowSize.height -56}}>
            <section className='register-container'>
                <h2>Registrarse</h2>
                <form id="form-register" className='form-auth' onSubmit={onRegister}>
                  <main id="type"className='container-select'>
                    <input type='radio' 
                    name='type'
                    onChange={onInputChange}
                    required
                    value='Cliente'/>
                    <label className="input-option" htmlFor="type"> Cliente </label>
                    <input type='radio' 
                    name='type'
                    onChange={onInputChange}
                    value='Emprendedor'
                    required/>
                    <label className="input-option" htmlFor="type">Emprendedor </label>
                  </main>
                  <section style={{display: "flex", flexDirection: 'row', gap: 9, "margin-bottom": "0.5rem"}}>
                    <main>
                      <label htmlFor="firstName">Nombre</label>
                      <input 
                      className="register-input" 
                      id='firstName' 
                      name='firstName'
                      type="text" 
                      value={firstName}
                      required
                      onChange={onInputChange}
                      ></input>
                    </main>
                    <main>
                      <label htmlFor="lastName">Apellido</label>
                      <input 
                      className="register-input" 
                      id='lastName' 
                      name='lastName'
                      type="text"
                      value={lastName}
                      required
                      onChange={onInputChange}></input>
                    </main>
                  </section>
                  <main>
                    <label htmlFor="email">Correo Electronico</label>
                      <input 
                      className="register-input" 
                      id='email' 
                      name='email'
                      type="email"
                      value={email}
                      required
                      onChange={onInputChange}
                      ></input>
                    </main>
                  <main>
                    <label htmlFor="password">Contraseña</label>
                      <input  
                      className="register-input" 
                      id='password' 
                      type="password"
                      name='password'
                      value={password}
                      required
                      onChange={onInputChange}></input>
                  </main>
                  <main>
                    <button type="submit">Registrarse</button>
                  </main>
                  </form>
                  <NavForm backgroundColor="#445957"/>
            </section>
        </main>
    );
  };

export default Registro