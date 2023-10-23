import { RESOURCES } from "./dictionary";

// 👇 Función que envía la petición al endpoint a la API
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

// 👇 Función que realiza metodo post a la API para autenticacion
export async function getAuthentication(user, pass){
    try{
        const res = await fetch(RESOURCES.AUTHENTICATION_API,{
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
        })
        if(!res.ok) throw new Error('Error al efetuar la autenticacion');
        const parsed = await res.json();
        return parsed;
    }catch(err){
        throw new Error(err)
    }
}



