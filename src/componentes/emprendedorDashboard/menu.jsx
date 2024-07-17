import React from 'react';
import './menu.css';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import StoreIcon from '@mui/icons-material/Store';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useWindowSize } from '../../hooks/useWindowSize';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useData } from '../../hooks/useData';
import { useUser } from '../../hooks/useUser';


export const Menu = ({ setOption }) => {
    const { windowSize } = useWindowSize();
    const { emprendimiento } = useData();
    const { user } = useUser()

    return (
        <div className='w-5 bg-primaryColor shadow pt-1' style={{ height: windowSize.height }}>
            <div className='flex justify-center wrap'>
                <IconButton onClick={() => setOption('profile')}>
                    <AccountCircleIcon sx={{ color: 'white' }} />
                </IconButton>
                <p className='font-10 text-white'>Perfil</p>
            </div>
            {
                user.rol_name === 'Emprendedor' || user.rol_name === 'Cliente'
                    ? 
                    <>
                        <div className='flex justify-center wrap'>
                            <IconButton onClick={() => setOption('pedidos')} disabled={ user.rol_name === 'Cliente' ? false : emprendimiento ? false : true}>
                                <StoreIcon sx={ user.role_name === 'Cliente' ? { color: 'white' } : emprendimiento ? { color: 'white' } : { color: '#8c8c8c' }} />
                            </IconButton>
                            <p className='font-10 text-white'>Pedidos</p>
                        </div>
                        < div className='flex justify-center wrap'>
                            <IconButton onClick={() => setOption('products')} disabled={emprendimiento ? false : true}>
                                <InventoryIcon sx={emprendimiento ? { color: 'white' } : { color: '#8c8c8c' }} />
                            </IconButton>
                            <p className='font-10 text-white'>Productos</p>
                        </div>
                    </>
                    :  user.rol_name === 'Administrador'
                            ? <>
                                <div className='flex justify-center wrap'>
                                    <IconButton onClick={() => setOption('admin')}>
                                        <AdminPanelSettingsIcon sx={{ color: 'white' }} />
                                    </IconButton>
                                    <p className='font-10 text-white'>Administrar</p>
                                </div>
                            </>
                            : null

            }
        </div >
    )
}