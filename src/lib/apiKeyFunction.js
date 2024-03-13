export const getApiKey = () => {
  // Implementa el código para obtener la API KEY desde Local Storage
  return localStorage.getItem("apiKey");
};

export const setApiKey = (key) => {
  // Implementa el código para guardar la API KEY en Local Storage
  return localStorage.setItem("apiKey", key);
};




