import { useNavigate } from 'react-router-dom';
import { useState } from 'react'; // Importa useState
import '../componentes/registro/auth.css';
import { METHODS, RESOURCES } from '../util/dictionary';
import { updateCreate, convertFormToObject, setRoute } from '../util/functions';
import { useUser } from '../hooks/useUser';
import { useForm } from '../hooks/useForm';
import { useWindowSize } from '../hooks/useWindowSize';
import { NavForm } from '../componentes/registro/NavForm';
import { useNotification } from '../hooks/useNotification';


export const LoginPage = ()=>{

    const {windowSize} = useWindowSize();
    const navigate = useNavigate();
    const {email, password, onInputChange, onResetForm} = useForm({
        username: '',
        password: ''
    });

    const {user, setUser} = useUser();
    const { setNotification } = useNotification() || {};
    
    const [errorMessage, setErrorMessage] = useState('');

    const onLogin = (e) =>{
        e.preventDefault();
        const form = document.getElementById('form-login');
        const formData = new FormData(form);
        const data = convertFormToObject(formData);
        updateCreate(RESOURCES.ENDPOINTS.USUARIOS.LOGIN, data, METHODS.POST)
        .then((data)=> {
            setUser((prevUser) =>({
                ... prevUser,
                user_id: data.user.usuario_id,
                firstName: data.user.first_name,
                lastName: data.user.last_name,
                email: data.user.email,
                rol_name: data.user.role_name,
                emprendimiento_id: data.user.emprendimiento_id,
                persona_id: data.user.persona_id,
                razon_social: data.user.razon_social,
                nombre_rubro: data.user.nombre_rubro,
                profileRoute: setRoute(data.user.role_name),
                logged: true,
            }));
            navigate('/',{
                replace: true,
                state: {
                    name:user.user_id,
                    rol: user.rol,
                    logged: user.logged
                }
            })
            onResetForm();
        })
        .catch ((error) => {
            setErrorMessage('usuario o contraseña incorrecto');
            setNotification(true);
        })
    }
    
    const handlePasswordChange = (e) => {
        onInputChange(e);
        setErrorMessage('');
    };

    return (
        <main className='form-container' style={{height: windowSize.height -56}}>
            <section className='register-container'>
                <h2>Iniciar Sesión</h2>
                <form id="form-login" className='form-auth' onSubmit={onLogin}>
                    <main>
                        <label htmlFor="email">Email</label>
                        <input id='email' 
                        name="username" 
                        type="email" 
                        value={email}
                        onChange={onInputChange} required></input>
                    </main>
                    <main>
                        <label htmlFor="password">Contraseña</label>
                        <input id='password' 
                        name='password'
                        type="password" 
                        value={password}
                        onChange={handlePasswordChange}
                        required></input>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </main>
                    <button type="submit">Iniciar Sesión</button>
                </form>
             
            </section>
        </main>
    )
}