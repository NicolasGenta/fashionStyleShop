import { useForm } from "../../hooks/useForm";
import { useUser } from "../../hooks/useUser";
import React, { useEffect, useState } from "react";
import { APP_PROFILES, METHODS, RESOURCES } from "../../util/dictionary";
import './profileInfo.css'
import { updateCreate, validatePassword } from "../../util/functions";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button'
import { EmprendimientoProfile } from "./EmprendimientoProfile";
import Avatar from '@mui/material/Avatar';
import Tooltip from "@mui/material/Tooltip";
import BadgeIcon from '@mui/icons-material/Badge';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import HouseIcon from '@mui/icons-material/House';
import Dialog from '@mui/material/Dialog';
import profileImg from '../../../assets/images/profile_illustration.png'
import { useWindowSize } from "../../hooks/useWindowSize";


export const ProfileInfo = () => {
    const { user, setUser } = useUser();
    const {windowSize} = useWindowSize();
    const { newPassword, onInputChange, onResetForm } = useForm({
        newPassword: ''
    });

    const [userData, setUserData] = useState(user)

    //👇 useEffect
    useEffect(() => {
        function getProfile(id, token) {
            fetch()
        }
    })

    //👇 State variables
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    //👇 Handlers
    const udpdateInfo = (e) => {
        e.preventDefault();
        fetch(RESOURCES.ENDPOINTS.UPDATE_USER + user.user_id, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${user.token}`
            },
            body: JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(data => {
            handleClose()
        }
    )
    }

    return (
        <section className="flex" 
        style={{ 
        margin: `${windowSize.width < 768 ? '0.2rem 0.2rem 0.2rem 1rem' : '1rem 1rem 0.5rem 2rem'}`, 
        width: `${windowSize.width < 768 ? '80%' : '90%'}`, 
        height: windowSize.height - 57, 
        flexWrap: `${windowSize.width < 768 && 'wrap'}`,
        overflowX: `${windowSize.width > 768 && 'hidden' }`,
        overflowY: `${windowSize.width < 768 ? 'scroll' : 'hidden'}`, 
        alignContent: 'start', 
        justifyContent: 'space-between' }}>
            <main className="shadow justify-center" style={{ minWidth: `${windowSize.width < 768 ? '90%' : '3%'}`, maxWidth: `${windowSize.width < 768 ? '90%' : '30%'}`, height: `${windowSize.width < 768 && 'max-content'}`, margin: '1em', padding: '3em' }}>
                <main className="flex wrap align-center" style={{ display: 'flex' }}>
                    <Avatar sx={{ width: 80, height: 80 }}>{(user.lastName)[0] + (user.firstName)[0]}</Avatar>
                    <section className="flex wrap" style={{ width: `${windowSize.width < 768 ? '70%' : '70%'}`, gap: 10, padding: '1em' }}>
                        <div className="w-full flex wrap">
                            <div className="w-full flex" style={{ justifyContent: 'end' }}>
                                <h4 className="w-full">{user.lastName} {user.firstName}</h4>
                                <Tooltip title="Editar" >
                                    <IconButton onClick={handleOpen} style={{height: 'min-content'}}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <Chip
                                label={user.rol_name}
                                color="primary"
                                size="small"
                                sx={{ fontSize: '10px', display: 'flex', alignItems: 'center', height: 'max-content' }}
                            />
                        </div>
                        <p style={{ fontSize: '0.9rem' }}>{user.email}</p>
                    </section>
                </main>
                <Divider />
                {
                    user.documento
                        ? <section style={{padding: '1em'}}>
                            <div className="flex" style={{gap: 10}}>
                                <BadgeIcon sx={{color: '#344955'}}/>
                                <p>{user.documento}</p>
                            </div>
                            <div className="flex" style={{gap: 10}}>
                                <LocalPhoneIcon sx={{color: '#344955'}}/>
                                <p>{user.telefono}</p>
                            </div>
                            <div className="flex" style={{gap: 10}}>
                                <HouseIcon sx={{color: '#344955'}}/>
                                <p>{user.calle} {user.nro} entre {user.calle_1} y {user.calle_2}</p>
                            </div>
                        </section>
                        : <section className="w-full flex wrap justify-center message-container">
                            <p className="w-full" style={{textAlign: 'center'}}>Por favor complete sus datos</p>
                            <Button onClick={handleOpen}>Completar datos</Button>
                        </section>
                }
                <Dialog open={open}>
                    <section style={{ backgroundColor: 'white', padding: '2em', width: '100%' }}>
                        <header className="w-full flex" style={{ alignContent: 'center', justifyContent: 'space-between' }}>
                            <h4>Actualizar datos personales</h4>
                        </header>
                        <body className="w-full flex wrap" style={{ marginTop: '1rem', justifyContent: 'center', gap: 15 }}>
                            <div className="flex wrap w-full" style={{gap: 10}}>
                                <TextField
                                    label="Apellido"
                                    name="lastName"
                                    variant="standard"
                                    sx={{ minWidth: '45%' }}
                                    value={userData.lastName}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Nombre"
                                    name="firstName"
                                    variant="standard"
                                    sx={{ minWidth: '45%' }}
                                    value={userData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex wrap w-full" style={{gap:10}}>
                                <TextField
                                    label="DNI"
                                    variant="standard"
                                    name="documento"
                                    sx={{ minWidth: '45%' }}
                                    value={userData.documento}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Email"
                                    name="email"
                                    sx={{ minWidth: '45%' }}
                                    value={userData.email}
                                    onChange={handleChange}
                                    variant="standard" />
                            </div>
                            <div className="flex w-full" style={{gap:10}}>
                                <TextField
                                    label="Telefono"
                                    name="telefono"
                                    value={userData.telefono}
                                    sx={{ minWidth: '30%' }}
                                    onChange={handleChange}
                                    variant="standard" />
                                <TextField
                                    label="Calle"
                                    name="calle"
                                    value={userData.calle}
                                    onChange={handleChange}
                                    sx={{ minWidth: '30%' }}
                                    variant="standard" />
                                    <TextField
                                    label="Nro"
                                    name="nro"
                                    value={userData.nro}
                                    sx={{ minWidth: '10%', maxWidth: '16%' }}
                                    onChange={handleChange}
                                    variant="standard" />
                            </div>
                            <div className="flex w-full" style={{gap:10}}>
                                    <TextField
                                    label="Entre"
                                    name="calle_1"
                                    sx={{ minWidth: '45%' }}
                                    value={userData.calle_1}
                                    onChange={handleChange}
                                    variant="standard" />
                                    <TextField
                                    label="Y"
                                    name="calle_2"
                                    sx={{ minWidth: '45%' }}
                                    value={userData.calle_2}
                                    onChange={handleChange}
                                    variant="standard" />
                            </div>
                            <div>
                                <Button onClick={handleClose}>Cancelar</Button>
                                <Button onClick={udpdateInfo} variant="contained">Guardar</Button>
                            </div>
                        </body>
                    </section>
                </Dialog>

            </main>
            {user.rol_name == 'Emprendedor'
                ? <EmprendimientoProfile />

                : <div style={{height: '100%', width: '50%'}}>
                    <img src={profileImg} style={{height: '100%'}}/>
                </div>

            }

        </section>
    )
}