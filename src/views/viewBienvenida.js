import { headerComponent } from "./../components/header.js";
import { footerComponent } from "./../components/footer.js";
import { btnHistoryBack } from "../components/btnSalirdelChat.js";
import { navigateTo } from "./../router.js";

export const viewBienvenida = () =>{
  const root = document.createElement("div");
  root.className="ingreso"

  const header = headerComponent();
  root.appendChild(header);

  const div = document.createElement("div");
  div.className="contenedor";
  root.appendChild(div);

  const bienvenida = document.createElement("h1");
  bienvenida.className="bienvenida"
  bienvenida.textContent="Bienvenida";
  div.appendChild(bienvenida)

  const validacionTrue = document.createElement("h2");
  validacionTrue.className="validacion validacion-correcta";
  validacionTrue.textContent="API Key ingresada con éxito";
  div.appendChild(validacionTrue);

  const validacionFalse = document.createElement("h2");
  validacionFalse.className="validacion validacion-false"
  validacionFalse.textContent="API Key incorrecta"

  const btnExitChat = btnHistoryBack();
  div.appendChild(btnExitChat);
  btnExitChat.addEventListener("click", () => {
    window.history.back();
  })

  const footer = footerComponent();
  root.appendChild(footer);
  
  return root  
}