import React, { useState, useEffect } from 'react';
import './header.css';
import '../index.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box'
import { useCart } from '../hooks/useCart';
import logo from '../../assets/images/logo-left.svg'
import { useWindowSize } from '../hooks/useWindowSize';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export const NavBar = () => {
  const { user, logout } = useUser();
  const { handleOpen, cartCount } = useCart()
  const navigate = useNavigate();
  const { windowSize } = useWindowSize();
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
      <Navbar data-bs-theme="dark" className="custom-navbar shadow" style={{ padding: `${windowSize.width < 768 && '0em'}` }}>
        <Container>
          <Link className="l0" to="/">
            <img className='icon' src={logo} alt="Logo" />
          </Link>
          <Nav className={`ml-auto ${isOpen && "open"}`} style={{ alignItems: `${windowSize.width > 768 && 'center'}`, width: `${windowSize.width < 768 && '60%'}`, top: `${windowSize.width < 768 && '3.5em'}`, paddingTop: `${windowSize.width < 768 && '3em'}` }}>
            <Link className="nav-button" to="/store" style={{ height: 'min-content', flex: `${windowSize.width < 768 && 'none'}`, marginBottom: `${windowSize.width < 768 && '2em'}` }}>Tienda</Link>
            <Link className="nav-button" to="/contacto" style={{ height: 'min-content', flex: `${windowSize.width < 768 && 'none'}`, marginBottom: `${windowSize.width < 768 && '2em'}` }}>Contacto</Link>
            {windowSize.width > 768
              ?
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Mi carrito" style={{ width: 'min-content', alignContent: 'center' }}>
                  <StyledBadge badgeContent={cartCount} color="secondary" onClick={handleOpen}>
                    <IconButton>
                      <ShoppingCartIcon sx={{ color: 'white' }} />
                    </IconButton>
                  </StyledBadge>
                </Tooltip>
                {user?.logged === true ? (
                  <div>
                    <Link className='nav-button' to={user.profileRoute}>
                      <Tooltip title="Mi cuenta">
                        <IconButton style={{ width: 'max-content' }}>
                          <AccountCircleIcon sx={{ color: 'white' }} />
                        </IconButton>
                      </Tooltip>
                    </Link>
                    <Tooltip title="Cerrar sesión">
                      <IconButton style={{ width: 'max-content' }} onClick={onLogout}>
                        <LogoutIcon sx={{ color: 'white' }} />
                      </IconButton>
                    </Tooltip>
                  </div>

                ) : (
                  <Link className="nav-button" to="/login">Iniciar sesión</Link>
                )}
              </div>
              : <>
                <Link className="nav-button" onClick={handleOpen} style={{ height: 'min-content', flex: `${windowSize.width < 768 && 'none'}`, marginBottom: `${windowSize.width < 768 && '2em'}` }}>Mi Carrito</Link>
                {user?.logged === true
                  ?
                  <>
                    <Link className='nav-button' to={user.profileRoute} style={{ height: 'min-content', flex: `${windowSize.width < 768 && 'none'}`, marginBottom: `${windowSize.width < 768 && '2em'}` }}>
                    Mi cuenta
                    </Link>
                    <Link className='nav-button' onClick={onLogout} style={{ height: 'min-content', flex: `${windowSize.width < 768 && 'none'}`, marginBottom: `${windowSize.width < 768 && '2em'}` }}>
                    Cerrar Sesion
                    </Link>
                  </>
                  : <Link className="nav-button" to="/login">Iniciar sesión</Link>
                }
              </>

            }

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
