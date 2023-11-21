import { createContext, useEffect, useState } from "react";
import { APP_PROFILES } from "../util/dictionary";

// 👇 Creo el contexto del usuario
export const userContext = createContext();

export const UserProvider = ({children})=>{
    const storedUser = JSON.parse(localStorage.getItem("user")) || {
        user_id: null,
        firstName: null,
        lastName: null,
        email: null,
        rol_name: APP_PROFILES.DEFAULT_PROFILE,
        emprendimiento_id: null,
        persona_id: null,
        razon_social: null,
        nombre_rubro : null,
        profileRoute: "/",
        logged: false,
    }

    const [user, setUser] = useState(storedUser)

    const logout = () => {
        // Limpiar el localStorage y establecer el estado del usuario en valores predeterminados
        localStorage.removeItem("user");
        setUser({
            user_id: null,
            firstName: null,
            lastName: null,
            email: null,
            rol_name: APP_PROFILES.DEFAULT_PROFILE,
            emprendimiento_id: null,
            persona_id: null,
            razon_social: null,
            nombre_rubro : null,
            profileRoute: "/",
            logged: false,
        });
    };
    
    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(user));
    },[user])

    return(
        <userContext.Provider value={{
            user,
            setUser,
            logout
        }}>
            {children}
        </userContext.Provider>
    )


}