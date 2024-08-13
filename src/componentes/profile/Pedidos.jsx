import { useEffect, useState } from 'react';
import '../../index.css';
import './pedidos.css';
import { getData, changeDateDB } from '../../util/functions';
import { APP_PROFILES, RESOURCES, STATUS } from '../../util/dictionary';
import { useUser } from '../../hooks/useUser';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Chip from '@mui/material/Chip';
import { useFilters } from '../../hooks/useFilters';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel'
import { useWindowSize } from '../../hooks/useWindowSize';


export const Pedidos = ({ }) => {
    const { user } = useUser();
    const [pedidos, setPedidos] = useState([]);
    const { filters, handlerChangeFilters } = useFilters();
    const {windowSize} = useWindowSize();

    const filterPedidos = (pedidos)=>{
        let pedidosFiltrados;
        pedidosFiltrados = pedidos.filter(pedido =>{
            return (
            (
                filters.nro_pedido === '' ||
                Number(pedido.pedido_nro) === Number(filters.nro_pedido)
            )&& (
                filters.estado_pedido === 'All' ||
                pedido.estado === filters.estado_pedido
            )
            )
        })
        return pedidosFiltrados
    }


    useEffect(() => {
        getData(user.rol_name === APP_PROFILES.CLIENT_PROFILE ? RESOURCES.ENDPOINTS.PEDIDOS_BY_USER + user.user_id
            : RESOURCES.ENDPOINTS.PEDIDOS.PEDIDOS_BY_EMPRENDIMIENTO + user.emprendimiento_id)
            .then(data => {
                console.log(data);
                const pedidosFiltrados = filterPedidos(data);
                setPedidos(pedidosFiltrados)
            })
    }, [filters])


    return (
        <section className='shadow flex wrap' style={{ margin: `${windowSize.width < 768 ? '0.2rem 0.2rem 0.2rem 1rem' : '1rem 1rem 0.5rem 2rem'}`, 
            width: `${windowSize.width < 768 ? '80%' : '90%'}`, 
            height: windowSize.height - 57, 
            flexWrap: `${windowSize.width < 768 && 'wrap'}`,
            overflowX: `${windowSize.width > 768 && 'hidden' }`,
            overflowY: `${windowSize.width < 768 ? 'scroll' : 'hidden'}`, 
            alignContent: 'start', 
            justifyContent: 'space-between'  }}>
            <main className='w-full' style={{ padding: '2em', height: '100%' }}>
                <div className='flex' style={{ justifyContent: 'space-between' }}>
                    <h2>Mis pedidos</h2>
                </div>
                {pedidos.length === 0
                    ? <section className='flex wrap w-full' style={{ maxHeight: '70%', minHeight: '70%', height: '70%', justifyContent: 'center', alignContent: 'center' }}>
                    <img width="100" height="100" src="https://img.icons8.com/ios/100/nothing-found.png" alt="nothing-found" />
                    <p className='w-full' style={{ textAlign: 'center' }}>No se encontraron pedidos</p>
                </section>
                    :
                    <main style={{overflowY: 'scroll', height: '70%'}}>
                        {
                            pedidos.map((elem, index) => (
                                <Accordion key={index}>
                                    <AccordionSummary
                                        expandIcon={<ArrowDropDownIcon />}
                                        aria-controls="panel2-content"
                                        id="panel2-header"
                                    >
                                        <Typography sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                                            <h6># {elem.pedido_nro}</h6>
                                            <Chip label={elem.estado}/>
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <section>
                                            <h6>Detalle del Pedido</h6>
                                            <ul style={{width: '100%', display: 'flex', gap: 10, overflowX: 'scroll'}}>
                                                {elem.detalle_pedido.map(pedido => (
                                                    <li className='shadow' style={{width: '25%', minWidth: '25%', display: 'flex'}}>
                                                        <img style={{width: '40%'}}src={RESOURCES.ENDPOINTS.IMAGE + pedido.img}></img>
                                                        <main style={{padding:'1em' }}>
                                                            <p>{pedido.producto}</p>
                                                            <p>Cantidad: {pedido.cantidad}</p>
                                                            <p>Precio: $ {pedido.precio}</p>
                                                        </main>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    </AccordionDetails>
                                </Accordion>
                            ))
                        }
                    </main>
                }
            </main>
        </section>
    )
}