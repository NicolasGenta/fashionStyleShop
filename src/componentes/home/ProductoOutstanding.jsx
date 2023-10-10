import React from 'react'
import './produc-outstanding.css'

 const producto = [{
    nombre: "Kids EVRYDAY Niños Pantalones deportivos con sudadera con estampado",
    imagen:"https://img.ltwebstatic.com/images3_pi/2022/09/28/166436653304cc465805bb5d2cd19720e8b17d8c81_thumbnail_600x.webp",
    descripcion: "pantalon gris",
    precio:21000
 },
 {
    nombre: "pantalon shoggin ",
    imagen:  "https://http2.mlstatic.com/D_NQ_NP_759743-MLA49274221244_032022-O.webp",
    descripcion:"pantalon verde",
    precio:2500
},
 {
    nombre: "remera ",
    imagen:"https://d2r9epyceweg5n.cloudfront.net/stores/001/719/894/products/remera_lisa_amarilla1-ad7aabde36568fbb6316249901780168-640-0.png",
    descripcion:"remera azul",
    precio:50000

 },

 {
nombre:"Pendientes largos flor",
imagen:"https://img.ltwebstatic.com/images3_spmp/2023/05/31/16854624445888ddea65b4b83db09a00cd8163ec90_thumbnail_600x.webp",
descripcion:"De acero inoxidable con cuenta flor para mujeres para decoración diaria",
precio:2000

 }


]
 
const ProductoOutstanding = () => {
  return (
    <div className='product-container'>
        <h2>Product outstanding</h2>
        <div className='product-outstanding'>
            {producto.map((producto, index) =>(
              <div className='product' key={index}>
                <h3>{producto.nombre}</h3>
                <img src={producto.imagen} alt={producto.nombre}/>
                <p>{producto.descripcion}</p>
                <span className='preco'>${producto.precio.toFixed(2)}</span> 
                </div>
            ))}
        </div>
      
    </div>
  )
}

export default ProductoOutstanding
