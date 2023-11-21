import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

export const PrivateRoutes = ({children, profile})=>{
    const {user} = useUser();
    console.log(user);
    return user?.logged && user?.rol_name == profile 
    ? children : <Navigate to='/'/>
}