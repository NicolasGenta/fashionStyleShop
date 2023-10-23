import './Header.css';
import { APP_MESSAGES } from '../util/dictionary';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {

  return (
    <>
      <Navbar data-bs-theme="dark" className="custom-navbar">
        <Container>
          <Navbar.Brand className="l0" href="/">
            <img className='icon'
            src='./src/assets/images/logo_left.png'></img>
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link className="nav-button" href="store">Tienda</Nav.Link>
            <Nav.Link className="nav-button" href="contacto">Contacto</Nav.Link>
            <Nav.Link className="nav-button" href="registro">Registro</Nav.Link>
            {/* <Nav.Link href="cart">
              <img src='./src/assets/icons/shopping-bag.svg'/>
            </Nav.Link> */}
            <Nav.Link href="like">
              <img src='./src/assets/icons/heart.svg'/>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className='message-container'>
        <strong className='moving-text'>
          <span>{APP_MESSAGES.FREE_DELIVERY}</span>
          <span>{APP_MESSAGES.FREE_DELIVERY}</span>
          <span>{APP_MESSAGES.FREE_DELIVERY}</span>
          <span>{APP_MESSAGES.FREE_DELIVERY}</span>
          <span>{APP_MESSAGES.FREE_DELIVERY}</span>
          <span>{APP_MESSAGES.FREE_DELIVERY}</span>
          <span>{APP_MESSAGES.FREE_DELIVERY}</span>
        </strong>
      </div>
    </>
  );
}


export default Header;