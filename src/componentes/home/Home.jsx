import React from 'react';
import Carrusel from './Carrusel';
import HotSale from './hotSale';
import ProductoOutstanding from './ProductoOutstanding';
import './Home.css'; 

export const Home = () => {
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


