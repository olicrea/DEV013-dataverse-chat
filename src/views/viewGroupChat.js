import { headerComponent } from "../components/header.js";
import { data } from "../data/dataset.js";
import { footerComponent } from "../components/footer.js";
import { communicateWithOpenAI } from "../lib/openAIApi.js";
//import { btnRegresar } from "../components/btnRegresar.js";
import { btnHistoryBack } from "../components/btnSalirdelChat.js";

import { navigateTo } from "../router.js";

export const viewGroupChat = () => {

  //Crear contenedor raíz y agregarle header
  const root = document.createElement("div");
  const header = headerComponent();
  root.appendChild(header);

  const div = document.createElement("div");
  div.className = "container-container"
  root.appendChild(div);

  // Crear el contenedor del chat
  const containerChat = document.createElement("div");
  containerChat.className = "container-chat";
  div.appendChild(containerChat);

  const imgsGroup = document.createElement("div");
  imgsGroup.className = "imgs-group";
  div.appendChild(imgsGroup);
  data.forEach((film) => {
    const filmImage = document.createElement("img");
    filmImage.className = "chat-image-circle";
    filmImage.src = film.imageUrl;
    filmImage.alt = `Imagen de la película ${film.name}`;
    filmImage.title = film.name;
    imgsGroup.appendChild(filmImage);
  });

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
  textarea.placeholder = `¡Escríbele a tus films favoritos!`;
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
    const textareaMessage = textarea.value;

    const questionDiv = document.createElement("div");
    questionDiv.className = "question";
    questionDiv.innerHTML = `<strong>Tu:</strong> ${textarea.value}`;
    recordChat.appendChild(questionDiv);

    // Limpiar el historial de preguntas y respuestas
    // pQuestion.innerHTML = "";
    // pAnswer.innerHTML = "";

    recordChat.scrollTop = recordChat.scrollHeight;
    let errorDisplayed = false;
    // Llamada a la API de OpenAI para cada película en data 
    data.forEach((card) => {
      communicateWithOpenAI(textareaMessage, card)
        .then((response) => response.json())
        .then((data) => {
          const answerDiv = document.createElement("div");
          answerDiv.className = "answer";
          answerDiv.innerHTML += `<strong>${card.name}:</strong> ${data.choices[0].message.content}`;
          recordChat.appendChild(answerDiv);
          pQuestion.innerHTML = `${textareaMessage}`;
        })
        .catch((error) => {
          if (!errorDisplayed) {
            console.log(error);
            const errorDiv = document.createElement("div");
            errorDiv.className = "answer";
            errorDiv.textContent = "Error al obtener respuesta de la IA. Considera reingresar tus credenciales en el apartado: API Key.";
            errorDiv.style.fontWeight = "bold";
            errorDiv.style.color = "red";
            recordChat.appendChild(errorDiv);
            errorDisplayed = true;
          }
          // pAnswer.innerHTML += "Error al obtener respuesta de la IA<br>";
        })
        .finally(() => {
          // Vaciar el textarea después de procesar la respuesta de la API
          textarea.value = "";
        });
    });
  });

  const divBack = document.createElement("div");
  divBack.className = "container-btn-back"
  root.appendChild(divBack);

  //Crear un botón para salir del chat e ir atrás
  const btnExitChat = btnHistoryBack();
  divBack.appendChild(btnExitChat);
  btnExitChat.addEventListener("click", () => {
  })

  //Agregar footer al contenedor raíz
  const footer = footerComponent();
  root.appendChild(footer);

  return root;
}
