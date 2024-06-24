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
import { Mapa } from "../../pages/Map";
import { ModalContainer } from "../Modal";
import { FormUser } from "../Forms";


export const ProfileInfo = () => {
    const { user } = useUser();
    const { newPassword, onInputChange, onResetForm } = useForm({
        newPassword: ''
    });

    //👇 State variables
    const [open, setOpen] = useState(false);
    const [emprendimiento, setEmprendimiento] = React.useState('')


    //👇 useEffects
    useEffect(() => {
        async function getEmprendimiento(id, token) {
            await fetch(`http://localhost:3000/emprendimiento/byUser/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => setEmprendimiento(data))
        }

        if(user.rol_name == 'Emprendedor') {
            getEmprendimiento(user.user_id, user.token)
        }
    }, [])

    //👇 Handlers

    const udpdateInfo = (e) => {
        e.preventDefault();
        if (validatePassword(newPassword) === undefined) {
            const data = {
                user_id: user?.user_id,
                password: newPassword
            }
            updateCreate(RESOURCES.ENDPOINTS.USUARIOS.BASE, data, METHODS.PUT)
                .then(data => {
                    console.log(data);
                    handleCloseModal()
                    onResetForm();
                }
                )
                .catch(err => console.log(err))
        } else console.log(validatePassword(newPassword));
    }

    return (
        <section className="flex" style={{ width: '90%' }}>
            <main className="shadow justify-center" style={{ margin: '1em', padding: '3em' }}>
                <div style={{ width: '15%' }}>
                    <IconButton>
                        <EditIcon />
                    </IconButton>
                </div>
                <div>
                    <img src="./src/assets/icons/user-icon.svg" width='150px' />
                </div>
                <div>
                    <h2>{user.lastName} {user.firstName}</h2>
                    <p>{user.email}</p>
                    <Chip
                        label={user.rol_name}
                        color="primary"
                        sx={{ color: 'pink' }}
                    />
                </div>
            </main>
            {user.rol_name == 'Emprendedor'
                ? <main className="shadow justify-center" style={{ margin: '1em', padding: '3em', width: '70%' }}>
                <div className="flex justify-beetwen">
                    <h2>Emprendimiento</h2>
                    <div style={{ width: '5%' }}>
                        <IconButton>
                            <EditIcon />
                        </IconButton>
                    </div>
                </div>
                <Divider />
                <div className="flex wrap" style={{ width: '100%' }}>
                    <TextField
                        labelId="demo-simple-select-standard-label"
                        label="Nombre"
                        variant="standard"
                        value={emprendimiento ? emprendimiento.razon_social : ''}
                        disabled={emprendimiento ? true : false}
                    ></TextField>
                    <Select
                        label="Rubro"
                        variant="standard"
                        value={emprendimiento ? emprendimiento.rubro : ''}
                    >
                        <MenuItem>Accesorios</MenuItem>
                    </Select>
                </div>
                <section style={{ marginTop: '2em' }}>
                    <h2>Dirección</h2>
                    <Divider />
                    <div className="flex align-center" style={{ gap: '2' }}>
                        <TextField
                            label="Calle"
                            variant="standard"
                        ></TextField>
                        <TextField
                            label="Numero"
                            variant="standard"
                            type="number"
                        ></TextField>
                        <div>
                            <IconButton id="map-button">
                                <LocationOnIcon />
                            </IconButton>
                        </div>
                    </div>
                </section>


            </main>
                
                : <p>No perfil emprendedor</p>
            
            }
            
        </section>
    )
}