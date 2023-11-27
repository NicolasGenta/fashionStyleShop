import { APP_PROFILES, RESOURCES } from "./dictionary";

// 👇 Función que envía la petición GET al endpoint a la API
export async function getData(endpoint){
    try{
        const res = await fetch(RESOURCES.API_URL+endpoint);
        if (!res.ok) {
            throw new Error('Error al procesar los datos')
        }
        const data = await res.json();
        return data;
    }catch(err){
        throw new Error('Error al procesar los datos:' + err.message);
    }
};

// 👇 Función que realiza metodo post a la API para el envio de datos
export const updateCreate = async (endpoint, data, method) =>{
    try {
        const res = await fetch(RESOURCES.API_URL+endpoint, {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(!res.ok) throw new Error(console.log(res.message));
        const parsed = await res.json()
        return parsed;
    }catch(err) {
        throw new Error(err)
    }
}

export const deleteResource = async (endpoint, method, id)=>{
    try {
        const res = await fetch(RESOURCES.API_URL+endpoint+id, {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
        })
        if(!res.ok) throw new Error(console.log(res.message));
        const parsed = await res.json()
        return parsed;
    }catch(err) {
        throw new Error(err)
    }
}


// 👇 Funcion que devuelve la ruta del panel por defecto según el rol
export function setRoute(rol) {
    switch (rol){
        case APP_PROFILES.ADMIN_PROFILE:
            return "/admin";
        case APP_PROFILES.CLIENT_PROFILE:
            return "/client";
        case APP_PROFILES.EMPRENDEDOR_PROFILE:
            return "/emprendedor"
        default:
            return "/"
    }
}
// 👇 Funcion que valida que el input[type="text"] no sea vacío ni contenga numeros
export const validateName = (name)=>{
    if(!(!!name && /^[A-Za-z]+$/.test(name))) return 'El nombre y el apellido no puede estar vacio o contener numeros o caracteres especiales';
    else return undefined
}
// 👇 Función que valida que la contraseña contenga mayusculas, minusculas, numeros y caracteres especiales
export const validatePassword = (pass)=>{
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$._!%*?&])(?=.*[a-zA-Z]).{6,}$/;
    if(!(!!pass && passwordRegex.test(pass))) return 'La contraseña debe ser de mas de 6 caracteres, debe contener mayuscula, minuscula, numeros y algun caracter especial(@$._!%*?&)';
    else return undefined;
}

// 👇 Función que valida el formulario de registro
export const validateFormRegister = (formData )=>{
    const firstName = formData.get('firstName')
    const lastName = formData.get('lastName')
    const pass = formData.get('password')

    const validateFirstName = validateName(firstName);
    const validateLastName = validateName(lastName);
    const validatePass = validatePassword(pass);

    if(validateFirstName) console.log(validateFirstName)
    if(validateLastName) console.log(validateLastName)
    if(validatePass) console.log(validatePass)

    if(!validateFirstName && !validateLastName && !validatePass) return undefined;
    else return 'Fomulario no valido'
}
// 👇 Función que convierte un formData con datos de un formulario en un objeto
export const convertFormToObject = (formData)=> {
    const datos = {}
    formData.forEach((valor, clave)=>{
        datos[clave] = valor;
    })

    return datos
}

export const changeDateDB =(date)=> {
    const fecha= new Date(date);
    const year = fecha.getFullYear();
    const month = fecha.getMonth() + 1;
    const day = fecha.getDate();

    return `${day + '/'+ month + '/' + year}`
}




