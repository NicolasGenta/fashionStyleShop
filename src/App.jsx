import React from 'react';
import './App.css';
import { AppRoutes } from './routes/AppRoutes';
import { Cart } from './componentes/Store/Cart';
function App() {

  return (
    <>
    <Cart></Cart>
    <AppRoutes/>
    </>
  );
}

export default App;
