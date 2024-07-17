import Carousel from 'react-bootstrap/Carousel';
import './Home.css'
import { useWindowSize } from '../../hooks/useWindowSize';

function Carrusel() {
  const { width, height } = useWindowSize();
  
  return (
    <div className='carruselContenedor' style={{height: `${height}px` }}>
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <div className='custom-image-container'>   
        <img
          className="d-block w-100 custom-image"
          src="https://media.diario7lagos.com.ar/p/f1187511d43b85659138e77a7f014517/adjuntos/321/imagenes/000/090/0000090754/1200x675/smart/feria-emprendedores-sma-1jpg.jpg"
          alt="First slide"
        
          />
          </div>
        <Carousel.Caption>
          <h2 className='tit'>Bienvenido, conoce nuestros productos</h2>
        
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <div className="custom-image-container">
        <img
          className="d-block w-100 custom-image"
          src="https://d1ih8jugeo2m5m.cloudfront.net/2023/11/Ferias_De_Emprendimiento-1200x685.jpg"
          alt="Second slide"
          
        />
        </div>
        <Carousel.Caption>
          <h2 className='tit'>Permititelo, te lo mereces </h2>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <div className="custom-image-container">
        <img
          className="d-block w-100 custom-image"
          src="https://revistatourgourmet.com/wp-content/uploads/2023/03/La_feria-2-scaled-1.jpg"
          alt="Third slide"
          
        />
        </div>
        <Carousel.Caption>
          <h2 className='tit'>Confianza, prestigio, diversidad,  compra en línea.</h2>
        
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default Carrusel;



