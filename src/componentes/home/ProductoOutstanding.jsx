import React from 'react'
import './produc-outstanding.css'
import { useData } from '../../hooks/useData';
import { useWindowSize } from '../../hooks/useWindowSize';

const ProductoOutstanding = () => {
  const { datos } = useData();
  const productsOutstanding = datos.filter(product => product.destacado);
  const {windowSize} = useWindowSize();

  return (
    <section className='product-container'>
        <h2>Productos Destacados 🌟</h2>
        <main className='products'>
          <ul style={{width: windowSize.width}}>
              {productsOutstanding.slice(0,4).map((producto, index) =>(
                <li key={index} className="producto">
                <img src={producto.img} alt={producto.nombre} />
                <p>{producto.nombre}</p>
              </li>
              ))}
          </ul>
        </main>
    </section>
  )
}

export default ProductoOutstanding
