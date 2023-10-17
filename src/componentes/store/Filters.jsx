import { useState } from "react";
import { CATEGORIES } from "../../util/dictionary";
import './Filters.css';
export function Filters() {
    const [ minPrice, setMinPrice ] = useState(0);

    const handleChangeMinPrice = (e) =>{
        setMinPrice(e.target.value)
    }

    return (
        <section className="filters">
            <div>
                <label htmlFor="price">Precio a partir de:</label>
                <input 
                    type="range"
                    id="price"
                    min='0'
                    max='1000'
                    onChange={handleChangeMinPrice}
                />
                <span>$ {minPrice}</span>
            </div>
            <div>
                <label htmlFor="category">Categoría</label>
                <select>
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