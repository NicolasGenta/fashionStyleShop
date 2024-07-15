import { useNavigate } from 'react-router-dom';
import { useState } from 'react'; // Importa useState
import '../componentes/registro/auth.css';
import { API_URL, METHODS, RESOURCES } from '../util/dictionary';
import { updateCreate, convertFormToObject, setRoute } from '../util/functions';
import { useUser } from '../hooks/useUser';
import { useForm } from '../hooks/useForm';
import { useWindowSize } from '../hooks/useWindowSize';
import { useNotification } from '../hooks/useNotification';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button'


export const LoginPage = () => {

    const { windowSize } = useWindowSize();
    const navigate = useNavigate();
    const { email, password, onInputChange, onResetForm } = useForm({
        username: '',
        password: ''
    });

    const { user, setUser } = useUser();
    const { setNotification } = useNotification() || {};

    const [errorMessage, setErrorMessage] = useState('');
    const [viewPassword, setViewPassword] = useState(false);

    const onLogin = async (e) => {
        e.preventDefault();
        const form = document.getElementById('form-login');
        const formData = new FormData(form);
        const data = convertFormToObject(formData);
    
        try {
            const response = await fetch(RESOURCES.ENDPOINTS.LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const result = await response.json();
    
            sessionStorage.setItem('jwt', result.token);
            setUser((prevUser) => ({
                ...prevUser,
                user_id: result.userData.usuario_id,
                firstName: result.userData.first_name,
                lastName: result.userData.last_name,
                email: result.userData.email,
                documento: result.userData.documento,
                telefono: result.userData.telefono,
                calle: result.userData.calle,
                nro: result.userData.nro,
                calle_1: result.userData.calle_1,
                calle_2: result.userData.calle_2,
                rol_name: result.userData.role_name,
                persona_id: result.userData.persona_id,
                profileRoute: setRoute(result.userData.role_name),
                token: result.token,
                logged: true,
            }));
    
            navigate('/', {
                replace: true,
                state: {
                    name: result.userData.first_name,
                    rol: result.userData.role_name,
                    logged: true
                }
            });
    
            onResetForm();
        } catch (error) {
            setErrorMessage('usuario o contraseña incorrecto');
            setNotification(true);
        }
    };

    const handlePasswordChange = (e) => {
        onInputChange(e);
        setErrorMessage('');
    };

    const handleViewPassword = () => {
        if (viewPassword) {
            setViewPassword(false)
        } else {
            setViewPassword(true)
        }
    }

    return (
        <main className='form-container' style={{ height: windowSize.height - 56 }}>
            <section className='register-container'>
                <h2>Iniciar Sesión</h2>
                <form id="form-login" className='form-auth' onSubmit={onLogin}>
                    <FormControl>
                        <TextField id="email" name='username' type='email' value={email} onChange={onInputChange} label="Email" variant="standard" />
                    </FormControl>
                    <FormControl sx={{ width: '100%' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="password"
                            name='password'
                            value={password}
                            onChange={handlePasswordChange}
                            type={viewPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Tooltip title={viewPassword ? 'Ocultar' : 'Ver'}>
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleViewPassword}
                                        >
                                            {viewPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Button type="submit"> Iniciar Sesión </Button>
                </form>
                <p>¿No estás registrado?</p>
                <Button onClick={()=> {navigate('/registro')}}>Registrarse</Button>
            </section>
        </main>
    )
}