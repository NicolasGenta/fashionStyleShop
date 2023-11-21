import { useForm } from "../../hooks/useForm";
import { useUser } from "../../hooks/useUser";
import { useState } from "react";
import { APP_PROFILES, METHODS, RESOURCES } from "../../util/dictionary";
import './profileInfo.css'
import { updateCreate, validatePassword } from "../../util/functions";
export const ProfileInfo = ()=>{
    const {user} = useUser();
    const {newPassword, onInputChange, onResetForm } = useForm({
        newPassword: ''
    });
    const [modalVisible, setModalVisible] = useState(false);
    
    const handleEditClick = () => {
        setModalVisible(true);
    };
    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const udpdateInfo = (e)=>{
        e.preventDefault();
        if(validatePassword(newPassword)=== undefined){
            const data = {
                user_id: user?.user_id,
                password : newPassword}
            updateCreate(RESOURCES.ENDPOINTS.USUARIOS.BASE, data, METHODS.PUT)
            .then(data => {
                console.log(data);
                handleCloseModal()
                onResetForm();
            }
            )
            .catch(err => console.log(err))
        }else console.log(validatePassword(newPassword));
    }
    return(
        <section className="info-profile">
            <main>
                <img src="./src/assets/icons/user-icon.svg"/>
            </main>
            <main>
                <div>
                    <h2>{user?.firstName + ' '+ user?.lastName}</h2>
                    <span className="chip-container" style={user.rol_name == APP_PROFILES.ADMIN_PROFILE
                    ? {backgroundColor: '#8254a1'}
                    : user.rol_name == APP_PROFILES.CLIENT_PROFILE
                        ? {backgroundColor: '#65a6a4'}
                        : {backgroundColor: '#9c7b43'}
                    }>{user.rol_name}</span>
                </div>
                <label>Email</label>
                <input type="text" value={user.email} readOnly></input>
                <p>Password</p>
                <button onClick={handleEditClick}>Actualizar password</button>
                {user?.emprendimiento_id
                ? (
                    <main>
                        <h3>Emprendimiento</h3>
                        <div>
                            <p className="chip-container">{user.razon_social}</p>
                            <p>Rubro: {user.nombre_rubro}</p>
                        </div>
                    </main>
                ): ''}
            </main>
            {modalVisible && (
                <div className="modal-container box-shadow">
                    <h2>Actualizar password</h2>
                    <form className="modal-content" id="form-update" onSubmit={udpdateInfo}>
                        <div>
                            <label htmlFor='emprendimiento_id'>Email</label>
                            <input id='emprendimiento_id' name="emprendimiento_id" type="email" value={user.email} disabled readOnly/>
                        </div>
                        <div>
                            <label htmlFor='newPassword'>Nueva Contraseña</label>
                            <input id='newPassword' 
                            name="newPassword" 
                            type="password" 
                            onChange={onInputChange}
                            value={newPassword}
                            required/>
                        </div>
                        <div>
                            <button type='submit'>Enviar</button>
                            <button onClick={handleCloseModal}>Cerrar</button>
                        </div>
                    </form>
                </div>
            )}
        </section>
    )
}