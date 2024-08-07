import { useCart } from '../../hooks/useCart';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useWindowSize } from '../../hooks/useWindowSize';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog'
import './cart.css'
import '../../index.css'
import React, { useEffect, useState } from 'react';
import Slide from '@mui/material/Slide';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip'
import { useNavigate } from 'react-router-dom';
import {  APP_TEXTS, RESOURCES } from '../../util/dictionary';
import cartImage from '../../../assets/images/empty_cart.svg'
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

function CartItem({ img, precio, nombre_producto, emprendimiento, descripcion, quantity, addToCart, removeFromCart, sx }) {
    const precioNumber = parseFloat(precio);
    const quantityNumber = parseInt(quantity, 10);
    const totalPrecio = precioNumber * quantityNumber;
    const {windowSize} = useWindowSize();

    return (
        <li style={sx ? { width: '100%', height: '100%', display: sx.display } : null}>
            <img
                src={RESOURCES.ENDPOINTS.IMAGE + img}
                alt={nombre_producto}
                style={{width: `${windowSize.width < 768 ? "30%" : "20%"}`, objectFit: 'cover'}}
            />
            <main className={sx ? "w-full flex justify-between" : null} style={{ padding: '1em' }}>
                <section className={sx ? "w-50 " : null} style={{width: `${windowSize.width < 768 && "60%"}`}}>
                    <article className='flex wrap' style={{ gap: `${windowSize.width < 768 ? "1" : "15"}` }}>
                        <p>{nombre_producto}</p>
                        <span style={{ marginLeft: `${windowSize.width < 768 ? "0.4em" : "1em"}`,  width: 'min-content' }}>
                            <Chip label={emprendimiento.razon_social} size='small'
                                style={{ fontSize: '10px', textAlign: 'center' }}
                                color='primary'
                                sx={{ color: 'white' }}
                            />
                        </span>
                    </article>
                    {sx && <p style={{ fontSize: '12px' }}>{descripcion}</p>}
                    <p>$ {precio}</p>
                </section>
                <section  className="flex wrap" style={{ width: '40%', justifyContent: 'end' }}>
                    <article className='w-full'>
                        <p style={{ textAlign: 'end', fontWeight: 'lighter', fontSize: '0.9em', marginBottom: '0' }}>Precio Total</p>
                        <p style={{ textAlign: 'end', fontWeight: 'bold' }}>$ {totalPrecio}</p>
                    </article>
                    <div className='flex' style={{ width: `${windowSize.width < 768 ? "100%" : "50%"}`, height: '2.5em' }}>
                        <IconButton onClick={addToCart}> + </IconButton>
                        <TextField value={quantity} disabled label="Cantidad" size='small' />
                        <IconButton onClick={removeFromCart}> - </IconButton>
                    </div>
                </section>
            </main>
        </li>
    )
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function Cart() {

    const { cart, removeFromCart, addToCart, clearCart, cartCount, totalPriceCart, openCart, handleOpen } = useCart();
    const { windowSize } = useWindowSize();
    const [open, setOpen] = React.useState(false);
    const [buyPage, setBuyPage] = React.useState(false);

    const navigate = useNavigate();

    const openDialog = () => {
        setOpen(true)
    }

    const closeDialog = () => {
        handleOpen(false)
    }

    const openBuyPage = () => {
        setBuyPage(true)
    }


    return (
        <section>
            <aside className="cart" style={{ display: !openCart && 'none', height: windowSize.height }}>
                <Dialog
                    fullScreen
                    open={openCart}
                    onClose={closeDialog}
                    TransitionComponent={Transition}
                >
                    <header className='flex justify-between' style={{ padding: '1em', boxShadow: '8px 7px 32px -18px rgba(0,0,0,0.75) !important;' }}>
                        <Tooltip title="Cerrar" style={{ width: 'max-content' }}>
                            <IconButton onClick={closeDialog}>
                                <CloseIcon></CloseIcon>
                            </IconButton>
                        </Tooltip>
                        <h2>{buyPage ? APP_TEXTS.BUY_DATA : APP_TEXTS.CART}</h2>
                        <div>
                            {buyPage
                                ? <Button onClick={() => { setBuyPage(false) }}>{APP_TEXTS.CART}</Button>
                                : <Button>{APP_TEXTS.BUTTON_BUY}</Button>
                            }
                        </div>
                    </header>
                    <Divider />
                    {
                        cartCount === 0
                            ?
                            <section style={{display: 'flex', height: '100%', flexWrap:'wrap', justifyContent: 'center', alignContent: 'center'}}>
                                <div style={{width: `${windowSize.width < 768 ? "100%" : "50%"}`, height: 'max-content', padding: '2em', 
                                display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20}}>
                                    <img src={cartImage} style={{width: '50%'}} />
                                    <p>{APP_TEXTS.WITHOUT_PRODUCTS}</p>
                                    <Button onClick={()=> {closeDialog(); navigate('/store') }} variant='contained'>{APP_TEXTS.BUTTON_DISCOVER_PRODUCTS}</Button>
                                </div>
                            </section>
                            :
                            buyPage ? <FormPay closeCart={closeDialog} buyClose={setBuyPage}/>
                                :
                                <body className={`flex justify-between content-center overflow-y-hidden cart-body `} style={{ height: '100%', flexWrap: `${windowSize.width < 768 && "wrap-reverse"}`, alignContent : `${windowSize.width < 768 && "flex-end"}` }}>
                                    <main  style={{ width: `${windowSize.width < 768 ? "100%" : "80%"}`, height: `${windowSize.width < 768 && "65%"}`, padding: '1em', overflowY: 'scroll' }} className={`${windowSize.width <768 && 'w-full'}`}>
                                        {
                                            cart.map(product => (
                                                <div className="shadow overflow-y-hidden" style={{ width: '95%', height: '10em', margin: '0.5em' }}>
                                                    <CartItem
                                                        key={product.codigo_producto}
                                                        addToCart={() => addToCart(product)}
                                                        removeFromCart={() => removeFromCart(product)}
                                                        {...product}
                                                        sx={{ height: '15em', display: 'flex' }}
                                                    />
                                                </div>
                                            ))}
                                    </main>
                                    <section className="shadow" style={{ width: `${windowSize.width < 768 ? "100%" : "50%"}`, padding: '1em', alignSelf: 'start', margin: '2em' }}>
                                        <h4 className='mb-2 mt-1'> Resumen de compra</h4>
                                        <Divider />
                                        <article className='flex justify-between w-full mb-2 mt-1' >
                                            <p>Productos ({cartCount})</p>
                                            <p>${totalPriceCart}</p>
                                        </article>
                                        <Divider />
                                        <article className='flex justify-between w-full font-bold mb-2 mt-1'>
                                            <p>Total</p>
                                            <p>$ {totalPriceCart}</p>
                                        </article>
                                        <footer className='w-full flex wrap' style={{justifyContent: 'center'}}>
                                            <Button variant='contained' onClick={openBuyPage}>Continuar Compra</Button>
                                        </footer>
                                    </section>
                                </body>}
                </Dialog>
            </aside>
        </section>
    )
}

export function FormPay({closeCart, buyClose}) {
    const { cart, clearCart } = useCart();
    const {windowSize} = useWindowSize();
    const initialValues = {
        apellido : "",
        nombre: "",
        documento: "",
        telefono: "",
        email: "",
        calle: "",
        nro: "",
        ciudad: ""
    }

    const [ payData, setPayData ] = useState(initialValues);
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(true)
    }
    useEffect(() => {
        setPayData({
            ...payData,
            detalle_compra : cart
        })
    },[])

    const handlerOnChange = (e) => {
        setPayData({
            ...payData,
            [e.target.name] : e.target.value
        })
    }

    const handlerSubmit = () => {
        const now = new Date();
        const updatedPayData = {
            ...payData,
            fechaPedido: now.toISOString().split('T')[0],
            timestamp: new Date().toISOString() 
        };
        

        fetch(RESOURCES.ENDPOINTS.PEDIDOS, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(updatedPayData)
        })
        .then((res) => {
            if(res.status === 201 ) {
                setOpen(open)
                clearCart();
                buyClose(false);
                closeCart()
            }else {
                throw new Error('Error')
            }
        })
        .catch(err => {
            console.error(err);
            clearCart();  buyClose(false);
            closeCart()
        })
    }

    return (
        <body style={{ display: 'flex', justifyContent: 'center', flexWrap: `${windowSize.width < 768 && "wrap-reverse"}`, alignContent : `${windowSize.width < 768 && "flex-end"}` }}>
            <main className="shadow" style={{ width: `${windowSize.width < 768 ? "100%" : "70%"}`, margin: '2em', padding: '2em', gap: 20 }}>
                <h3>Datos personales</h3>
                <Divider />
                <main className='flex wrap' style={{gap: 10}}>
                    <TextField 
                    label="Apellido" 
                    variant='standard'
                    name='apellido'
                    value={payData.apellido}
                    onChange={handlerOnChange}
                    sx={{width: `${windowSize.width < 768 ? "100%" : "45%"}`}}
                    ></TextField>
                    <TextField 
                    label="Nombre" 
                    name='nombre'
                    variant='standard'
                    value={payData.nombre}
                    onChange={handlerOnChange}
                    sx={{width: `${windowSize.width < 768 ? "100%" : "45%"}`}}
                    ></TextField>
                    <TextField 
                    type="number" 
                    label="Documento de identidad" 
                    name='documento'
                    value={payData.documento}
                    onChange={handlerOnChange}
                    sx={{width: `${windowSize.width < 768 ? "100%" : "30%"}`}}
                    variant='standard' />
                    <TextField 
                    type='phone' 
                    label="Telefono"
                    name='telefono'
                    value={payData.telefono}
                    onChange={handlerOnChange}
                    sx={{width: `${windowSize.width < 768 ? "100%" : "30%"}`}}
                    variant='standard'
                    />
                    <TextField 
                    type='email' 
                    name='email'
                    label="Email"
                    value={payData.email}
                    onChange={handlerOnChange}
                    sx={{width: `${windowSize.width < 768 ? "100%" : "30%"}`}}
                    variant='standard'
                    />
                </main>
                <h3>Dirección</h3>
                <Divider />
                <p>{APP_TEXTS.COMPLETE_ADRESS}</p>
                <section>
                    <TextField 
                    label="Calle"
                    name='calle' 
                    variant='standard'
                    value={payData.calle}
                    onChange={handlerOnChange}
                    ></TextField>
                    <TextField 
                    label="Numero" 
                    name='nro'
                    type="number" 
                    value={payData.nro}
                    onChange={handlerOnChange}
                    variant='standard'></TextField>
                    <TextField label="Ciudad" 
                    name='ciudad'
                    value={payData.ciudad}
                    onChange={handlerOnChange}
                    variant='standard'
                    />
                </section>
            </main>
            <section className="shadow" style={{ width: `${windowSize.width < 768 ? "100%" : "30%"}`, padding: '1em', alignSelf: 'start', margin: '2em' }}>
                <h4 className='mb-2 mt-1'> Forma de envío</h4>
                <Divider />

                <Button variant='contained' onClick={handlerSubmit}>Continuar Compra</Button>
            </section>
            <Dialog
            open={open}
            onClose={handleClose}>
            <DialogTitle>Gracias por su compra!</DialogTitle>
            <DialogContent>
                <p style={{ fontSize: '0.9em' }}>Su pedido ha sido registado con exito</p>
                <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'end' }}>
                    <Button variant='contained' onClick={handleClose}>Aceptar</Button>
                </div>
            </DialogContent>
        </Dialog>
        </body>
    )
}