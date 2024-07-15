import { EmprendedoresManager } from "../componentes/profile/EmprededoresManager"
import { ProfileInfo } from "../componentes/profile/ProfileInfo"
import { Menu } from "../componentes/emprendedorDashboard/menu"
import { useUser } from "../hooks/useUser";
import { useState } from "react";

export const AdminDashboard = ()=>{
    const { user } = useUser();
    const [ menuOption, setMenuOption ] = useState('profile');

    const handlerMenu = (option) => {
        setMenuOption(option)
    }
    return (
        <section style={{display: 'flex', flexWrap: 'wrap', height: '546px', overflow: 'hidden'}}>
            <Menu setOption={handlerMenu}></Menu>
            {menuOption === 'profile'
                ? <ProfileInfo/>
                : menuOption === 'admin' && <EmprendedoresManager/>
                // : menuOption === 'stadistics' && <Stadistics/>
            }
            {/* <EmprendedoresManager/> */}
        </section>
    )
}