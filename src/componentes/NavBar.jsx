import './header.css';
import '../index.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

export const NavBar= ()=> {

  const {user, logout} = useUser();

  const navigate = useNavigate()
  console.log(user);

  const onLogout = ()=>{
    logout()
    navigate("/login", {
      replace: true,
    })
  }

  const openCloseMenu = ()=>{
    const menuContainer = document.getElementById('menu-toggle');
    if(menuContainer.classList.contains("hidden")) menuContainer.classList.remove('hidden')
    else menuContainer.classList.add('hidden')
  }
  
  return (
    <>
      <Navbar data-bs-theme="dark" className="custom-navbar">
        <Container>
          <Link className="l0" to="/">
            <img className='icon'
            src='./src/assets/images/logo-left.svg'></img>
          </Link>
          <Nav className="ml-auto">
            <Link className="nav-button" to="/store">Tienda</Link>
            <Link className="nav-button" to="/contacto">Contacto</Link>
            {user?.logged == true
            ? <div>
                <span>{"Bienvenid@, "+ user?.firstName + "!"}</span>
                <img onClick={openCloseMenu} src='./src/assets/icons/menu-toggle.png' style={{width: '1.5rem'}}/>
                <div id="menu-toggle" className='menu-toggle hidden'>
                  <Link className='nav-button' to={user.profileRoute}>Perfil</Link>
                  <a onClick={onLogout}>Cerrar sesión</a>
                </div>
              </div>
              : <Link className="nav-button" to="/login">Iniciar sesión</Link>
            }
          </Nav>
        </Container>
      </Navbar>
      <Outlet/>
    </>
  );
}


export default NavBar;