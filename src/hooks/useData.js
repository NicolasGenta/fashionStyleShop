import { useContext } from "react";
import { DataContext } from "../context/data";

export function useData() {
    const { datos } = useContext(DataContext);

    if(datos === undefined) throw new Error ('useData must be used within a CartProvider');
    return {datos};
}