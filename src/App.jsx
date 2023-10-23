import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import Registro from './componentes/registro/Registro';
//import Home from './componentes/Home';
//import Tienda from './componentes/Tienda';
import Contacto from './componentes/contacto/Contacto';
import { Store } from './componentes/Store/Store';
import { getData } from './util/functions';
import { Cart } from './componentes/Store/Cart';

function App() {
  //const [profile, setProfile] = useState(APP_PROFILES.DEFAULT_PROFILE);
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    getData("http://localhost:3000/productos/")
      .then(data => {
        console.log(data);
        setDatos(data);
      })
      .catch(error => {
        console.log("Se ha producido un error", error);
      });
  }, []);

  console.log(datos);
  return (
      <Router>
        <Cart></Cart>
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
