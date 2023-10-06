import  './Header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
 function Header() {  
return(  
  

      <>
        <Navbar  data-bs-theme="dark" className="custom-navbar">
          <Container>
            <Navbar.Brand className="l0" href="#home">Home</Navbar.Brand>
            <Nav className="ml-auto">
              <Nav.Link className="l1" href="#home">Tienda</Nav.Link>
              <Nav.Link className="l2" href="contacto">Contacto</Nav.Link>
              <Nav.Link className="l3" href="registro">Registro</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        
      
      </>
    );
  }
  

export default Header