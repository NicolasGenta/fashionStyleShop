import React from "react"
import { Pedidos } from "../componentes/profile/Pedidos"
import { ProductosPanel } from "../componentes/profile/ProductosPanel"
import { ProfileInfo } from "../componentes/profile/ProfileInfo"
import { Menu } from "../componentes/emprendedorDashboard/menu"
import { useWindowSize } from "../hooks/useWindowSize";


export const EmprendedorDashboard = ()=>{
    const [ menuOption, setMenuOption ] = React.useState('profile');
    const {windowSize} = useWindowSize();

    const handlerMenu = (option) => {
        setMenuOption(option)
    }


    return (
        <section style={{display: 'flex', flexWrap: 'wrap',  height: windowSize.height - 52.5, overflow: 'hidden'}}>
            <Menu setOption={handlerMenu}></Menu>
            {menuOption === 'profile'
                ? <ProfileInfo/>
                : menuOption === 'products'
                    ? <ProductosPanel />
                    : <Pedidos/>
            }
        </section>
    )
}