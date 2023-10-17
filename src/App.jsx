import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { APP_PROFILES, RESOURCES } from './util/dictionary';
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import Registro from './componentes/registro/Registro';
//import Home from './componentes/Home';
//import Tienda from './componentes/Tienda';
import Contacto from './componentes/contacto/Contacto';
import { Store } from './componentes/store/store';
import { getData } from './util/functions';

function App() {
  const [profile, setProfile] = useState(APP_PROFILES.DEFAULT_PROFILE);
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    getData(RESOURCES.PRODUCTS_API)
      .then(data => {
        setDatos(data);
      })
      .catch(error => {
        console.log("Se ha producido un error", error);
      });
  }, []);

  return (
      <Router>
        <Header/>
          <Routes>
            {/* <Route path = "/home" component = {Home}/> */}
            <Route path = "store" element = {<Store products={datos}/>}/>
            <Route path = "contacto" element = {<Contacto/>}/>
            <Route path = "registro" element = {<Registro/>}/>
          </Routes>
        <Footer/>
      </Router>
  )
}

export default App
