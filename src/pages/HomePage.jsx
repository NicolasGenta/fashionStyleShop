import React from 'react';
import Carrusel from '../componentes/home/Carrusel';
import HotSale from '../componentes/home/hotSale';
import ProductoOutstanding from '../componentes/home/ProductoOutstanding';
import '../componentes/home/home.css'
import { useUser } from '../hooks/useUser';

export const Home = () => {
  const {user} = useUser();

  console.log(user);
  return (
    <div className="home-container">
      <div className="main-content">
        <Carrusel />
      </div>
      <HotSale/>
      <ProductoOutstanding/>
    </div>
  );
};


