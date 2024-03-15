//File with the URLs of elements/components necessary for the functioning of other components

//React Router DOM 
import { useNavigate } from 'react-router-dom';

//Styles and utilities
import './componentes/registro/auth.css';
import { METHODS, RESOURCES } from './util/dictionary';
import { updateCreate, convertFormToObject, setRoute } from './util/functions';

//Personalized hooks
import { useUser } from './hooks/useUser';
import { useForm } from './hooks/useForm';
import { useWindowSize } from './hooks/useWindowSize';

//Personalized components
import { Message } from './componentes/registro/message';
import { NavForm } from './componentes/registro/NavForm';

export {
    useNavigate,
    METHODS,
    RESOURCES,
    updateCreate,
    convertFormToObject,
    setRoute,
    useUser,
    useForm,
    useWindowSize,
    NavForm,
    Message
}