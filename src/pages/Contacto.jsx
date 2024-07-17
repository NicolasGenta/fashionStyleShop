import React, { useState, useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import { useData } from '../hooks/useData';
import { APP_PROFILES } from '../util/dictionary';
import '../componentes/contacto/contacto.css';
import '../componentes/registro/auth.css';

export const Contacto = () => {
  const { user } = useUser();
  const { emprendimientos } = useData();
  const [selectedEmail, setSelectedEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [userEmail, setUserEmail] = useState(user?.mail || '');
  const [selectedEmprendimiento, setSelectedEmprendimiento] = useState('');
  const [selectedEmprendimientoDetails, setSelectedEmprendimientoDetails] = useState({});

  useEffect(() => {
    // Actualizar detalles del emprendimiento seleccionado
    const empDetails = emprendimientos.find(emp => emp.nombre === selectedEmprendimiento);
    setSelectedEmprendimientoDetails(empDetails || {});
  }, [selectedEmprendimiento, emprendimientos]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      to: selectedEmail || "emprende.dev11@gmail.com",
      from: userEmail,
      subject: "Nuevo mensaje de: Emprende",
      text: `Mensaje de ${userEmail} para ${selectedEmprendimiento}:\n\n${mensaje}\n\nTeléfono: ${telefono}`
    };

    console.log('templateParams:', templateParams);

    fetch('http://localhost:3000/emprendimiento/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(templateParams)
    })
    .then(response => {
      if (response.ok) {
        console.log('Correo enviado exitosamente');
        alert('Correo enviado exitosamente');
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

  return (
    <section className='container-contacto'>
      <main className='box-shadow'>
        <h2 className='title-contacto'>Contactenos</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Enviar a:</label>
            <select onChange={handleSelectChange} value={selectedEmprendimiento}>
              <option value="">Seleccione un emprendimiento</option>
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
            </select>
          </div>
          
          <div>
            <label htmlFor="exampleFormControlInput1">Email address</label>
            <input type="email"
              id="exampleFormControlInput1"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="name@example.com"
              required />
          </div>
          <div>
            <label htmlFor="telefono">Telefono</label>
            <input type="text"
              id="input-telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="2244-123456" />
          </div>
          <div>
            <label htmlFor="exampleFormControlTextarea1">Mensaje</label>
            <textarea id="exampleFormControlTextarea1"
              rows="3"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}></textarea>
          </div>
          <div>
            <button type='submit'>Enviar</button>
            <button type='reset' onClick={() => { setTelefono(''); setMensaje(''); }}>Borrar</button>
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
  );
};

export default Contacto;
