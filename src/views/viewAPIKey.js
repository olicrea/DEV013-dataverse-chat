import { headerComponent } from "./../components/header.js";
import { footerComponent } from "./../components/footer.js";
import { btnRegresar } from "../components/btnRegresar.js";
import { navigateTo } from "./../router.js";
export const viewAPIKey = () =>{
  const root = document.createElement("div")
  
  const header = headerComponent();
  root.appendChild(header);

  const div = document.createElement("div");
  div.className = "container-api-key";
  root.appendChild(div);

  const label =document.createElement("label");
  label.setAttribute("for", "api-key");
  div.appendChild(label);

  const input = document.createElement("input");
  input.id = "api-key";
  input.type = "text";
  input.value = "";
  input.placeholder = "Ingresa tu API Key";
  div.appendChild(input);

  const btnConfirmar = document.createElement("button");
  btnConfirmar.className = "btn btn-confirmar";
  btnConfirmar.textContent = "Confirmar"; // Agregar texto al botón
  div.appendChild(btnConfirmar);
  btnConfirmar.addEventListener("click", () => {
    // Validar API. Si es correcta, dirigir a la vista de bienvenida. Sino, mostrar elemento con API errónea
    navigateTo(`/confirmar`);
  });
  

  const botonRegresar = btnRegresar();
  div.appendChild(botonRegresar);
  botonRegresar.addEventListener("click", () => {
    navigateTo(`/`)
  })

  const footer = footerComponent();
  root.appendChild(footer);

  return root
} 
