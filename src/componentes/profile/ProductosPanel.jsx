import { useUser } from '../../hooks/useUser';
import { useForm } from "../../hooks/useForm";
import '../../index.css';
import './productosPanel.css'
import { METHODS, RESOURCES } from '../../util/dictionary';
import './pedidos.css';
import { useEffect, useState } from 'react';
import { deleteResource, getData, updateCreate } from '../../util/functions';
import { useData } from '../../hooks/useData';

export const ProductosPanel = ()=>{
    const {user} = useUser();
    const {categorias} = useData();
    const queryUrl = `?idUsuario=${user.user_id}`;
    const {id, nombre_producto, descripcion, precio, url, categoria, onInputChange} = useForm({
        id: null,
        nombre_producto: null,
        descripcion: null,
        precio: null,
        url: null,
        categoria: null
    });

    const [productos, setProductos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [productSelected, setProductSelected] = useState(null)

    const handleEditClick = (producto) => {
        if(producto === undefined) setProductSelected(null)
        else setProductSelected({...producto})
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setProductSelected(null)
        setModalVisible(false);
    };
    useEffect(() => {
        getData(RESOURCES.ENDPOINTS.EMPRENDIMIENTO_USUARIOS + queryUrl)
            .then(data => {
                console.log(data);
                setProductos(data)
            })
            .catch(error => {
                console.log("Se ha producido un error", error);
            });
    }, []);

    const sendUpdate = (e) =>{
        e.preventDefault();
        const product = {
            id: id ?  id  : productSelected ?  productSelected.ID  : 0 ,
            nombre: nombre_producto ? nombre_producto : productSelected.Producto,
            descripcion: descripcion ? descripcion : productSelected.Descripción,
            precio: precio ? Number(precio) : productSelected.Precio,
            img: url ? url : productSelected.Imagen,
            category: productSelected ? productSelected.Categoria : categoria,
            emprendimiento: user.emprendimiento_id
        }
        console.log(JSON.stringify(product))
        console.log(RESOURCES.ENDPOINTS.PRODUCTOS + (productSelected ? productSelected.ID : ''), productSelected ? METHODS.PUT : METHODS.POST);
        updateCreate(RESOURCES.ENDPOINTS.PRODUCTOS +(productSelected ? productSelected.ID : ''),product,productSelected ? METHODS.PUT : METHODS.POST)
        .then( 
            window.location.reload()
        )
        .catch(err => console.log(err))
    }


    const deleteProduct = () =>{
        console.log(productSelected.ID);
        deleteResource(RESOURCES.ENDPOINTS.PRODUCTOS, METHODS.DELETE, productSelected.ID)
        .then(data => {
            console.log(data)
            window.location.reload()
        })
    }


    return(
        <section className='box-shadow c-70'>
            <div>
                <h2>Gestionar productos</h2>
                <button onClick={() => handleEditClick()}>Nuevo</button>
            </div>
            <table>
                <thead>
                    <tr className="box-shadow">
                        {productos.length > 0 &&
                            Object.keys(productos[0]).map((key, index) => (
                                <th key={index}>{key.toUpperCase()}</th>
                            ))}
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto, rowIndex) => (
                        <tr key={rowIndex} className="box-shadow">
                            {Object.values(producto).map((value, colIndex) => (
                                <td key={colIndex}>
                                    {colIndex === 4
                                    ? <img src={value} style={{width:'40%'}}/>
                                    : value
                                    }
                                </td>
                            ))}
                            <td>
                                <img
                                    src="./src/assets/icons/edit.svg"
                                    alt="Editar"
                                    onClick={() => handleEditClick(producto)}
                                />
                                <img
                                    src="./src/assets/icons/trash.svg"
                                    alt="Borrar"
                                    onClick={() => {
                                        setProductSelected(producto)
                                        deleteProduct()}}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {modalVisible && (
                <div className="modal-container box-shadow">
                    <h2>{(productSelected)
                    ? 'Actualizar Producto'
                    : 'Nuevo Producto'}
                    </h2>
                    <form className="modal-content" id="form-update" onSubmit={sendUpdate}>
                        <div>
                            <label htmlFor='id'>Id</label>
                            <input id='id' name="id" type="number" 
                            value={productSelected
                            ? productSelected.ID
                            :""} 
                            onChange={onInputChange}
                            disabled readOnly/>
                        </div>
                        <div>
                            <label htmlFor='nombre_producto'>Nombre del producto</label>
                            <input id='nombre_producto' 
                            name="nombre_producto" 
                            type="text" 
                            onChange={onInputChange}
                            value={nombre_producto ?  nombre_producto : productSelected?.Producto}
                            required/>
                        </div>
                        <div>
                            <label htmlFor='descripcion'>Descripción</label>
                            <textarea id='descripcion'
                            name="descripcion" 
                            type="text" 
                            onChange={onInputChange}
                            value={descripcion ? descripcion : productSelected?.Descripción}
                            required/>
                        </div>
                        <div>
                            <label htmlFor='precio'>Precio</label>
                            <input id='precio' 
                            name="precio" 
                            type="number" 
                            onChange={onInputChange}
                            value={precio ? precio : productSelected?.precio}
                            required/>
                        </div>
                        <div>
                            <label htmlFor='url'>URL Imagen</label>
                            <input id='url' 
                            name="url" 
                            type="url" 
                            value={url ? url : productSelected?.Imagen}
                            onChange={onInputChange}
                            required/>
                        </div>
                        <div>
                            <label htmlFor='categoria'>Categoria</label>
                            <select name='categoria' id='categoria' onChange={onInputChange} value={productSelected ? productSelected.Categoria : categoria}>
                                {categorias.map(categoria =>(<option value={categoria.nombre_categoria}>{categoria.nombre_categoria}</option>))}
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
    )
}