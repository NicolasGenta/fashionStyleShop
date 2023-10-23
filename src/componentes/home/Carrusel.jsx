import Carousel from 'react-bootstrap/Carousel';
import './Home.css'
import { useWindowSize } from '../../hooks/useWindowSize';

function Carrusel() {
  const { windowSize } = useWindowSize();
  
  return (
    <div className='carruselContenedor' style={{height: windowSize.height}}>
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100 custom-image"
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1374&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="First slide"
          style={{height: windowSize.height}}
          />
        <Carousel.Caption>
          <h2>Tu estilo, a solo un clic de distancia</h2>
          <button>COMPRA AHORA</button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 custom-image"
          src="https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Second slide"
          style={{height: windowSize.height}}
        />
        <Carousel.Caption>
          <h2>La moda llegó a tu puerta, ¿estás listo para recibirla?</h2>
          <button>COMPRA AHORA</button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 custom-image"
          src="https://images.unsplash.com/photo-1572705824045-3dd0c9a47945?auto=format&fit=crop&q=80&w=1468&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Third slide"
          style={{height: windowSize.height}}
        />
        <Carousel.Caption>
          <h2>Viste bien, siéntete bien, compra en línea con nosotros.</h2>
          <button>COMPRA AHORA</button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default Carrusel;



