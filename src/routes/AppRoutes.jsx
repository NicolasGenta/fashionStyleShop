import { NavBar } from '../componentes/NavBar.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, LoginPage, Contacto, Store, AdminDashboard, ClienteDashboard, EmprendedorDashboard } from "../pages/index.js";
import { PrivateRoutes } from './PrivateRoutes.jsx';
import { APP_PROFILES } from '../util/dictionary.js';
import Registro from '../componentes/registro/Registro.jsx';
import { ProfilePage } from '../pages/ProfilePage.jsx';
import { ProductPanel } from '../pages/ProductPanel.jsx';

export const AppRoutes = ()=> {
    return(
        <Routes>
            <Route path="/" element={<NavBar/>}>
                //👇 Rutas públicas
                <Route index element={<Home/>}/>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/store" element={<Store/>} />
                <Route path="/registro" element={<Registro/>} />

                //👇 Rutas privadas
                <Route path='/admin' element={
                    <PrivateRoutes profile={APP_PROFILES.ADMIN_PROFILE}>
                        <AdminDashboard/>
                    </PrivateRoutes>
                }/>
                <Route path="/client" element={
                    <PrivateRoutes profile={APP_PROFILES.CLIENT_PROFILE}>
                        <ClienteDashboard/>
                    </PrivateRoutes>
                } />
                <Route path="/emprendedor" element={
                    <PrivateRoutes profile={APP_PROFILES.EMPRENDEDOR_PROFILE}>
                        <EmprendedorDashboard/>
                    </PrivateRoutes>
                } />
                <Route path="/profile" element={
                    <PrivateRoutes profile={APP_PROFILES.ADMIN_PROFILE}>
                        <ProfilePage/>
                    </PrivateRoutes>
                }/>
            </Route>
        </Routes>
    )
}