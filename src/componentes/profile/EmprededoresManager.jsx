import React, { useEffect, useState } from 'react';
import { useData } from "../../hooks/useData";
import './emprendedoresManager.css';
import {  updateCreate } from '../../util/functions';
import { METHODS, RESOURCES } from '../../util/dictionary';
import { Pedidos } from './Pedidos';

export const EmprendedoresManager = () => {
    const { emprendimientos } = useData();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedEmprendimiento, setSelectedEmprendimiento] = useState(null);
    const [selectedEstado, setSelectedEstado] = useState(selectedEmprendimiento?.estado);

    const handleEstadoChange = (e) => {
        setSelectedEstado(e.target.value);
    };

    const getEstadoTraducido = (estado) => {
        return estado ? 'Activo' : 'Inactivo';
    };

    const handleEditClick = (emprendimiento) => {
        setSelectedEmprendimiento({ ...emprendimiento });
        setSelectedEstado(emprendimiento.estado);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setSelectedEmprendimiento(null);
        setModalVisible(false);
    };

    const sendUpdate = (e)=>{
        e.preventDefault();
        const updatedEmprendimiento = {
            ...selectedEmprendimiento,
            estado: Number(selectedEstado),
        };
        handleCloseModal();
        updateCreate(RESOURCES.ENDPOINTS.EMPRENDIMIENTOS, updatedEmprendimiento, METHODS.PUT)
        .then(data => {
            console.log(data);
            window.location.reload()
            onResetForm();
        })
    }

    return (
        <section className='box-shadow c-70'>
            <h2>Gestionar emprendimientos</h2>
            <table>
                <thead>
                    <tr className="box-shadow">
                        {emprendimientos.length > 0 &&
                            Object.keys(emprendimientos[0]).map((key, index) => (
                                <th key={index}>{key.toUpperCase()}</th>
                            ))}
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {emprendimientos.map((emprendimiento, rowIndex) => (
                        <tr key={rowIndex} className="box-shadow">
                            {Object.values(emprendimiento).map((value, colIndex) => (
                                <td key={colIndex}>
                                    {colIndex === 2
                                        ? <span className='chip-container' 
                                        style={getEstadoTraducido(value)== 'Activo'
                                        ? {backgroundColor: '#7b9968'}
                                        : {backgroundColor: '#a67872'}
                                    }>{getEstadoTraducido(value)}</span>
                                        : value}
                                </td>
                            ))}
                            <td>
                                <img
                                    src="./src/assets/icons/edit.svg"
                                    alt="Editar"
                                    onClick={() => handleEditClick(emprendimiento)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {modalVisible && selectedEmprendimiento && (
                <div className="modal-container box-shadow">
                    <h2>Actualizar estado</h2>
                    <form className="modal-content" id="form-update" onSubmit={sendUpdate}>
                        <div>
                            <label htmlFor='emprendimiento_id'>ID</label>
                            <input id='emprendimiento_id' name="emprendimiento_id" type="number" value={selectedEmprendimiento?.id} disabled readOnly/>
                        </div>
                        <div>
                            <label htmlFor='razon_social'>Nombre</label>
                            <input id='razon_social' name="razon_social" type="text" value={selectedEmprendimiento?.nombre} disabled readOnly/>
                        </div>
                        <div>
                            <label htmlFor='estado'>Estado</label>
                            <select  id="estado" name="estado" value={selectedEstado} onChange={handleEstadoChange}>
                                <option value={1}>Activo</option>
                                <option value={0}>Inactivo</option>
                            </select>
                        </div>
                        <div>
                            <button type='submit'>Enviar</button>
                            <button onClick={handleCloseModal}>Cerrar</button>
                        </div>
                    </form>
                </div>
            )}
        </section>
    );
};
