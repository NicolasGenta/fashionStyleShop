import  TextField from "@mui/material/TextField"
import React from "react"
import ClearIcon from '@mui/icons-material/Clear';
export const FormUser = ({handleClose}) => {

    const userDefault = {
        firstName: '',
        lastName: '',
        email: ''
    }
    //👇 Variables de estado
    const [user, setUser] = React.useState(userDefault);

    //👇 Handlers
    const handleChange = (e) => {
        setUser((prevState) =>({
            ...prevState,
            [e.target.name] : e.target.value
        })
    )}

    return(
        <section style={{backgroundColor: 'white', padding: '2em'}} className="shadow">
            <div className="flex align-center gap-2">
                <h3>Modificar datos de usuario</h3>
                <a onClick={()=> handleClose()}>
                    <ClearIcon/>
                </a>
            </div>
            <form className="flex gap-2">
                <TextField
                name="firstName"
                label="Nombre"
                variant="standard"
                value={user.firstName}
                onChange={handleChange}
                />
                <TextField
                name="lastName"
                label="Apellido"
                variant="standard"
                value={user.lastName}
                onChange={handleChange}
                />

            </form>
        </section>
    )
}