import { useId } from "react";
import { CATEGORIES } from "../../util/dictionary";
import './Filters.css';
import { useFilters } from "../../hooks/useFilters";
import { useData } from "../../hooks/useData";

export function Filters() {
    const { filters, setFilters } = useFilters();
    const minPriceFilterId = useId();
    const categoryFilterId = useId();
    const { emprendimientos, categorias, maxPrecio } = useData();
    console.log(maxPrecio);
    const handleChangeMinPrice = (e) => {
        setFilters(prevState => ({
            ...prevState,
            minPrice: e.target.value
        }))
    }

    const handleChangeCategory = (e) => {
        setFilters(prevState => ({
            ...prevState,
            category: e.target.value
        }))
    }

    const handleChangeEmprendimiento = (e) => {
        setFilters(prevState => ({
            ...prevState,
            emprendimiento: e.target.value
        }))
    }

    return (
        <section className="filters">
            <h3>Tienda</h3>
            <div>
                <label htmlFor="price">Precio a partir de:</label>
                <input
                    type="range"
                    id={minPriceFilterId}
                    min='0'
                    max={maxPrecio}
                    onChange={handleChangeMinPrice}
                    value={filters.minPrice}
                />
                <span>$ {filters.minPrice},00</span>
            </div>
            <div>
                <label htmlFor="category">Categoría</label>
                <select id={categoryFilterId} onChange={handleChangeCategory}>
                    <option value={CATEGORIES.ALL_CATEGORY}>Todos</option>
                    {categorias.map(categoria => {
                        return <option key={categoria.id}
                            value={categoria.nombre_categoria}>{categoria.nombre_categoria}</option>
                    })}
                </select>
            </div>
            <div>
                <label htmlFor="category">Emprendimiento</label>
                <select id={categoryFilterId} onChange={handleChangeEmprendimiento}>
                    <option value={CATEGORIES.ALL_CATEGORY}>Todos</option>
                    {emprendimientos.map(emprendimiento => {
                        if(emprendimiento.estado)
                        return <option
                            key={emprendimiento.nombre}
                            value={emprendimiento.nombre}
                        >{emprendimiento.nombre}</option>
                    })}
                </select>
            </div>
        </section>
    )
}