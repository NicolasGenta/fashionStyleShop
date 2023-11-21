import { EmprendedoresManager } from "../componentes/profile/EmprededoresManager"
import { ProfileInfo } from "../componentes/profile/ProfileInfo"

export const AdminDashboard = ()=>{
    return (
        <section style={{display: 'flex'}}>
            <ProfileInfo/>
            <EmprendedoresManager/>
        </section>
    )
}