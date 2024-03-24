import { headerComponent } from "./../components/header.js";
import { data } from "./../data/dataset.js";
import { footerComponent } from "./../components/footer.js";
import { communicateWithOpenAI } from "../lib/openAIApi.js";
//import { btnRegresar } from "../components/btnRegresar.js";
import { btnHistoryBack } from "../components/btnSalirdelChat.js";
import { navigateTo } from "../router.js";

export const viewIndividualChat = (cardId) => {

  //Encontrar los datos de la tarjeta actual
  const cardActual = data.find((card) => card.id === cardId.name);

  //Crear contenedor raíz y agregarle header
  const root = document.createElement("div");
  const header = headerComponent();
  root.appendChild(header);

  const div = document.createElement("div");
  div.className = "container-container"
  root.appendChild(div);

  //Crear el contenedor del chat
  const containerChat = document.createElement("div");
  containerChat.className = "container-chat";
  div.appendChild(containerChat);

  //Crear un nuevo div para la imagen y la descripción
  const imageAndDescription = document.createElement("div");
  imageAndDescription.className = "image-and-description";
  div.appendChild(imageAndDescription);

  //Crear la imagen de la película
  const filmImage = document.createElement("img");
  filmImage.className = "chat-image";
  filmImage.src = cardActual.imageUrl;
  filmImage.alt = `Imagen de la película ${cardId.name}`;
  imageAndDescription.appendChild(filmImage);

  //Crear un nuevo div para la descripción
  const descriptionDiv = document.createElement("div");
  descriptionDiv.className = "description-div";
  imageAndDescription.appendChild(descriptionDiv);

  const descriptionCardId = document.createElement("p");
  descriptionCardId.className = "name-movie-description";
  descriptionCardId.innerHTML = `${cardActual.name}`
  descriptionDiv.appendChild(descriptionCardId); 

  //Crear un segundo párrafo para la descripción corta
  const shortDescription = document.createElement("p");
  shortDescription.className = "short-description";
  shortDescription.innerHTML = `${cardActual.shortDescription}`;
  descriptionDiv.appendChild(shortDescription);

  //Crear div que contendrá el historial del chat con preguntas y respuestas
  const recordChat = document.createElement("div");
  recordChat.className = "record-chat";
  containerChat.appendChild(recordChat)

  //párrafo para reflejar pregunta en el historial
  const pQuestion = document.createElement("p");
  pQuestion.className = "question";

  //párrafo para reflejar respuesta en el historial
  const pAnswer = document.createElement("p");
  pAnswer.className = "answer";

  //Crear el espacio para que el usuario pregunte. Form:crea formulario - label: le da la etiqueta - textarea: crea el campo
  const form = document.createElement("form");
  form.className = "form-chat";
  containerChat.appendChild(form);

  const label = document.createElement("label");
  label.setAttribute("for", "chat")
  label.className = "label-chat"
  form.appendChild(label);

  const textarea = document.createElement("textarea");
  textarea.className = "input-chat";
  textarea.id = "chat";
  textarea.placeholder = `Escríbele a ${cardActual.name}...`;
  form.appendChild(textarea);

  //Crear un botón para enviar pregunta
  const submitButton = document.createElement("input");
  submitButton.className = "btn icon-submit";
  submitButton.type = "submit";
  submitButton.id = "icon-submit";
  submitButton.value = "Enviar";
  form.appendChild(submitButton);

  //Agregar el evento al darle click a enviar la pregunta
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const questionDiv = document.createElement("div");
    questionDiv.className = "question";
    questionDiv.innerHTML = `<strong>Tu:</strong> ${textarea.value}`;
    recordChat.appendChild(questionDiv);

    // Llamada a la API de OpenAI
    communicateWithOpenAI(textarea.value, cardId)
      .then(response => response.json())
      .then(data => {
        const answerDiv = document.createElement("div");
        answerDiv.className = "answer";
        answerDiv.innerHTML = `<strong>${cardActual.name}:</strong> ${data.choices[0].message.content}`;
        recordChat.appendChild(answerDiv);
      })
      .catch(error => {
        console.log(error);
        const errorDiv = document.createElement("div");
        errorDiv.className = "answer";
        errorDiv.textContent = "Error al obtener respuesta de la IA. Considera reingresar tus credenciales en el apartado: API Key.";
        errorDiv.style.fontWeight = "bold";
        errorDiv.style.color = "red";
        recordChat.appendChild(errorDiv);
      })
      .finally(() => {
        recordChat.scrollTop = recordChat.scrollHeight;
        // Vaciar el textarea después de procesar la respuesta de la API
        textarea.value = "";
      });
  });

  const divBack = document.createElement("div");
  divBack.className = "container-btn-back"
  root.appendChild(divBack);

  //Crear un botón para salir del chat y volver a home
  const btnExitChat = btnHistoryBack();
  divBack.appendChild(btnExitChat);
  btnExitChat.addEventListener("click", () => {
  })

  //Agregar footer al contenedor raíz
  const footer = footerComponent();
  root.appendChild(footer);

  return root;
}
