import { useUser } from '../../hooks/useUser';
import '../../index.css';
import './productosPanel.css'
import { METHODS, RESOURCES } from '../../util/dictionary';
import './pedidos.css';
import React, { useEffect, useState } from 'react';
import { deleteResource, updateCreate } from '../../util/functions';
import { useData } from '../../hooks/useData';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ModalContainer } from '../Modal';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useFilters } from '../../hooks/useFilters';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Snackbar from '@mui/material/Snackbar'

export const ProductosPanel = () => {

    //Hooks
    const { user } = useUser();
    const { categorias, emprendimiento } = useData();
    const { filters, setFilters, filterProducts } = useFilters();

    const initialValues = {
        nombre_producto: '',
        descripcion: '',
        precio: '',
        img: '',
        categoria: ''
    }

    const [producto, setProducto] = React.useState(initialValues);
    const [message, setMessage] = React.useState('');
    const [reload, setReload] = React.useState(false);

    //UseEffect
    useEffect(() => {
        function getProducts(id, token) {
            fetch(RESOURCES.ENDPOINTS.PRODUCTOS_BY_EMPRENDIMIENTO + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    const filteredProducts = filterProducts(data);
                    setProductos(filteredProducts);
                })
                .catch(error => {
                    console.log("Se ha producido un error", error);
                });
        }
        getProducts(emprendimiento.id, user.token)
    }, [filters, reload]);

    //Variables de estado
    const [productos, setProductos] = React.useState([]);
    const [productSelected, setProductSelected] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [submitDisabled, setSubmitDisabled] = React.useState(true);
    const [openImageContainer, setImageContainer] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openAlert, setOpenAlert] = React.useState(false)
    const openMenu = Boolean(anchorEl);
    const [openSnackbar, setOpenSnakbar] = useState(false)

    const scrollContainerRef = React.useRef(null)
    const scrollAmount = 200;

    useEffect(() => { console.log(productos); }, [productos])
    //Handlers
    const handlerChangeFilters = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        })
    }

    const handlerOpenAlert = () => {
        if (openAlert) {
            setOpenAlert(false)
        } else {
            setOpenAlert(true)
        }
    }

    const handlerMenu = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handlerCloseMenu = () => {
        setAnchorEl(null)
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleImageOpen = () => {
        setImageContainer(true);
    }

    const handleCloseImageContainer = () => {
        setImageContainer(false);
    }

    const handleClose = () => {
        if (productSelected) setProductSelected(null)
        setProducto(initialValues)
        setOpen(false);
    }

    const handleSubmitDisabled = () => {
        if (producto.nombre_producto && producto.descripcion) setSubmitDisabled(false)
        else setSubmitDisabled(true)
    }

    const handleChange = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        if (e.target.name === 'img') {
            setProducto({
                ...producto,
                [e.target.name]: e.target.files[0]
            })
        } else {
            setProducto({
                ...producto,
                [e.target.name]: e.target.value
            });
        }
        handleSubmitDisabled();
    }

    const handleEditClick = (producto) => {
        setProducto({
            nombre_producto: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
            categoria: producto.categoria,
            img: producto.img,
            id: producto.codigo
        })
        setProductSelected(true);
    };

    const quitImage = () => {
        setProducto({
            ...producto,
            img: ''
        });
        handleCloseImageContainer();
    }

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    //Sumbit
    const sendUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', producto.nombre_producto);
        formData.append('descripcion', producto.descripcion);
        formData.append('precio', Number(producto.precio));
        formData.append('img', producto.img);
        formData.append('category', Number(producto.categoria));
        formData.append('emprendimiento', emprendimiento.id);

        updateCreate(RESOURCES.ENDPOINTS.PRODUCTOS + (productSelected ? producto.id : ''), formData, productSelected ? METHODS.PUT : METHODS.POST)
            .then(() => {
                if (productSelected) {
                    setMessage('El producto ha sido actualizado con exito')
                } else {
                    setMessage('El producto ha sido creado con exito')
                }
                setOpenSnakbar(true);
                setReload(!reload);
                handleClose();
            })
            .catch(err => console.log(err))
    }


    const deleteProduct = () => {
        deleteResource(RESOURCES.ENDPOINTS.PRODUCTOS, METHODS.DELETE, producto.id)
            .then(data => {
                handlerOpenAlert()
                setReload(!reload)
            })
    }


    return (
        <section id="manager" className='shadow flex wrap' style={{ margin: '1rem 1rem 0.5rem 2rem', width: '90%', height: '95%', overflow: 'hidden', alignContent: 'start', justifyContent: 'space-between' }}>
            <div className='flex w-full justify-between w-full' style={{ justifyContent: 'space-between', marginTop: '1rem', width: '100%', height: 'min-content', padding: '0.5rem 5rem 0.5rem 2rem' }}>
                <h2>Gestionar productos</h2>
                <div>
                    <Tooltip title="Agregar Producto">
                        <IconButton onClick={handleClickOpen}>
                            <AddCircleIcon fontSize='large' sx={{ color: 'green' }}></AddCircleIcon>
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnakbar(false)}
                message={message}
            />
            <section style={{ width: '100%', display: 'flex', flexWrap: 'wrap', height: '70%' }}>
                <main style={{ padding: '1rem 2rem', width: '100%', display: 'flex', flexWrap: 'wrap', gap: 10, height: 'max-content' }}>
                    <TextField
                        label="Nombre del producto"
                        name="nombre_producto"
                        onChange={handlerChangeFilters}
                        variant='standard'
                        style={{ width: '40%' }}
                    />
                    <TextField
                        label="Descripcion del producto"
                        name="descripcion"
                        onChange={handlerChangeFilters}
                        variant='standard'
                        style={{ width: '40%' }}
                    />
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size='small'>
                        <InputLabel id="demo-simple-select-standard-label">Categoria</InputLabel>
                        <Select
                            label="Categoria"
                            name='category'
                            value={filters.category}
                            onChange={handlerChangeFilters}
                        >
                            <MenuItem value="All">Todas</MenuItem>
                            {categorias.map(cat => (
                                <MenuItem value={cat.categoria_id}>{cat.nombre_categoria}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </main>
                {productos.length === 0
                    ? <section className='flex wrap w-full' style={{ maxHeight: '70%', minHeight: '70%', height: '70%', justifyContent: 'center', alignContent: 'center' }}>
                        <img width="100" height="100" src="https://img.icons8.com/ios/100/nothing-found.png" alt="nothing-found" />
                        <p className='w-full' style={{ textAlign: 'center' }}>No se encontraron productos</p>
                    </section>
                    :
                    <section style={{ paddingTop: '0', height: '90%', display: 'flex' }}>
                        <div style={{ width: "max-content", position: 'relative', bottom: '-140px' }}>
                            <IconButton onClick={scrollLeft}>
                                <KeyboardArrowLeftIcon />
                            </IconButton>
                        </div>
                        <main
                            ref={scrollContainerRef}
                            style={{ display: 'flex', justifyContent: 'start', height: '100%', overflowX: 'scroll', overflowY: 'hidden', scrollbarWidth: 'none', padding: '1rem 3rem' }}>
                            {productos.map(product => (
                                <li key={product.id} style={{ listStyle: 'none', minWidth: '20%', maxWidth: '250PX', height: '20rem', margin: '0.3rem' }} className='box-shadow'>
                                    <div style={{ width: '100%', height: '80%', overflow: 'hidden' }}>
                                        <img
                                            src={RESOURCES.ENDPOINTS.IMAGE + product.img}
                                            alt={product.nombre}
                                            style={{ objectFit: 'cover', objectPosition: 'center', width: '100%' }}
                                        />
                                    </div>
                                    <section style={{ padding: '0.5rem', }}>
                                        <div>
                                            <strong>{product.nombre}</strong>
                                        </div>
                                        <div>
                                            <p>$ {product.precio}</p>
                                        </div>
                                    </section>
                                    <div style={{ position: 'relative', top: '-100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'end', marginRight: '10px' }}>
                                        <IconButton onClick={(e) => { handlerMenu(e); handleEditClick(product) }} style={{ width: 'max-content' }}>
                                            <MoreVertIcon />
                                        </IconButton>
                                    </div>
                                </li>
                            ))}
                            <Menu
                                anchorEl={anchorEl}
                                open={openMenu}
                                onClose={handlerCloseMenu}
                            >
                                <MenuItem onClick={() => { handlerCloseMenu(); handleClickOpen() }}>Editar</MenuItem>
                                <MenuItem onClick={() => { handlerCloseMenu(); handlerOpenAlert() }}>Eliminar</MenuItem>
                            </Menu>
                        </main>
                        <div style={{ width: "max-content", position: 'relative', top: '-300px', right: '-1000px' }}>
                            <IconButton onClick={scrollRight}>
                                <KeyboardArrowRightIcon />
                            </IconButton>
                        </div>
                    </section>
                }
            </section>
            <Alert openAlert={openAlert} handlerOpenAlert={handlerOpenAlert} accept={{ handlerCloseMenu, deleteProduct }} />
            <ModalContainer open={open} handleClose={handleClose}>
                <div style={{ backgroundColor: 'white', padding: '2rem', width: '50%' }} className='box-shadow'>
                    <h2>
                        {productSelected
                            ? 'Actualizar producto'
                            : 'Nuevo Producto'
                        }
                    </h2>
                    <form onSubmit={sendUpdate} style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                        <FormControl sx={{ width: '100%' }}>
                            <TextField
                                label="Nombre del Produto"
                                name='nombre_producto'
                                value={producto.nombre_producto}
                                onChange={handleChange}
                                variant="standard"
                            />
                        </FormControl>
                        <FormControl sx={{ width: '100%' }}>
                            <TextField
                                label="Descripción"
                                name='descripcion'
                                value={producto.descripcion}
                                onChange={handleChange}
                                variant='standard'
                                multiline />
                        </FormControl>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">Categoria</InputLabel>
                                <Select
                                    label="Categoria"
                                    name='categoria'
                                    value={producto.categoria}
                                    onChange={handleChange}
                                >
                                    {categorias.map(cat => (
                                        <MenuItem value={cat.categoria_id}>{cat.nombre_categoria}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-amount">Precio</InputLabel>
                                <Input
                                    id="standard-adornment-amount"
                                    name='precio'
                                    type='number'
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    value={producto.precio}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <div style={{ alignContent: 'center' }}>
                                {producto.img
                                    ?
                                    <div style={{ width: 'max-content', display: 'flex' }}>
                                        <Tooltip title="Ver Imagen" style={{ width: 'max-content' }}>
                                            <IconButton onClick={handleImageOpen}>
                                                <ImageIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Borrar imagen" style={{ width: 'max-content' }}>
                                            <IconButton onClick={quitImage} sx={{ color: '#b83554' }}>
                                                <DeleteIcon></DeleteIcon>
                                            </IconButton>
                                        </Tooltip>

                                    </div>
                                    :
                                    <Tooltip title="Cargar Imagen">
                                        <IconButton component="label">
                                            <AddPhotoAlternateIcon />
                                            <input type='file' style={{ display: 'none' }} name='img' onChange={handleChange}></input>
                                        </IconButton>
                                    </Tooltip>
                                }
                            </div>
                        </div>
                        <section style={{ width: '100%', display: 'flex', justifyContent: 'end', marginTop: '2em' }}>
                            <Button variant='text' sx={{ maxWidth: '45%' }} onClick={handleClose}>Cancelar</Button>
                            <Button variant="contained" sx={{ maxWidth: '45%' }} disabled={submitDisabled ? true : false} type='submit' >GUARDAR</Button>
                        </section>
                    </form>
                </div>
            </ModalContainer>
            <ModalContainer open={openImageContainer}>
                <main style={{ backgroundColor: 'white', padding: '2rem', width: '50%' }} className='box-shadow'>
                    <section style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        <h3>Imagen del producto</h3>
                        <div>
                            <Tooltip title="Cerrar">
                                <IconButton onClick={handleCloseImageContainer}>
                                    <CloseIcon></CloseIcon>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </section>
                    <main style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ width: '50%' }}>
                            <Tooltip title="Borrar imagen" style={{ width: 'max-content', position: 'relative', top: '50px', left: '260px' }}>
                                <IconButton onClick={quitImage} sx={{ color: '#b83554' }}>
                                    <DeleteIcon></DeleteIcon>
                                </IconButton>
                            </Tooltip>
                            {producto.img
                                && <img src={
                                    typeof producto.img === 'object'
                                        ? URL.createObjectURL(producto.img)
                                        : RESOURCES.ENDPOINTS.IMAGE + producto.img
                                } style={{ width: '100%' }} />
                            }
                        </div>
                    </main>
                </main>
            </ModalContainer>
        </section>
    )
}

export const Alert = ({ openAlert, handlerOpenAlert, accept }) => {
    return (
        <Dialog
            open={openAlert}
            onClose={handlerOpenAlert}>
            <DialogTitle>¿Estás seguro de eliminar este producto?</DialogTitle>
            <DialogContent>
                <p style={{ fontSize: '0.9em' }}>Se eliminará el producto de la base de datos y no se podrá reincorporar</p>
                <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'end' }}>
                    <Button onClick={handlerOpenAlert}>Cancelar</Button>
                    <Button variant='contained' onClick={() => { accept.handlerCloseMenu(), accept.deleteProduct() }}>Aceptar</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}