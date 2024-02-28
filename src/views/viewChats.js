import { headerComponent } from "./../components/header.js";
//import { data } from "./../data/dataset.js";
import { footerComponent } from "./../components/footer.js";
//import { btnRegresar } from "../components/btnRegresar.js";
//import { btnChat } from "../components/btnChat.js";
//import { navigateTo } from "./../router.js";

export const viewChats = (cardActual) =>{
  console.log(typeof cardActual, cardActual.length)
  const root = document.createElement("div");

  const header = headerComponent();
  root.appendChild(header);

  const div = document.createElement("div");
  div.className = "container-all-chat";
  root.appendChild(div);

  const contenedorChat = document.createElement("div")
  contenedorChat.className = "contenedor-chat"
  div.appendChild(contenedorChat);

  if(!Array.isArray(cardActual)){
    const filmImage = document.createElement("img");
    filmImage.className = "chat-image";
    filmImage.src = cardActual.imageUrl;
    filmImage.alt = `Imagen de la película ${cardActual.name}`;
    contenedorChat.appendChild(filmImage);
  }else {
    const divImageChatGrupal = document.createElement("div");
    divImageChatGrupal.className="div-img-chat-grupal"
    cardActual.forEach(film => {
      const filmImage = document.createElement("img");
      filmImage.className = "chat-image-circle";
      filmImage.src = film.imageUrl;
      filmImage.alt = `Imagen de la película ${film.name}`;
      divImageChatGrupal.appendChild(filmImage);
      contenedorChat.appendChild(divImageChatGrupal);
    });
  }

  const historialChat = document.createElement("div");
  historialChat.className="historial-chat";
  contenedorChat.appendChild(historialChat)

  const label = document.createElement("label");
  label.setAttribute("for", "chat")
  label.className="label-chat"
  contenedorChat.appendChild(label)
  const input = document.createElement("input");
  input.className="input-chat";
  contenedorChat.appendChild(input);

  const btnEnviar = document.createElement("button");
  btnEnviar.className="btn-icon-enviar";
  input.appendChild(btnEnviar);

  const btnSalirChat = document.createElement("button");
  btnSalirChat.className = "btn btn-salir-chat";
  btnSalirChat.textContent="Salir del Chat";
  div.appendChild(btnSalirChat);

  const footer =footerComponent();
  root.appendChild(footer);

  return root
}
