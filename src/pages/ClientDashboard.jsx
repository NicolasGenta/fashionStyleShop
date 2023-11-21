import { Cart } from "../componentes/Store/Cart"
import { Pedidos } from "../componentes/profile/Pedidos"
import { ProfileInfo } from "../componentes/profile/ProfileInfo"

export const ClienteDashboard= ()=>{
    return(
        <section style={{display: 'flex'}}>
            <ProfileInfo></ProfileInfo>
            <Pedidos/>
        </section>
    )
}