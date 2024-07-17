export const APP_PROFILES = Object.freeze({
    DEFAULT_PROFILE: "Default",
    EMPRENDEDOR_PROFILE: "Emprendedor",
    CLIENT_PROFILE: "Cliente",
    ADMIN_PROFILE: "Administrador",
});

export const APP_TEXTS = Object.freeze({
    FREE_DELIVERY: `ENVÍO GRATIS DESDE $30.000`,
    BUTTON_ADD_TO_CART: 'LO QUIERO',
    BUTTON_REMOVE_TO_CART: 'QUITAR',
    COMPLETE_ADRESS: 'Por favor, complete la dirección a la que se le debe enviar el pedido',
    CART : 'Mi carrito',
    BUY_DATA: 'Datos de facturación',
    BUTTON_BUY: 'Comprar',
    WITHOUT_PRODUCTS: 'No hay artículos en su carrito. Por favor, añada productos para comprar',
    BUTTON_DISCOVER_PRODUCTS: 'Descubre nuestros productos'
});

export const API_URL = "https://app-a26f0285-a336-4709-8ae8-7b46f0607934.cleverapps.io/"
// export const API_URL = "http://localhost:3000/"


export const RESOURCES = Object.freeze({
    ENDPOINTS: {
        PRODUCTOS: API_URL + 'productos/',
        USUARIOS: {
            BASE: 'user/',
            REGISTER: 'user/register'
        },
        REGISTER: API_URL + 'user/register',
        LOGIN: API_URL + 'auth/login',
        IMAGE: API_URL + 'image?filename=',
        PRODUCTOS_BY_EMPRENDIMIENTO: API_URL + 'productos/byEmprendimiento/',
        EMPRENDIMIENTOS: API_URL + 'emprendimiento',
        EMPRENDIMIENTO_BY_USER: API_URL + 'emprendimiento/byUser/',
        RUBROS: API_URL + 'emprendimiento/rubros',
        CATEGORIAS: API_URL + 'productos/categorias',
        NEW_CATEGORIA : API_URL + 'emprendimiento/categorias',
        PRECIO_MAXIMO: API_URL + 'productos/maxPrecio',
        EMPRENDIMIENTO_USUARIOS: 'emprendimiento/usuario',
        UPDATE_EMPRENDIMIENTO: API_URL +'emprendimiento/updateData/',
        UPDATE_USER: API_URL + 'user/',
        PEDIDOS: API_URL + 'pedidos',
        PEDIDOS_BY_USER: API_URL + 'pedidos/usuario/'
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
