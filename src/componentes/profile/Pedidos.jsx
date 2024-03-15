import { useEffect, useState } from 'react';
import '../../index.css';
import './pedidos.css';
import { getData, changeDateDB } from '../../util/functions';
import { APP_PROFILES, RESOURCES, STATUS } from '../../util/dictionary';
import { useUser } from '../../hooks/useUser';

export const Pedidos = ({})=>{
    const {user} = useUser();
    const [pedidos, setPedidos] = useState([]);

    console.log(RESOURCES.ENDPOINTS.PEDIDOS.PEDIDOS_BY_EMPRENDIMIENTO + user.emprendimiento_id);
    useEffect(()=>{
        getData(user.rol_name === APP_PROFILES.CLIENT_PROFILE ? RESOURCES.ENDPOINTS.PEDIDOS.PEDIDOS_BY_CLIENT + user.user_id
            : RESOURCES.ENDPOINTS.PEDIDOS.PEDIDOS_BY_EMPRENDIMIENTO + user.emprendimiento_id)
        .then(data => {
            setPedidos(data)
        })
    },[])
    const excludeKeysClient = ['email', 'nombre', 'apellido', 'codigo_producto', 'cantidad', 'producto', 'img', 'categoria', 'precio'];
    const excludeKeysEmp = ['codigo_producto', 'categoria'];
    return(
        <section className='shadow-lg c-70' style={{width: user.rol_name !== APP_PROFILES.CLIENT_PROFILE 
        ? '90%'
        : null
        }}>
            <h1>Pedidos</h1>
            <table>
                <thead>
                    <tr className="box-shadow">
                    {pedidos.length > 0 &&
                        Object.keys(pedidos[0]).map((key, index) => (
                            (user.rol_name === APP_PROFILES.CLIENT_PROFILE && !excludeKeysClient.includes(key)) ||
                            (user.rol_name !== APP_PROFILES.CLIENT_PROFILE && !excludeKeysEmp.includes(key)) ? (
                                <th key={index}>{key.toUpperCase()}</th>
                            ) : null
                        ))}
                    </tr>
                </thead>
                    <tbody>
                        {pedidos.map((producto, rowIndex) => (
                            <tr key={rowIndex} className="box-shadow">
                                {Object.keys(producto).map((key, colIndex) => (
                                    ((user.rol_name === APP_PROFILES.CLIENT_PROFILE && !excludeKeysClient.includes(key)) ||
                                    (user.rol_name !== APP_PROFILES.CLIENT_PROFILE && !excludeKeysEmp.includes(key))) ? (
                                        <td key={colIndex}>
                                            {colIndex === 0
                                                ? '#' + producto[key]
                                                : user.rol_name ===  APP_PROFILES.CLIENT_PROFILE
                                                    ? colIndex === 3
                                                        ? <span className='chip-container' style={{
                                                            backgroundColor: producto[key] === STATUS.ENTREGADO
                                                                ? '#5a7d5f'
                                                                : producto[key] === STATUS.EN_PROCESO
                                                                    ? '#5a757d'
                                                                    : '#a9b354'
                                                        }}>{producto[key]}</span>
                                                        : colIndex === 1
                                                            ? changeDateDB(producto[key])
                                                            : producto[key]
                                                : colIndex === 2
                                                    ? <span className='chip-container' style={{
                                                        backgroundColor: producto[key] === STATUS.ENTREGADO
                                                            ? '#5a7d5f'
                                                            : producto[key] === STATUS.EN_PROCESO
                                                                ? '#5a757d'
                                                                : '#a9b354'
                                                    }}>{producto[key]}</span>
                                                    : colIndex === 1
                                                    ? changeDateDB(producto[key])
                                                    : colIndex === 9
                                                        ? <img style={{width: '130%'}}src={producto[key]}/>
                                                        : colIndex === 10
                                                            ? '$' + producto[key]
                                                            : producto[key]
                                            }
                                        </td>
                                    ) : null
                                ))}
                            </tr>
                        ))}
                    </tbody>
            </table>
            
        </section>
    )
}