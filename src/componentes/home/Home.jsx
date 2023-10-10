import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Carrusel from './Carrusel';
import HotSale from './hotSale';
import ProductoOutstanding from './ProductoOutstanding';
import './Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <div className="main-content">
        <Carrusel />
      </div>
       <HotSale/>
       <ProductoOutstanding/>
      <Footer />
    </div>
  );
};

export default Home;

