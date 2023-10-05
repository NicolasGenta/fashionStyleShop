import React from 'react';
import { BrowserRouter as Router, Swith } from 'react-router-dom';
import './App.css'
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import Registro from './componentes/registro/Registro';
import Home from './componentes/Home';
import Tienda from './componentes/Tienda';
import Contacto from './componentes/Contacto';

function App() {
  

  return (
    <Router>
     <Header/>
      <Swith>
       <Router path = "/home" component = {Home}/>
       <Router path = "/tienda" component = {Tienda}/>
       <Router path = "/contacto" component = {Contacto}/>
       <Router path = "/registro" component = {Registro}/>
      </Swith>
     <Footer/>
    </Router>
  
  )
}

export default App
