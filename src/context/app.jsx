import { createContext, useState } from "react";


export const AppContext = createContext();

export function AppProvider({children}) {
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(false);
    const [viewPassword, setViewPassword] = useState(false);

    const handlerError = (state) => {
        setError(state)
    }

    const openLoader = () => {
        setLoader(true)
    }

    const closeLoader = () => {
        setLoader(false)
    }

    const handleViewPassword = () => {
        if (viewPassword) {
            setViewPassword(false)
        } else {
            setViewPassword(true)
        }
    }

    return (
        <AppContext.Provider value={{
            error,
            handlerError,
            loader,
            openLoader,
            closeLoader,
            viewPassword,
            handleViewPassword
        }}>
            {children}
        </AppContext.Provider>
    )

}