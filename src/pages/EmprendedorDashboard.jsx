import React from "react"
import { Pedidos } from "../componentes/profile/Pedidos"
import { ProductosPanel } from "../componentes/profile/ProductosPanel"
import { ProfileInfo } from "../componentes/profile/ProfileInfo"
import { Menu } from "../componentes/emprendedorDashboard/menu"

export const EmprendedorDashboard = ()=>{

    const [ menuOption, setMenuOption ] = React.useState('profile');

    const handlerMenu = (option) => {
        setMenuOption(option)
    }

    return (
        <section style={{display: 'flex', flexWrap: 'wrap'}}>
            <Menu setOption={handlerMenu}></Menu>
            {menuOption === 'profile'
                ? <ProfileInfo/>
                : menuOption === 'products'
                    ? <ProductosPanel/>
                    : <Pedidos/>
            }

        </section>
    )
}