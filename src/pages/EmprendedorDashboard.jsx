import { Pedidos } from "../componentes/profile/Pedidos"
import { ProductosPanel } from "../componentes/profile/ProductosPanel"
import { ProfileInfo } from "../componentes/profile/ProfileInfo"

export const EmprendedorDashboard = ()=>{
    return (
        <section style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
            <ProfileInfo/>
            <ProductosPanel/>
            <Pedidos/>
        </section>
    )
}