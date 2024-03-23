// regresa a home
export const btnRegresar = () => {
  const btnRegresar = document.createElement("button");
  btnRegresar.className = "btn btn-regresar btn-regresar-API btn-regresar-bienvenida";
  const textBoton = document.createTextNode("Regresar");
  btnRegresar.appendChild(textBoton)
  return btnRegresar
};
