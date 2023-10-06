import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import Registro from './componentes/registro/Registro';
//import Home from './componentes/Home';
//import Tienda from './componentes/Tienda';
import Contacto from './componentes/contacto/Contacto';

function App() {
  

  return (
    <Router>
     <Header/>
      <Routes>
       {/* <Route path = "/home" component = {Home}/> */}
       {/* <Route path = "/tienda" component = {Tienda}/> */}
       <Route path = "contacto" element = {<Contacto/>}/>
       <Route path = "registro" element = {<Registro/>}/>
      </Routes>
     <Footer/>
    </Router>
  
  )
}

export default App
