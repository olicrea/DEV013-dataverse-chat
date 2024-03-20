export const getApiKey = () => {
  // Implementa el código para obtener la API KEY desde Local Storage
  const apiKey = localStorage.getItem("apiKey");
  return apiKey;

};

export const setApiKey = (key) => {
  // Implementa el código para guardar la API KEY en Local Storage
  localStorage.setItem("apiKey", key);

};
