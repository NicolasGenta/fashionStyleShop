import { useContext } from "react";
import { AppContext } from "../context/app";


export function useApp() {
    const { error,
        handlerError,
        loader,
        openLoader,
        closeLoader,
        viewPassword,
        handleViewPassword } = useContext(AppContext);

    return {
        error,
            handlerError,
            loader,
            openLoader,
            closeLoader,
            viewPassword,
            handleViewPassword
    }
}