import { footerComponent } from "../src/components/footer.js";
import { headerComponent } from "../src/components/header.js";
import * as routerModule from "../src/router.js";
 
describe("footerComponent", () => {
  test("debería renderizar el footer con la clase y el texto correctos", () => {
    const footer = footerComponent();

    // Verificar que tenga la clase correcta.  Función classList.contains() es un método de Js
    expect(footer.classList.contains("footer-component")).toBe(true);

    // Verificar que tenga el texto correcto
    expect(footer.innerText).toBe("M.O.Dev");

    expect(footer).toBeDefined();

    expect(footer.tagName).toBe("FOOTER"); // ya que tagName está siendo devuelto en mayúsculas
  });
});


describe("headerComponent", () => {

  test("debería renderizar el header correctamente", () => {
    const header = headerComponent(); 
    expect(header).toBeDefined();
  });
  
  test("debería renderizar los botones correctamente", () => {
    const header = headerComponent(); 

    // Verificar que los botones tengan las clases correctas
    const btnHome = header.querySelector(".btn-home");
    const btnAPI = header.querySelector(".btn-api");
    const btnChatGrupal = header.querySelector(".btn-chat-grupal");
    
    expect(btnHome).toBeTruthy();
    expect(btnAPI).toBeTruthy();
    expect(btnChatGrupal).toBeTruthy();

    // Verificar que los botones tengan el texto correcto sin espacios en blanco adicionales
    expect(btnHome.textContent.trim()).toBe("MovieDev");
    expect(btnAPI.textContent).toBe("API Key");
    expect(btnChatGrupal.textContent).toBe("Chat Grupal");
  });

  const navigateToSpy = jest.spyOn(routerModule, 'navigateTo');
  console.log(navigateToSpy);
  
  test("al dar click se navega correctamente", () => {
    const header = headerComponent(); 
    
    const btnHome = header.querySelector(".btn-home");
    const btnAPI = header.querySelector(".btn-api");
    const btnChatGrupal = header.querySelector(".btn-chat-grupal");

    // Verificar que se navegue bien
    btnHome.click();
    expect(navigateToSpy).toHaveBeenCalledWith("/", {});

    btnAPI.click();
    expect(navigateToSpy).toHaveBeenCalledWith("/viewAPIKey", {});

    btnChatGrupal.click();
    expect(navigateToSpy).toHaveBeenCalledWith("/groupChats", {});

  });
});
