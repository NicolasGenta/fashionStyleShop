import { useContext } from "react";
import { userContext } from "../context/userContex";

export function useUser(){
    const {user, setUser, logout} = useContext(userContext);

    return {user, setUser, logout}
}