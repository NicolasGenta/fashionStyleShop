import { useContext } from "react";
import { AppProfileContext } from "../context/appProfile";

export function useAppProfile(){
    const {profile, setProfile} = useContext(AppProfileContext);

    return {profile, setProfile}
}