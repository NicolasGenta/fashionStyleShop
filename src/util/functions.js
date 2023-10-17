//Función que envía la petición al endpoint a la API
export async function getData(url){
    try{
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Error al procesar los datos')
        }
        const data = await res.json();
        return data;
    }catch(err){
        throw new Error('Error al procesar los datos:' + err.message);
    }
};




