import { ProductosPanel } from "../componentes/profile/ProductosPanel"
import { ProfileInfo } from "../componentes/profile/ProfileInfo"

export const EmprendedorDashboard = ()=>{
    return (
        <section style={{display: 'flex'}}>
            <ProfileInfo/>
            <ProductosPanel/>
        </section>
    )
}