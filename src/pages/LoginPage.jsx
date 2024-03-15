import { useNavigate, METHODS, RESOURCES, updateCreate, convertFormToObject, setRoute, useUser, useForm, useWindowSize, NavForm } from "../imports";

export const LoginPage = () => {

    const { windowSize } = useWindowSize();
    const navigate = useNavigate();
    const { email, password, onInputChange, onResetForm } = useForm({
        email: '',
        password: ''
    });

    const { user, setUser } = useUser();


    const onLogin = (e) => {
        e.preventDefault();
        const form = document.getElementById('form-login');
        const formData = new FormData(form);
        const data = convertFormToObject(formData);
        updateCreate(RESOURCES.ENDPOINTS.USUARIOS.LOGIN, data, METHODS.POST)
            .then((data) => {
                setUser((prevUser) => ({
                    ...prevUser,
                    user_id: data.usuario_id,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    email: data.email,
                    rol_name: data.role_name,
                    emprendimiento_id: data.emprendimiento_id,
                    persona_id: data.persona_id,
                    razon_social: data.razon_social,
                    nombre_rubro: data.nombre_rubro,
                    profileRoute: setRoute(data.role_name),
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
            .catch(
                console.log("error")
            )
    }

    return (
        <main className='form-container' style={{ height: windowSize.height - 56 }}>
            <section className='register-container'>
                <h2>Iniciar Sesión</h2>
                <form id="form-login" className='form-auth' onSubmit={onLogin}>
                    <main>
                        <label htmlFor="email">Email</label>
                        <input id='email'
                            name="email"
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
                            onChange={onInputChange}
                            required></input>
                    </main>
                    <button type="submit">Iniciar Sesión</button>
                </form>
                <NavForm backgroundColor="#445957" color="white" />
            </section>
        </main>
    )
}