export const APP_PROFILES = Object.freeze({
    DEFAULT_PROFILE: "Default",
    EMPRENDEDOR_PROFILE: "Emprendedor",
    CLIENT_PROFILE: "Cliente",
    ADMIN_PROFILE: "Administrador",
});

export const APP_MESSAGES = Object.freeze({
    FREE_DELIVERY: `ENVÍO GRATIS DESDE $30.000`,
    BUTTON_ADD_TO_CART: 'LO QUIERO',
    BUTTON_REMOVE_TO_CART: 'QUITAR'
});

export const RESOURCES = Object.freeze({
    API_URL: "http://localhost:3000/",
    ENDPOINTS: {
        PRODUCTOS: 'productos/',
        USUARIOS: {
            BASE: 'user/',
            LOGIN: 'auth/login',
            REGISTER: 'user/register'
        },
        EMPRENDIMIENTOS: 'emprendimiento',
        CATEGORIAS: 'productos/categorias',
        PRECIO_MAXIMO: 'productos/maxPrecio',
        EMPRENDIMIENTO_USUARIOS: 'emprendimiento/usuario',
        PEDIDOS: {
            PEDIDOS_BY_CLIENT : 'pedidos/',
            PEDIDOS_BY_EMPRENDIMIENTO: 'pedidos/emprendimientos/'
        }
    }
});

export const STATUS = Object.freeze({
    APROBADO: 'Aprobado',
    ENTREGADO: 'Entregado',
    EN_PROCESO: 'En proceso'
})

export const METHODS = Object.freeze({
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE'
})

export const CATEGORIES = Object.freeze({
    ALL_CATEGORY: 'All',
    WOMEN_CATEGORY: 'Femenino',
    MENS_CATEGORY: 'Masculino',
    KIDS_CATEGORY: 'Niños',
    ACCESSORIES_CATEGORY: 'Accesorios',
});
