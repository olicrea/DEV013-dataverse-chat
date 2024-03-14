import { headerComponent } from "../components/header.js";
import { data } from "../data/dataset.js";
import { footerComponent } from "../components/footer.js";
import { communicateWithOpenAI } from "../lib/openAIApi.js";
import { btnRegresar } from "../components/btnRegresar.js";
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

  //Crear div que contendrá el historial del chat con preguntas y respuestas
  const recordChat = document.createElement("div");
  recordChat.className = "record-chat";
  containerChat.appendChild(recordChat)

  //párrafo para reflejar pregunta en el historial
  const pQuestion = document.createElement("p");
  pQuestion.className = "question";
  recordChat.appendChild(pQuestion);

  //párrafo para reflejar respuesta en el historial
  const pAnswer = document.createElement("p");
  pAnswer.className = "answer";
  recordChat.appendChild(pAnswer);

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
  submitButton.textContent = "Enviar";
  form.appendChild(submitButton);

  //Agregar el evento al darle click a enviar la pregunta
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const textareaMessage = textarea.value;

    // Limpiar el historial de preguntas y respuestas
    pQuestion.innerHTML = "";
    pAnswer.innerHTML = "";

    // Llamada a la API de OpenAI para cada película en data
    data.forEach((card) => {
      communicateWithOpenAI(textareaMessage, card)
        .then((response) => response.json())
        .then((data) => {
          pQuestion.innerHTML = `${textareaMessage}`;
          pAnswer.innerHTML += `${card.name}:<br>${data.choices[0].message.content}<br>`;
        })
        .catch((error) => {
          console.log(error);
          pAnswer.innerHTML += "Error al obtener respuesta de la IA<br>";
        })
        .finally(() => {
          // Vaciar el textarea después de procesar la respuesta de la API
          textarea.value = "";
        });
    });
  });

  //Crear un botón para salir del chat y volver a home
  const btnExitChat = btnRegresar();
  div.appendChild(btnExitChat);
  btnExitChat.addEventListener("click", () => {
    navigateTo(`/`)
  })

  //Agregar footer al contenedor raíz
  const footer = footerComponent();
  root.appendChild(footer);

  return root;
}
