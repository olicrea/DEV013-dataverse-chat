import { home } from './views/home.js';
import { viewAPIKey } from './views/viewAPIKey.js';
import { viewBienvenida } from './views/viewBienvenida.js';
import { viewGroupChat } from './views/viewGroupChat.js';
import { setRoutes, setRootElement, onURLChange } from './router.js';
import { viewError } from './views/viewError.js';
import { viewDescriptionCard } from './views/viewDescriptionCard.js';
import { viewIndividualChat } from './views/viewIndividualChat.js';

const routes = {
  "/": home, //Home donde se ven todas las tarjetas
  "/error": viewError,
  "/viewAPIKey": viewAPIKey,
  "/chats": viewIndividualChat,
  "/groupChats": viewGroupChat,
  "/description": viewDescriptionCard,
  "/confirmar": viewBienvenida,
};

const viewContainer = document.getElementById("root");

// setRoutes toma a routes y lo lleva a routes.js y lo define dentro de routes.js como si fuera let ROUTES
setRoutes(routes);
setRootElement(viewContainer);

document.addEventListener("DOMContentLoaded", () => {
  onURLChange(window.location.pathname);
});
window.onpopstate = onURLChange;


/*
TODO:
1.- Definir rutas en router.
2.- Pasar "root element" a router.
3.- Invocar el router para renderizar la vista correcta.
*/