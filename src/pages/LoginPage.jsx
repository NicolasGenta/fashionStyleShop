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
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Tooltip from '@mui/material/Tooltip';


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

    const onLogin = (e) => {
        e.preventDefault();
        const form = document.getElementById('form-login');
        const formData = new FormData(form);
        const data = convertFormToObject(formData);
        updateCreate(RESOURCES.ENDPOINTS.USUARIOS.LOGIN, data, METHODS.POST)
            .then((data) => {
                sessionStorage.setItem('jwt', data.token)
                setUser((prevUser) => ({
                    ...prevUser,
                    user_id: data.userData.usuario_id,
                    firstName: data.userData.first_name,
                    lastName: data.userData.last_name,
                    email: data.userData.email,
                    rol_name: data.userData.role_name,
                    emprendimiento_id: data.userData.emprendimiento_id,
                    persona_id: data.userData.persona_id,
                    razon_social: data.userData.razon_social,
                    nombre_rubro: data.userData.nombre_rubro,
                    profileRoute: setRoute(data.userData.role_name),
                    logged: true,
                }));
                navigate('/', {
                    replace: true,
                    state: {
                        name: user.user_id,
                        rol: user.rol,
                        logged: user.logged
                    }
                })
                onResetForm();
            })
            .catch((error) => {
                setErrorMessage('usuario o contraseña incorrecto');
                setNotification(true);
            })
    }

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
                    <button type="submit">Iniciar Sesión</button>
                </form>

            </section>
        </main>
    )
}