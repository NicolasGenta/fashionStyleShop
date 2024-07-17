import { useNavigate } from 'react-router-dom';
import { useState } from 'react'; // Importa useState
import '../componentes/registro/auth.css';
import { API_URL, METHODS, RESOURCES } from '../util/dictionary';
import { updateCreate, convertFormToObject, setRoute } from '../util/functions';
import { useUser } from '../hooks/useUser';
import { useForm } from '../hooks/useForm';
import { useWindowSize } from '../hooks/useWindowSize';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useApp } from '../hooks/useApp';
import CircularProgress from '@mui/material/CircularProgress';


export const LoginPage = () => {

    const { windowSize } = useWindowSize();
    const {error, handlerError, loader, openLoader, closeLoader, viewPassword, handleViewPassword} = useApp();
    const navigate = useNavigate();
    const { email, password, onInputChange, onResetForm } = useForm({
        username: '',
        password: ''
    });

    const { user, setUser} = useUser();

    const onLogin = async (e) => {
        if(error) {
            handlerError(false)
        }
        openLoader()
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
            closeLoader()
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
            handlerError(true)
        }
    };

    const handlePasswordChange = (e) => {
        onInputChange(e);
        if(error) {
            handlerError(false)
        }
    };


    return (
        <main className='w-full flex' style={{ height: windowSize.height - 56, alignItems: 'center', justifyContent: 'space between', overflowY: 'hidden' }}>
            <section className=' flex wrap shadow' style={{width: '40%', height:'80%', minHeight: '90%', margin: '1.5em', padding: '2em', justifyContent: 'center', alignContent: 'center', gap: 20}}>
                <h2 className="principal-color " style={{fontWeight: 'bolder', fontSize: '2em'}}>Iniciar Sesión</h2>
                <main style={{width: '90%'}}>
                    <p style={{fontSize: '0.8em', textAlign: 'center'}}>Inicia sesión para acceder a tu cuenta y descubrir productos únicos de nuestros emprendedores locales.</p>
                </main>
                {loader &&  <CircularProgress/>}
                {error && <Alert severity='error' sx={{width: '100%'}}>Usuario y/o contraseña incorrecta</Alert>}
                <section className='w-full flex wrap' style={{justifyContent: 'center', height: '60%', alignContent: 'space-between'}}>
                    <form id="form-login" className='flex wrap' onSubmit={onLogin} style={{gap: 20, width: '90%', justifyContent: 'center'}}>
                        <FormControl sx={{ width: '100%' }} variant="standard">
                            <TextField id="email" name='username' type='email' value={email} onChange={onInputChange} label="Email" variant="standard"
                            sx={{
                                '&:active': {
                                  backgroundColor: '#467d6a', // Cambia a tu color deseado
                                },
                            }}
                            required
                            />
                        </FormControl>
                        <FormControl sx={{ width: '100%' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="password"
                                name='password'
                                value={password}
                                onChange={handlePasswordChange}
                                required
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
                        <Button type="submit" variant='contained' sx={{height: 'max-content'}}> Iniciar Sesión </Button>
                    </form>
                    <div className='flex w-full' style={{gap: 10, alignContent: 'center', padding: '0.5em', justifyContent: 'center'}}>
                        <p style={{height: '100%', alignContent: 'center', fontSize: '0.9em'}}>¿Aún no tienes una cuenta?</p>
                        <Button onClick={()=> {navigate('/registro')}}>Registrarse</Button>
                    </div>
                </section>
            </section>
            <section className="flex" style={{width: '50%', height: '80%', alignContent: 'center', justifyContent: 'center'}}>
                <img src='./src/assets/images/buy_illustration.jpg' style={{width: '80%', scale: '1:1'}}/>
            </section>
        </main>
    )
}