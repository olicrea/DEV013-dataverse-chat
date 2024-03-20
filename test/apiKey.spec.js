import { getApiKey, setApiKey } from "../src/lib/apiKeyFunction.js";

describe('getApiKey', () => {
  
  it('debería devolver el valor de la API Key', () => {
    // Desarrolla el test correspondiente aquí
    const key = "key-key";
    localStorage.setItem('apiKey', key);
    //console.log(getApiKey() === "key-key");
    expect(getApiKey()).toBe(key);
  });
});

describe('setApiKey', () => {

  it('debería establecer correctamente la API Key', () => {
    // Desarrolla el test correspondiente aquí
    const newKey = "Nueva-key-key";
    setApiKey(newKey);
    //console.log(localStorage.getItem('apiKey') === "Nueva-key-key");
    expect(localStorage.getItem('apiKey')).toBe(newKey);
  });
});
