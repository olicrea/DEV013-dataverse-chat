import { headerComponent } from "./../components/header.js";
import { data } from "./../data/dataset.js";
import { footerComponent } from "./../components/footer.js";
import { btnRegresar } from "../components/btnRegresar.js";
import { navigateTo } from "./../router.js";
//cardId es un parámetro que se envía desde el home en el escuchador de click de las tarjetitas, este corresponde al id de la tarjeta clickeada 
export const viewDescriptionCard = (cardId) => {
  console.log("card id: " + cardId)

  //se extrae del array de objetos, data, el elemento que coincida se pasará a las funciones de renderizado 
  const cardActual = data.find((card) => card.id === cardId.name);
  console.log("card array: ", cardActual);
  const root = document.createElement("div");

  const viewHeader = headerComponent();
  root.appendChild(viewHeader);

  const div = document.createElement("div");
  div.className = "container-all-description";
  root.appendChild(div);

  const divCard = document.createElement("div");
  divCard.className = "div-card";
  div.appendChild(divCard)

  const imageFilm = createImg(cardActual);
  divCard.appendChild(imageFilm);

  const descriptionCardShort = descriptionCard(cardActual);
  divCard.appendChild(descriptionCardShort);

  const descriptionCardAll = descriptionCard2(cardActual);
  divCard.appendChild(descriptionCardAll);

  const divBotones = document.createElement("div");
  divBotones.className = "div-botones";
  div.appendChild(divBotones);

  const botonRegresar = btnRegresar();
  divBotones.appendChild(botonRegresar)

  const btnChat = document.createElement("button");
  btnChat.className = "btn btn-chat";

  const textBoton = document.createTextNode("Chatear");
  btnChat.appendChild(textBoton);

  divBotones.appendChild(btnChat);

  const footer = footerComponent();
  root.appendChild(footer);

  //botones, Objeto a cambio byn---> Chat Grupal
  botonRegresar.addEventListener("click", () => {
    navigateTo(`/`)
  });
  //const btnChatgrupal = document.querySelector(".btn-chat-grupal");
  btnChat.addEventListener("click", () => {
    //const filmId = card 
    navigateTo(`/chats`, { name: cardActual.id });
  });
  //console.log(root)
  return root
};

function createImg(film) {
  //console.log(film)
  const filmImage = document.createElement("img");
  filmImage.className = "film-image";
  filmImage.src = film.imageUrl;
  filmImage.alt = `Imagen de la película ${film.name}`;
  return filmImage;
}

function descriptionCard(film) {
  const descriptionCardHTML = document.createElement("ul");
  descriptionCardHTML.className = "list-description-short"
  const html = ` 
        <li class="card-description-short" itemscope itemtype="movie">
        <dl class="movie-description-short">
          <dt></dt><dd class="name-movie-description" itemprop="name"><strong>${film.name}</strong></dd>
          <dt></dt><dd class= "info-movie" itemprop="shortDescription">${film.shortDescription}</dd>
          <dt></dt><dd itemprop="genreMovie"><strong>Género: </strong>${film.facts.genreMovie}</dd>
        </dl>
      </li>
    `;
  descriptionCardHTML.innerHTML = html;
  return descriptionCardHTML
}

function descriptionCard2(film) {
  const descriptionCardHTML = document.createElement("div");
  descriptionCardHTML.className = "description-card";

  // Primera lista
  const list1 = document.createElement("ul");
  list1.className = "list-description-all";
  list1.innerHTML = `
    <li class="card-description-all" itemscope itemtype="movie">
      <dl>
        <dt></dt><dd class="year-movie-description" itemprop="yearMovie"><strong>Año de lanzamiento: </strong>${film.facts.yearMovie}</dd>
        <dt></dt><dd class= "director-movie" itemprop="directorMovie"><strong>Director: </strong>${film.facts.directorMovie}</dd>
        <dt></dt><dd itemprop="productionCompany"><strong>Compañia de Producción: </strong>${film.facts.productionCompany}</dd>
        <dt></dt><dd itemprop="rottenTomatoesScore"><strong>Puntuación RottennTomatoes: </strong>${film.extraInfo.rottenTomatoesScore}</dd>
        <dt></dt><dd itemprop="countryMovie"><strong>País: </strong>${film.extraInfo.countryMovie}</dd>
        <dt></dt><dd itemprop="durationMovie"><strong>Duración: </strong>${film.extraInfo.durationMovie}</dd>
      </dl>
    </li>
  `;

  // Segunda lista
  const list2 = document.createElement("p");
  list2.className = "list-description-all";
  list2.innerHTML = `
    
      <dl>
        <dt></dt><dd class= "description" itemprop="description"><strong>Descripción: </strong><br>${film.description}</dd>
      </dl>
  `;
  // Agregar las listas al contenedor principal
  descriptionCardHTML.appendChild(list1);
  descriptionCardHTML.appendChild(list2);

  return descriptionCardHTML;
}

