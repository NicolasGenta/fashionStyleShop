import {  useId } from "react";
import { CATEGORIES } from "../../util/dictionary";
import './Filters.css';
import { useFilters } from "../../hooks/useFilters";
import { useWindowSize } from "../../hooks/useWindowSize";

export function Filters() {
    const { filters, setFilters } = useFilters();
    const { windowSize } = useWindowSize();
    const minPriceFilterId = useId();
    const categoryFilterId = useId();

    const handleChangeMinPrice = (e) =>{
        setFilters(prevState =>({
            ... prevState,
            minPrice: e.target.value
        }))
    }

    const handleChangeCategory = (e)=>{
        setFilters(prevState =>({
            ... prevState,
            category: e.target.value
        }))
    }

    return (
        <section className="filters">
            <div>
                <label htmlFor="price">Precio a partir de:</label>
                <input 
                    type="range"
                    id={ minPriceFilterId }
                    min='0'
                    max='100000'
                    onChange={ handleChangeMinPrice }
                    value={filters.minPrice}
                />
                <span>$ { filters.minPrice },00</span>
            </div>
            <div>
                <label htmlFor="category">Categoría</label>
                <select id={ categoryFilterId } onChange={ handleChangeCategory }>
                    <option value={CATEGORIES.ALL_CATEGORY}>Todos</option>
                    <option value={CATEGORIES.WOMEN_CATEGORY}>{CATEGORIES.WOMEN_CATEGORY}</option>
                    <option value={CATEGORIES.MENS_CATEGORY}>{CATEGORIES.MENS_CATEGORY}</option>
                    <option value={CATEGORIES.ACCESSORIES_CATEGORY}>{CATEGORIES.ACCESSORIES_CATEGORY}</option>
                    <option value={CATEGORIES.KIDS_CATEGORY}>{CATEGORIES.KIDS_CATEGORY}</option>
                </select>
            </div>
        </section>
    )
}