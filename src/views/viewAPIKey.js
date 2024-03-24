import { headerComponent } from "./../components/header.js";
import { footerComponent } from "./../components/footer.js";
import { btnHistoryBack } from "../components/btnSalirdelChat.js";
import { navigateTo } from "./../router.js";
import { setApiKey } from "./../lib/apiKeyFunction.js";

export const viewAPIKey = () => {
  const root = document.createElement("div")

  const header = headerComponent();
  root.appendChild(header);

  const div = document.createElement("div");
  div.className = "container-api-key";
  root.appendChild(div);

  const label = document.createElement("label");
  label.setAttribute("for", "api-key");
  div.appendChild(label);

  const divInput = document.createElement("div");
  div.appendChild(divInput);
  const input = document.createElement("input");
  input.id = "api-key";
  input.type = "text";
  input.value = "";
  input.placeholder = "Ingresa tu API Key";
  divInput.appendChild(input);

  const btnConfirmar = document.createElement("button");
  btnConfirmar.className = "btn btn-confirmar";
  btnConfirmar.textContent = "Confirmar"; // Agregar texto al botón
  div.appendChild(btnConfirmar);
  btnConfirmar.addEventListener("click", () => {
    // Validar API. Si es correcta, dirigir a la vista de bienvenida. Sino, mostrar elemento con API errónea
    const apiKey = input.value;
    if (apiKey) {
      setApiKey(apiKey);
      navigateTo(`/confirmar`);
    } else {
      errorElement.textContent = "*Campo obligatorio";
      errorElement.classList.add("required"); 
      divInput.appendChild(errorElement);
    }
  });

  const errorElement = document.createElement("div");
  errorElement.id = "error-message";
  div.appendChild(errorElement);

  const btnExitChat = btnHistoryBack();
  div.appendChild(btnExitChat);
  btnExitChat.addEventListener("click", () => {
  })

  const footer = footerComponent();
  root.appendChild(footer);

  return root
} 
