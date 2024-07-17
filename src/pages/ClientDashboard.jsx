import { ProfileInfo } from "../componentes/profile/ProfileInfo"
import { Menu } from "../componentes/emprendedorDashboard/menu"
import { useUser } from "../hooks/useUser";
import { useState } from "react";
import { Pedidos } from "../componentes/profile/Pedidos";

export const ClienteDashboard= ()=>{

    const { user } = useUser();
    const [ menuOption, setMenuOption ] = useState('profile');

    const handlerMenu = (option) => {
        setMenuOption(option)
    }

    return(
        <section style={{display: 'flex', flexWrap: 'wrap', height: '546px', overflow: 'hidden'}}>
            <Menu setOption={handlerMenu}></Menu>
            {menuOption === 'profile'
                ? <ProfileInfo/>
                : menuOption === 'pedidos' && <Pedidos/>
                // : menuOption === 'stadistics' && <Stadistics/>
            }
            {/* <EmprendedoresManager/> */}
        </section>
    )
}