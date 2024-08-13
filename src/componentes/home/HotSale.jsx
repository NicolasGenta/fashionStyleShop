import React from 'react';
import './hot-sale.css';
import { useData } from '../../hooks/useData';
import { useWindowSize } from '../../hooks/useWindowSize';
import '../../index.css';
import { Card } from '../store/Card';

const HotSale = () => {
  const { datos } = useData();
  const hotSaleProducts = datos.filter(product => product.descuento);
  const { windowSize } = useWindowSize();

  return (
    <section className='hotSale-container'>
      <h2 >Hot Sale</h2>
      <main>
        <ul  style={{ display: 'flex', justifyContent: 'start', height: '100%', overflowX: 'scroll', overflowY: 'hidden', scrollbarWidth: 'none', padding: '1rem 3rem' }}>
          { hotSaleProducts.slice(0,5).map((producto, index) => {
              return(
                  <Card product={producto}/>
              )
          })}
        </ul>
      </main>
  </section>
  );
}


export default HotSale;
