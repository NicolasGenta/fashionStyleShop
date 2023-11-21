import { Link } from 'react-router-dom';
export const NavForm = ({backgroundColor, color})=>{
    return (
        <div>
            <Link to="/registro" className='button-form'
            >Registrarse</Link>
            <Link to="/login" className='button-form' style={{backgroundColor: backgroundColor, color: color}}
            >Iniciar Sesion</Link>
        </div>
    )
}