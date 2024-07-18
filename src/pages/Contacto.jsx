import React, { useState, useEffect } from 'react'
import '../componentes/contacto/contacto.css'
import { useUser } from '../hooks/useUser'
import { APP_PROFILES, RESOURCES } from '../util/dictionary';
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
import { useApp } from '../hooks/useApp';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog  from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import contactImage from '../../assets/images/contacto.png'

export const Contacto = () => {
  const { user } = useUser();
  const {loader, openLoader, closeLoader} = useApp()
  const { emprendimientos } = useData();
  const [selectedEmail, setSelectedEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [userEmail, setUserEmail] = useState(user?.mail || '');
  const [selectedEmprendimiento, setSelectedEmprendimiento] = useState('');
  const [selectedEmprendimientoDetails, setSelectedEmprendimientoDetails] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Actualizar detalles del emprendimiento seleccionado
    const empDetails = emprendimientos.find(emp => emp.nombre === selectedEmprendimiento);
    setSelectedEmprendimientoDetails(empDetails || {});
  }, [selectedEmprendimiento, emprendimientos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    openLoader()
    const templateParams = {
      to: selectedEmail || "emprende.dev11@gmail.com",
      from: userEmail,
      subject: "Nuevo mensaje de: Emprende",
      text: `Mensaje de ${userEmail} para ${selectedEmprendimiento}:\n\n${mensaje}\n\nTeléfono: ${telefono}`
    };

    fetch(RESOURCES.ENDPOINTS.SEND_EMAIL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(templateParams)
    })
    .then(response => {
      closeLoader()
      if (response.ok) {
        setOpen(true)
      } else {
        throw new Error('Error al enviar el correo');
      }
    })
    .catch(err => {
      console.error('Error al enviar el correo:', err);
      alert('Error al enviar el correo. Inténtalo de nuevo.');
    });

    // Limpia los campos del formulario
    setTelefono('');
    setMensaje('');
    setUserEmail(user?.mail || '');
    setSelectedEmprendimiento('');
    setSelectedEmprendimientoDetails({});
  };

  const handleSelectChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedEmprendimiento(selectedOption);
    const selectedEmp = emprendimientos.find(emp => emp.nombre === selectedOption);
    if (selectedEmp && selectedEmp.usuario) {
      setSelectedEmail(selectedEmp.usuario.mail);
    } else {
      setSelectedEmail('');
    }
  };

  const handleClose = () => {
    setOpen(close)
  }

  return (
    <section className='container-contacto flex' style={{ height: '516px', overflow: 'hidden' }}>
      <main className='shadow' style={{ height: 'max-content', alignSelf: 'center', padding: '2em' }}>
        <h2 className='title-contacto'>Contactenos</h2>
        {loader &&  
        <div className='w-full flex justify-center'>
          <CircularProgress/>
        </div> }
        <form className='flex wrap' style={{ gap: 10 }} onSubmit={handleSubmit}>
          <FormControl variant="standard" sx={{ width: '100%', minWidth: 120 }} size='small'>
            <InputLabel id="demo-simple-select-standard-label">Enviar a</InputLabel>
            <Select
              required
              onChange={handleSelectChange} value={selectedEmprendimiento}
            >
              {user?.rol === APP_PROFILES.EMPRENDEDOR_PROFILE
                ? (<option value="Administrador">Administrador</option>)
                : (
                  emprendimientos
                    .filter(emprendimiento => emprendimiento.estado)
                    .map((emprendimiento) => (
                      <option key={emprendimiento.id} value={emprendimiento.nombre}>
                        {emprendimiento.nombre}
                      </option>
                    ))
                )
              }
            </Select>
          </FormControl>
          <section className='w-full flex' style={{ gap: 10 }}>
            <TextField
              label="Email"
              type='email'
              required
              name='email'
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value) }
              placeholder='email@gmail.com'
              variant='standard'
              sx={{
                width: '50%'
              }}
            ></TextField>
            <TextField
              label="Telefono"
              type='phone'
              value={telefono}
              required
              onChange={(e) => setTelefono(e.target.value)}
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
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              sx={{ width: '100%' }} />
          </section>
          <div className='w-full flex' style={{ justifyContent: 'end' }}>
            <Button type='reset'>Borrar</Button>
            <Button type='submit' variant='contained'>Enviar</Button>
          </div>
        </form>
      </main>
      <main className='flex wrap' style={{ height: '90%', width: '45%', justifyContent: 'center', alignContent: 'center' }}>
        <img src={contactImage} style={{ width: '55%' }} />
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

      <Dialog
            open={open}
            onClose={handleClose}>
            <DialogTitle>Mensaje enviado</DialogTitle>
            <DialogContent>
                <p style={{ fontSize: '0.9em' }}>Se le informó al emprendimiento de su mensaje</p>
                <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'end' }}>
                    <Button variant='contained' onClick={handleClose}>Aceptar</Button>
                </div>
            </DialogContent>
        </Dialog>

    </section>
  );
};

export default Contacto;
