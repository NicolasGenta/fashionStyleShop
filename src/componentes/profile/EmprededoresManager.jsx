import React, { useEffect, useState } from 'react';
import { useData } from "../../hooks/useData";
import './emprendedoresManager.css';
import { updateCreate } from '../../util/functions';
import { METHODS, RESOURCES } from '../../util/dictionary';
import { Pedidos } from './Pedidos';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell'
import Chip from '@mui/material/Chip';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import { ModalContainer } from '../Modal';
import { useUser } from '../../hooks/useUser';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useFilters } from '../../hooks/useFilters';
import CircularProgress from '@mui/material/CircularProgress';
import { useWindowSize } from '../../hooks/useWindowSize';

export const EmprendedoresManager = () => {

    const { user } = useUser()
    const { filters, setFilters } = useFilters();
    const {windowSize} = useWindowSize();
    //👇Status variables
    const [emprendimientos, setEmprendimientos] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedEmprendimiento, setSelectedEmprendimiento] = useState(null);
    const [rubro, setRubro] = useState("");
    const [category, setCategory] = useState("");

    const [openRubroModal, setRubroModal] = useState(false);
    const [openCategoryModal, setCategoryModal] = useState(false);
    const [reload, setReload] = useState(false);
    const [viewEmprendimiento, setViewEmprendimiento] = useState(false);
    const [openSnackbar, setOpenSnakbar] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [error, setError] = useState(false);

    const filterEmprendimientos = (emprendimientos) => {
        let emprendimientosFiltrados;
        emprendimientosFiltrados = emprendimientos.filter(emprendimiento => {
            return (
                (
                    filters.razon_social === '' ||
                    emprendimiento.nombre.toLowerCase().includes(filters.razon_social.toLowerCase())
                ) &&
                (
                    filters.responsable === '' ||
                    emprendimiento.responsable.toLowerCase().includes(filters.responsable.toLowerCase())
                ) && (
                    filters.rubro === 'All' ||
                    emprendimiento.rubro_id === filters.rubro
                ) && (
                    filters.estado === 'All' ||
                    emprendimiento.estado_id === filters.estado
                )
            )
        })
        return emprendimientosFiltrados
    }

    //👇UseEffect
    useEffect(() => {
        const token = sessionStorage.getItem('jwt')
        async function getEmprendimientos() {
            const response = await fetch(RESOURCES.ENDPOINTS.EMPRENDIMIENTOS, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        }


        getEmprendimientos()
            .then(emprendimientos => {
                const emprendimientosFiltrados = filterEmprendimientos(emprendimientos)
                setEmprendimientos(emprendimientosFiltrados);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [reload, filters]);

    //👇 Manejo de cambio en los filtros
    const handlerChangeFilters = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        })
    }

    //👇Handlers
    const handleEstadoChange = (e) => {
        setSelectedEmprendimiento({
            ...selectedEmprendimiento,
            [e.target.name]: e.target.value
        })
    };

    //👇Manejo de modal para cargar un nuevo rubro
    const handleOpenRubro = () => {
        setRubroModal(true)
    }
    const handleCloseRubro = () => {
        setRubro("");
        setRubroModal(false)
    }

    //👇Manejo del modal para editar el estado
    const handleEditClick = (emprendimiento) => {
        setSelectedEmprendimiento({ ...emprendimiento });
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setSelectedEmprendimiento(null);
        setModalVisible(false);
    };

    //👇 Manejo para abrir modal para ver detalles del emprendimiento
    const handleOpenViewEmprendimiento = (emprendimiento) => {
        setSelectedEmprendimiento({ ...emprendimiento });
        setViewEmprendimiento(true)
    }

    const handleCloseViewEmprendimiento = () => {
        setSelectedEmprendimiento(null);
        setViewEmprendimiento(false)
    }

    //👇 Cambia las variables de estado de rubro y categoria
    const handleChange = (e) => {
        if (e.target.name === 'nombre_rubro') {
            setRubro({
                ...rubro,
                [e.target.name]: e.target.value
            })
        } else {
            setCategory({
                ...category,
                [e.target.name]: e.target.value
            })
        }
    }


    //👇 Envío de petición para actualizar el estado
    const sendUpdate = (e) => {
        e.preventDefault();
        const updatedEmprendimiento = {
            id: Number(selectedEmprendimiento.id),
            nombre: selectedEmprendimiento.nombre,
            estado_id: Number(selectedEmprendimiento.estado_id),
        };
        fetch(RESOURCES.ENDPOINTS.EMPRENDIMIENTOS, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(updatedEmprendimiento)

        })
            .then((res) => {
                if (!res.ok) {
                    setError(true)
                }
                return res.json()
            })
            .then(data => {
                handleCloseModal();
                setReload(!reload);
                setOpenSnakbar(true)
                setFeedback(data)
            })
    }

    //👇Petición para crear un nuevo rubro
    const createRubro = () => {
        let url;
        let data
        if (rubro !== "") {
            url = RESOURCES.ENDPOINTS.RUBROS;
            data = rubro
        } else {
            url = RESOURCES.ENDPOINTS.NEW_CATEGORIA;
            data = category
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (!res.ok) {
                    setError(true)
                }
                return res.json()
            })
            .then(data => {
                handleCloseRubro();
                setCategoryModal(false)
                setOpenSnakbar(true)
                setFeedback(data)
            })
    }


    return (
        <section className='flex' style={{
            margin: `${windowSize.width < 768 ? '0.2rem 0.2rem 0.2rem 1rem' : '1rem 1rem 0.5rem 2rem'}`,
            minWidth: `${windowSize.width < 768 ? '75%' : '90%'}`,
            maxWidth: `${windowSize.width < 768 ? '75%' : '90%'}`,
            width: `${windowSize.width < 768 ? '75%' : '90%'}`,
            height: windowSize.height - 57,
            flexWrap: `${windowSize.width < 768 && 'wrap'}`,
            overflowY: `${windowSize.width < 768 ? 'scroll' : 'hidden'}`,
            alignContent: 'start',
            justifyContent: 'space-between'
        }}>
            <main style={{ minWidth: `${windowSize.width < 768 ? '100%' : '100%'}`, maxWidth: `${windowSize.width < 768 ? '100%' : '100%'}`, height: `${windowSize.width < 768 && 'max-content'}`, margin: '1em', padding: '3em' }}>
                <div className='flex' style={{ justifyContent: 'space-between' }}>
                    <h2>Gestionar emprendimientos</h2>
                    <div>
                        <Button onClick={handleOpenRubro}>+ Rubro</Button>
                        <Button onClick={() => { setCategoryModal(true) }}>+ Categoria</Button>
                    </div>
                </div>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={() => setOpenSnakbar(false)}
                >
                    <Alert
                        severity={error ? "error" : "success"}
                        variant="filled">
                        {feedback}
                    </Alert>
                </Snackbar>
                <section style={{ display: 'flex', paddingBottom: '2em', gap: 15 }}>
                    <TextField label="Emprendimiento" type='text' name='razon_social' variant='standard' sx={{ width: '30%' }} onChange={handlerChangeFilters} value={filters.razon_social} ></TextField>
                    <TextField label="Responsable" name='responsable' value={filters.responsable} onChange={handlerChangeFilters} variant='standard' sx={{ width: `${windowSize.width < 768 ? '100%' : '30%'}` }}></TextField>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: '15%', maxWidth: '15%' }} size='small'>
                        <InputLabel id="rubro">Rubro</InputLabel>
                        <Select
                            label="Rubro"
                            name='rubro'
                            value={filters.rubro}
                            onChange={handlerChangeFilters}
                        >
                            <MenuItem value="All">Todas</MenuItem>
                            {emprendimientos && emprendimientos.map(emp => (
                                <MenuItem value={emp.rubro_id}>{emp.rubro}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: '15%', maxWidth: '15%' }} size='small'>
                        <InputLabel id="estado">Estado</InputLabel>
                        <Select
                            label="Estado"
                            name='estado'
                            value={filters.estado}
                            onChange={handlerChangeFilters}
                        >
                            <MenuItem value="All">Todos</MenuItem>
                            <MenuItem value={1}>Activo</MenuItem>
                            <MenuItem value={0}>Inactivo</MenuItem>
                        </Select>
                    </FormControl>
                </section>
                {!emprendimientos
                    ? <div className='w-full flex justify-center' style={{ height: '80%', alignItems: 'center' }}>
                        <CircularProgress />
                    </div>
                    : (emprendimientos && emprendimientos.length === 0)
                        ? <section className='flex wrap' style={{ maxHeight: '70%', minHeight: '70%', height: '70%', justifyContent: 'center', alignContent: 'center' }}>
                            <img width="100" height="100" src="https://img.icons8.com/ios/100/nothing-found.png" alt="nothing-found" />
                            <p className='w-full' style={{ textAlign: 'center' }}>No se encontraron emprendimientos</p>
                        </section>
                        :
                        <TableContainer sx={{ maxHeight: '70%', overflowY: 'scroll' }}>
                            <Table size='small'>
                                <TableHead style={{ marginBottom: '1em' }}>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>EMPRENDIMIENTO</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>ESTADO</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>RUBRO</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>RESPONSABLE</TableCell>
                                    </TableRow>
                                </TableHead>
                                {/* <Divider/> */}
                                <TableBody className='shadow'>
                                    {emprendimientos && emprendimientos.map(emprendimiento => (
                                        <TableRow key={emprendimiento.id}>
                                            <TableCell>
                                                <Tooltip title="Ver">
                                                    <IconButton onClick={() => { handleOpenViewEmprendimiento(emprendimiento) }}>
                                                        <VisibilityIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell cscope="row">{emprendimiento.nombre}</TableCell>
                                            <TableCell scope="row">
                                                <Tooltip title="Cambiar estado">
                                                    <IconButton onClick={() => handleEditClick(emprendimiento)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Chip label={emprendimiento.estado} color={emprendimiento.estado === 'Activo' ? 'success' : 'primary'} variant="outlined" ></Chip></TableCell>
                                            <TableCell scope="row">{emprendimiento.rubro}</TableCell>
                                            <TableCell scope="row">{emprendimiento.responsable}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                }

            </main>
            <ModalContainer open={modalVisible} handleClose={handleCloseModal}>
                <div style={{ backgroundColor: 'white', padding: '2em', width: '30%' }}>
                    <h3>Cambiar Estado</h3>
                    <section>
                        <TextField
                            label="Emprendimiento"
                            value={selectedEmprendimiento ? selectedEmprendimiento.nombre : ''}
                            variant='standard'
                            disabled
                            style={{ width: '100%' }}
                        ></TextField>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: '100%', maxWidth: '100%' }} size='small'>
                            <InputLabel id="demo-simple-select-standard-label">Estado</InputLabel>
                            <Select
                                label="Estado"
                                name='estado_id'
                                onChange={handleEstadoChange}
                                value={selectedEmprendimiento ? selectedEmprendimiento.estado_id : ''}
                            >
                                <MenuItem value={1}>Activo</MenuItem>
                                <MenuItem value={0}>Inactivo</MenuItem>
                            </Select>
                        </FormControl>
                        <div className='flex' style={{ padding: '1em', width: '100%', gap: 10, justifyContent: 'end' }}>
                            <Button onClick={handleCloseModal}>Cancelar</Button>
                            <Button onClick={sendUpdate} variant='contained'>Guardar</Button>
                        </div>
                    </section>
                </div>
            </ModalContainer>
            <ModalContainer open={openRubroModal} handleClose={handleCloseModal}>
                <div style={{ backgroundColor: 'white', padding: '2em', width: '30%' }}>
                    <main>
                        <h3>Nuevo Rubro</h3>
                    </main>
                    <TextField label="Rubro" name='nombre_rubro' variant='standard' onChange={handleChange} style={{ width: '100%' }} required></TextField>
                    <div className='flex' style={{ padding: '1em', width: '100%', gap: 10, justifyContent: 'end' }}>
                        <Button onClick={handleCloseRubro}>Cancelar</Button>
                        <Button onClick={createRubro} variant='contained'>Guardar</Button>
                    </div>
                </div>
            </ModalContainer>
            <ModalContainer open={openCategoryModal} handleClose={handleCloseModal}>
                <div style={{ backgroundColor: 'white', padding: '2em', width: '30%' }}>
                    <main>
                        <h3>Nueva Categoria</h3>
                    </main>
                    <TextField label="Categoria" name='nombre_categoria' variant='standard' onChange={handleChange} style={{ width: '100%' }} required></TextField>
                    <div className='flex' style={{ padding: '1em', width: '100%', gap: 10, justifyContent: 'end' }}>
                        <Button onClick={() => { setCategoryModal(false) }}>Cancelar</Button>
                        <Button onClick={createRubro} variant='contained'>Guardar</Button>
                    </div>
                </div>
            </ModalContainer>
            <ModalContainer open={viewEmprendimiento}>
                <div className="flex wrap" style={{ backgroundColor: 'white', padding: '2em', width: '40%', gap: 10 }}>
                    <main className='flex wrap justify-between w-full'>
                        <h3>{selectedEmprendimiento && selectedEmprendimiento.nombre}</h3>
                        <Tooltip title="cerrar">
                            <IconButton onClick={handleCloseViewEmprendimiento}>
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                        <Divider sx={{ width: '100%' }} />
                    </main>
                    <main className='w-full'>
                        <h5>Datos del Emprendimiento</h5>
                        <section style={{ marginTop: '1em' }}>
                            <div className='flex' style={{ gap: 10 }}>
                                <p style={{ fontWeight: 'bold' }}>Rubro: </p>
                                <p>{selectedEmprendimiento && selectedEmprendimiento.rubro}</p>
                            </div>
                            <div className='flex' style={{ gap: 10 }}>
                                <p style={{ fontWeight: 'bold' }}>Estado: </p>
                                <Chip label={selectedEmprendimiento && selectedEmprendimiento.estado} color={selectedEmprendimiento && selectedEmprendimiento.estado === 'Activo' ? 'success' : 'primary'} variant="outlined" size='small'></Chip>
                            </div>
                            <div className='flex' style={{ gap: 10 }}>
                                <p style={{ fontWeight: 'bold' }}>Direccion: </p>
                                <p>{selectedEmprendimiento && selectedEmprendimiento.direccion}</p>
                            </div>
                        </section>
                    </main>
                    <main className='w-full'>
                        <h5>Datos del responsable</h5>
                        <Divider sx={{ width: '100%' }} />
                        <section style={{ marginTop: '1em' }}>
                            <div className='flex' style={{ gap: 10 }}>
                                <p style={{ fontWeight: 'bold' }}>Apellido y Nombre: </p>
                                <p>{selectedEmprendimiento && selectedEmprendimiento.responsable}</p>
                            </div>
                            <div className='flex' style={{ gap: 10 }}>
                                <p style={{ fontWeight: 'bold' }}>DNI:</p>
                                <p>{selectedEmprendimiento && selectedEmprendimiento.documento}</p>
                            </div>
                            <div className='flex' style={{ gap: 10 }}>
                                <p style={{ fontWeight: 'bold' }}>Telefono: </p>
                                <p>{selectedEmprendimiento && selectedEmprendimiento.telefono_responsable}</p>
                            </div>
                            <div className='flex' style={{ gap: 10 }}>
                                <p style={{ fontWeight: 'bold' }}>Email: </p>
                                <p>{selectedEmprendimiento && selectedEmprendimiento.email}</p>
                            </div>
                        </section>
                    </main>
                </div>
            </ModalContainer>
        </section>
    );
};
