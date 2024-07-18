import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import { useData } from '../../hooks/useData';
import { useEffect, useState } from 'react';
import { useUser } from '../../hooks/useUser';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { API_URL, RESOURCES } from '../../util/dictionary';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useWindowSize } from '../../hooks/useWindowSize';

export const EmprendimientoProfile = () => {
    const { emprendimiento, setEmprendimiento, rubros, setRubros } = useData();
    const { user } = useUser();
    const [editable, setEditable] = useState(false);
    const [open, setOpen] = useState(false);
    const [alertShowed, setAlertShowed] = useState(false);
    const {windowSize} = useWindowSize();


    async function getEmprendimiento(id, token) {
        try {
            const response = await fetch(RESOURCES.ENDPOINTS.EMPRENDIMIENTO_BY_USER + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setEmprendimiento(data);
            } else {
                throw new Error('NOT FOUND');
            }
        } catch (err) {
            setEmprendimiento([]);
            handleOpen();
            setEditable(true)
        }
    }

    const handleChange = (e) => {
        setEmprendimiento({
            ...emprendimiento,
            [e.target.name]: e.target.value,
            usuario_id: user.user_id
        })
    }

    useEffect(() => {
        function getRubros(token) {
            fetch(RESOURCES.ENDPOINTS.RUBROS, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then((rubros) => setRubros(rubros))
                .catch(error => console.log(`Se ha producido un error, ${error}`))
        }
        getEmprendimiento(user.user_id, user.token)
        getRubros(user.token);
    }, []);



    const handleOpen = () => {
        setOpen(true);
        setAlertShowed(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const updateEmprendimiento = (e) => {
        e.preventDefault();
        setEmprendimiento({
            ...emprendimiento,
            usuario_id: user.user_id
        });
        let url,
            method;
        if (emprendimiento.id) {
            url = RESOURCES.ENDPOINTS.UPDATE_EMPRENDIMIENTO + emprendimiento.id;
            method = 'PUT'
        } else {
            url = RESOURCES.ENDPOINTS.EMPRENDIMIENTOS;
            method = 'POST'
        }
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(emprendimiento)
        })
            .then(data => {
                console.log(data);
            })
        setEditable(false)
    }

    return (
        <main className="shadow justify-center" 
        style={{ minWidth: `${windowSize.width < 768 ? '90%' : '65%'}`, maxWidth: `${windowSize.width < 768 ? '90%' : '65%'}`, height: `${windowSize.width < 768 && 'max-content'}`, margin: '1em', padding: '3em' }}>
            <div className="flex justify-beetwen" style={{ paddingRight: '3em' }}>
                <h2>Emprendimiento</h2>
                <div style={{ width: 'max-content' }}>
                    {!editable
                        ?
                        <Tooltip title="Editar">
                            <IconButton onClick={() => setEditable(true)}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        : <Button type="submit" onClick={updateEmprendimiento}> Guardar</Button>
                    }

                </div>
            </div>
            <Divider />
            {!emprendimiento
                ? <div className='w-full flex justify-center' style={{ height: '80%', alignItems: 'center' }}>
                    <CircularProgress />
                </div>
                :
                <>
                    <div className="flex wrap" style={{ width: '100%', padding: '1em', gap: 15 }}>
                        {emprendimiento && emprendimiento.estado === 0 && <Alert style={{ width: '100%' }} severity="error">El emprendimiento esta INACTIVO. Por favor contacte con el Administrador</Alert>}
                        <TextField
                            labelId="demo-simple-select-standard-label"
                            label="Nombre"
                            variant="standard"
                            name='razon_social'
                            onChange={handleChange}
                            value={emprendimiento && emprendimiento.razon_social}
                            disabled={(emprendimiento && editable) || (emprendimiento === null && editable) ? false : true}
                            sx={{
                                width: `${windowSize.width < 768 && '100%'}`
                            }}
                        ></TextField>
                        <FormControl sx={{ width: `${windowSize.width < 768 ? '100%' : '50%'}` }}>
                            <InputLabel>Rubro</InputLabel>
                            <Select
                                variant="standard"
                                name='rubro_id'
                                key='rubro-options'
                                onChange={handleChange}
                                value={emprendimiento && emprendimiento.rubro_id}
                                disabled={(emprendimiento && editable) || (emprendimiento === null && editable) ? false : true}
                            >
                                {rubros.map(elem => (
                                    <MenuItem value={elem.id}>{elem.nombre}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <section style={{ width: '100%', marginTop: '2em' }}>
                        <h2>Dirección</h2>
                        <Divider />
                        <div className="flex align-center wrap" style={{ gap: 20 }}>
                            <TextField
                                label="Calle"
                                variant="standard"
                                name='calle'
                                value={emprendimiento && emprendimiento.calle}
                                onChange={handleChange}
                                disabled={editable ? false : true}
                                sx={{
                                    width: `${windowSize.width < 768 && '100%'}`
                                }}
                            ></TextField>
                            <TextField
                                label="Numero"
                                variant="standard"
                                type="number"
                                value={emprendimiento && emprendimiento.nro}
                                name='nro'
                                onChange={handleChange}
                                disabled={editable ? false : true}
                                sx={{
                                    width: `${windowSize.width < 768 && '100%'}`
                                }}
                            ></TextField>
                            <TextField
                                label="Entre"
                                variant="standard"
                                type="text"
                                value={emprendimiento && emprendimiento.calle_1}
                                name='calle_1'
                                onChange={handleChange}
                                disabled={editable ? false : true}
                                sx={{
                                    width: `${windowSize.width < 768 && '100%'}`
                                }}
                            ></TextField>
                            <TextField
                                label="Y"
                                variant="standard"
                                type="text"
                                name='calle_2'
                                value={emprendimiento && emprendimiento.calle_2}
                                onChange={handleChange}
                                disabled={editable ? false : true}
                                sx={{
                                    width: `${windowSize.width < 768 && '100%'}`
                                }}
                            ></TextField>
                        </div>
                    </section>
                </>
            }

            <Dialog open={open} onClose={handleClose}>
                <section style={{ padding: '0.5em' }}>
                    <DialogTitle>
                        Agrege un emprendimiento
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Para poder continuar debe agregar un emprendimiento
                        </DialogContentText>
                    </DialogContent>
                    <div style={{ width: '100%', justifyContent: 'end', display: 'flex', flexWrap: 'wrap' }}>
                        <Button variant='contained' onClick={handleClose}>Aceptar</Button>
                    </div>
                </section>
            </Dialog>


        </main>
    )
}