import { createContext, useState } from "react";
import { APP_PROFILES } from "../util/dictionary";

export const AppProfileContext = createContext();

export function AppProfileProvider({children}){
    const [profile, setProfile] = useState(APP_PROFILES.DEFAULT_PROFILE);

    const login = (userProfile) =>{
        setProfile(userProfile);
    }

    const logout = () =>{
        setProfile(APP_PROFILES.DEFAULT_PROFILE)
    }

    return(
        <AppProfileContext.Provider value={{
                profile,
                login,
                logout
        }}>
            {children}
        </AppProfileContext.Provider>
    )
}