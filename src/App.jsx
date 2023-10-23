import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import Registro from './componentes/registro/Registro';
import { Home } from './componentes/home/Home';
import Contacto from './componentes/contacto/Contacto';
import { Store } from './componentes/Store/Store';
import { getData } from './util/functions';
import { Cart } from './componentes/Store/Cart';

function App() {
  //const [profile, setProfile] = useState(APP_PROFILES.DEFAULT_PROFILE);

  return (
    <>
      <Router>
        <Cart></Cart>
        <Header/>
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "store" element = {<Store/>}/>
          <Route path = "contacto" element = {<Contacto/>}/>
          <Route path = "registro" element = {<Registro/>}/>
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App
