import { footerComponent } from "../src/components/footer.js";
import { headerComponent } from "../src/components/header.js";
import { btnRegresar } from "../src/components/btnRegresar.js";
import { selectsComponent } from "../src/components/menuSelects.js";
import { renderItems } from "../src/views/home.js";
import * as routerModule from "../src/router.js";
import { setRootElement } from "../src/router.js";


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

    // Verificar que los botones tengan el texto correcto
    expect(btnHome.textContent).toBe("MovieDev");
    expect(btnAPI.textContent).toBe("API Key");
    expect(btnChatGrupal.textContent).toBe("Chat Grupal");
  });

  let navigateToSpy;
  beforeEach(() => {
    // Configurando el spy
    navigateToSpy = jest.spyOn(routerModule, 'navigateTo');
    // Mockeando la implementación del spy
    navigateToSpy.mockImplementation(() => {});
  });

  afterEach(() => {
    // Restaurando el spy después de cada prueba
    navigateToSpy.mockRestore();
  });

  // const navigateToSpy = jest.spyOn(routerModule, 'navigateTo');
  // console.log(navigateToSpy);

  // const rootElement = setRootElement();
  // console.log(rootElement);


  test("al dar click se navega correctamente", () => {

    setRootElement(document.createElement('div'));
    const header = headerComponent();

    const btnHome = header.querySelector(".btn-home");
    const btnAPI = header.querySelector(".btn-api");
    const btnChatGrupal = header.querySelector(".btn-chat-grupal");

    btnHome.click();
    btnAPI.click();
    btnChatGrupal.click();

    // Verificar que navigateTo fue llamado con los parámetros correctos
    expect(navigateToSpy).toHaveBeenNthCalledWith("/", {});
    expect(navigateToSpy).toHaveBeenNthCalledWith("/viewAPIKey", {});
    expect(navigateToSpy).toHaveBeenNthCalledWith("/groupChats", {});

  });

  describe('btnRegresar', () => {
    test('debería crear un botón con la clase y el texto correctos', () => {
      const button = btnRegresar();

      expect(button.tagName).toBe('BUTTON');

      expect(button.classList.contains('btn-regresar')).toBe(true);

      expect(button.textContent).toBe('Regresar');
    });
  });

  describe('selectsComponent', () => {
    test('debería crear un div con los selectores correctos', () => {
      const selects = selectsComponent();

      expect(selects.tagName).toBe('DIV');

      expect(selects.classList.contains('inputs')).toBe(true);

      expect(selects.querySelector('#genre')).toBeTruthy();
      expect(selects.querySelector('#alfa')).toBeTruthy();
      expect(selects.querySelector('#year')).toBeTruthy();
      expect(selects.querySelector('#statistics')).toBeTruthy();
      expect(selects.querySelector('#statistics-country')).toBeTruthy();

      expect(selects.querySelector('#btn')).toBeTruthy();
    });
  });

  describe('renderItems', () => {
    test('debería crear una lista de películas con los datos correctos', () => {
      const data = [
        {
          "id": "citizenfour",
          "name": "Citizenfour",
          "shortDescription": "Revelaciones sobre la vigilancia masiva gubernamental.",
          "description": "Es un documental que arroja luz sobre el escándalo de vigilancia masiva revelado por Edward Snowden. Dirigido por Laura Poitras, la película sigue de cerca los eventos que llevaron al denunciante a revelar documentos clasificados de la NSA. Capturando la tensión y la paranoia, Citizenfour ofrece una mirada impactante a la valiente decisión de Snowden de exponer la extensa vigilancia gubernamental. A través de entrevistas íntimas y material de archivo, la película plantea preguntas cruciales sobre la privacidad, la seguridad nacional y el precio del activismo en la era digital, dejando una impresión duradera en la audiencia.",
          "imageUrl": "https://raw.githubusercontent.com/MilenaPacheco/DEV013-dataverse/main/src/img/citizenfour.jpeg",
          "facts": {
            "yearMovie": 2014,
            "directorMovie": "Laura Poitras",
            "productionCompany": "RADiUS-TWC",
            "genreMovie": "Documental",
            "genreValue": "documental"
          },
        },
      ];

      const filmsList = renderItems(data);

      expect(filmsList.tagName).toBe('UL');

      expect(filmsList.classList.contains('cards-home')).toBe(true);

      // Verificar que los elementos li tengan los datos correctos
      data.forEach((film, index) => {
        const listItem = filmsList.querySelectorAll('li')[index];
        expect(listItem.id).toBe(film.id);
        expect(listItem.querySelector('.name-movie').textContent).toBe(film.name);
        expect(listItem.querySelector('.year-movie').textContent).toBe(`(${film.facts.yearMovie})`);
        expect(listItem.querySelector('[itemprop="genreMovie"]').textContent).toBe(`Género: ${film.facts.genreMovie}`);
      });
    });
  });

});

