import { EmprendedoresManager } from "../componentes/profile/EmprededoresManager"
import { ProfileInfo } from "../componentes/profile/ProfileInfo"
import { Menu } from "../componentes/emprendedorDashboard/menu"
import { useUser } from "../hooks/useUser";
import { useState } from "react";
import { useWindowSize } from "../hooks/useWindowSize";

export const AdminDashboard = ()=>{
    const { user } = useUser();
    const [ menuOption, setMenuOption ] = useState('profile');
    const {windowSize} = useWindowSize();

    const handlerMenu = (option) => {
        setMenuOption(option)
    }
    return (
        <section style={{display: 'flex', flexWrap: 'wrap', height: windowSize.height - 52.5, overflow: 'hidden'}}>
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