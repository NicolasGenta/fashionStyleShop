import { Pedidos } from "../componentes/profile/Pedidos"
import { ProductosPanel } from "../componentes/profile/ProductosPanel"
import { ProfileInfo } from "../componentes/profile/ProfileInfo"
import { useUser } from "../hooks/useUser";

export const EmprendedorDashboard = ()=>{
    const{user} = useUser();
    return (
        <section style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
            <ProfileInfo/> 
            {user.emprendimiento_id!= null
            ? <h1>hola</h1>
            
            :(<><ProductosPanel /><Pedidos /></>)
            }
        </section>
    )
}