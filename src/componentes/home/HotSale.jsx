import React from 'react';
import './hot-sale.css';

const HotSale = () => {
    
    const hotSale = [
        {
            nombre: "LUNE Sudadera con estampado de letra con forro",
            img: "https://img.ltwebstatic.com/images3_pi/2023/07/18/16896441460352109edf60d31c06682784c20608b2_thumbnail_600x.webp",
    },
    {
     
        nombre: "Manfinity EMRG Hombres Camiseta con estampado",
        img: "https://img.ltwebstatic.com/images3_pi/2023/04/06/1680759342e8849d12586ae3e69d3f548b3deabee5_thumbnail_600x.webp",



    },
      {
        nombre: "Manfinity Homme Hombres Capucha japonés carácter & con estampado de onda",
        img: "https://img.ltwebstatic.com/images3_pi/2022/08/25/1661394095cc055ccf2d15e73b0394a6c595649835_thumbnail_600x.webp",

      },

        
    ];
  return (
    <div className='hot-sale'>
     <h2 className='hot-sale-title'>Hot Sale</h2>
    <div className="productos-destacados">
    {hotSale.map((producto, index) => (
      <div key={index} className="producto">
        <h3>{producto.nombre}</h3>
        <img src={producto.img} alt={producto.nombre} />
      </div>
    ))}
  </div>
  </div>
);
}


export default HotSale;
