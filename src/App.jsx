import React from 'react';
import './App.css';
import { AppRoutes } from './routes/AppRoutes';
import { Cart } from './componentes/Store/Cart';
import Footer from './componentes/Footer';

function App() {

  return (
    <>
    <Cart></Cart>
    <AppRoutes/>
    <Footer/>
    </>
  );
}

export default App;
