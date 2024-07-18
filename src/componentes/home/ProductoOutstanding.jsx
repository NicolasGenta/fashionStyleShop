import React from 'react'
import './produc-outstanding.css'
import { useData } from '../../hooks/useData';
import { useWindowSize } from '../../hooks/useWindowSize';
import { Card } from '../store/Card';

const ProductoOutstanding = () => {
  const { datos } = useData();
  const productsOutstanding = datos.filter(product => product.mas_comprado);
  const { windowSize } = useWindowSize();

  return (
    <section className='product-container'>
      <h2>Productos Destacados 🌟</h2>
      <main>
        <ul style={{ display: 'flex', justifyContent: 'start', height: '100%', overflowX: 'scroll', overflowY: 'hidden', scrollbarWidth: 'none', padding: '1rem 3rem' }}>
          {productsOutstanding.slice(0, 4).map((producto, index) => (
            <Card product={producto} />
          ))}
        </ul>
      </main>
    </section>
  )
}

export default ProductoOutstanding
