// regresa atrás

import { navigateBack } from "../router.js"; 

export const btnHistoryBack = () => {
  const btnHistoryBack = document.createElement("button");
  btnHistoryBack.className = "btn btn-regresar btn-regresar-API btn-regresar-bienvenida";
  btnHistoryBack.textContent = "Regresar";
  
  btnHistoryBack.addEventListener("click", () => {
    navigateBack();
  });

  return btnHistoryBack;
};