import Carousel from 'react-bootstrap/Carousel';
import './Home.css'

function Carrusel() {
  return (
    <div className='carruselContenedor'>
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100 custom-image"
          src="https://images.freeimages.com/images/large-previews/604/loja-de-roupas-arara-1513994.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
  
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 custom-image"
          src="https://ochandianomolina.com/wp-content/uploads/2022/06/Como-patentar-una-marca-de-ropa.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 custom-image"
          src="https://stopcambioclimatico.es/wp-content/uploads/2019/06/scc-2.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
      
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default Carrusel;



