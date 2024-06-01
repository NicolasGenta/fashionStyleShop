import React, { useState, useEffect } from 'react';
import './header.css';
import '../index.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

export const NavBar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 768);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <Navbar data-bs-theme="dark" className="custom-navbar">
        <Container>
          <Link className="l0" to="/">
            <img className='icon' src='./src/assets/images/logo-left.svg' alt="Logo" />
          </Link>
          <Nav className={`ml-auto ${isOpen && "open"}`}>

            <div className="nav-item">
              <Link className="nav-button" to="/store">Tienda</Link>
            </div>

            <div className="nav-item">
              <Link className="nav-button" to="/contacto">Contacto</Link>
            </div>
            <div className="nav-item">
              <Link className="nav-button" to="/events">Próximos eventos</Link>
            </div>
            <div className="nav-item">
              {user?.logged === true ? (
                <div>
                  <span>{"Bienvenid@, " + user?.firstName + "!"}</span>

                  <Link className='nav-button' to={user.profileRoute}>Perfil</Link>
                  <a onClick={onLogout}>Cerrar sesión</a>
                </div>

              ) : (
                <div className="nav-item">
                  <Link className="nav-button" to="/login">Iniciar sesión</Link>
                </div>
              )}
            </div>
          </Nav>
        </Container>
        <div className={`nav_toggle ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>

        </div>
      </Navbar>
      <Outlet />
    </>
  );
}

export default NavBar;
