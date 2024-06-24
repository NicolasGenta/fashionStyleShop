import { EmprendedoresManager } from "../componentes/profile/EmprededoresManager"
import { ProfileInfo } from "../componentes/profile/ProfileInfo"
import { Menu } from "../componentes/emprendedorDashboard/menu"

export const AdminDashboard = ()=>{
    return (
        <section style={{display: 'flex'}}>
            <Menu ></Menu>
            <ProfileInfo/>
            <EmprendedoresManager/>
        </section>
    )
}