import React from 'react';
import './menu.css';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import StoreIcon from '@mui/icons-material/Store';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useWindowSize } from '../../hooks/useWindowSize';


export const Menu = ({setOption}) => {
    const {windowSize} = useWindowSize()

    return (
        <div className='w-5 bg-primaryColor shadow pt-1' style={{height: windowSize.height}}>
            <div className='flex justify-center wrap'>
                <IconButton onClick={() => setOption('profile')}>
                    <AccountCircleIcon sx={{color: 'white'}}/>
                </IconButton>
                <p className='font-10 text-white'>Perfil</p>
            </div>
            <div className='flex justify-center wrap'>
                <IconButton onClick={() => setOption('products')}>
                    <InventoryIcon sx={{color: 'white'}}/>
                </IconButton>
                <p className='font-10 text-white'>Productos</p>
            </div>
            <div className='flex justify-center wrap'>
                <IconButton onClick={() => setOption('pedidos')}>
                    <StoreIcon sx={{color: 'white'}}/>
                </IconButton>
                <p className='font-10 text-white'>Pedidos</p>
            </div>
            <div className='flex justify-center wrap'>
                <IconButton onClick={() => setOption('messages')}>
                    <ChatBubbleIcon sx={{color: 'white'}}/>
                </IconButton>
                <p className='font-10 text-white'>Mensajes</p>
            </div>
            <div className='flex justify-center wrap'>
                <IconButton onClick={() => setOption('stadistics')}>
                    <BarChartIcon sx={{color: 'white'}}/>
                </IconButton>
                <p className='font-10 text-white'>Estadisticas</p>
            </div>
        </div>
    )
}