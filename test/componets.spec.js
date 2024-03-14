import { footerComponent } from "../src/components/footer";

describe("footerComponent", () => {
  it("footerComponent crea el componente correctamente", () => {
    const footer = footerComponent();
    expect(footer).toBeDefined();
  });
});

// require para llamar al router
// import as
// dispatchEvent, toHaveBeenCalledWith
// jest.spyOn
// mock - mockImplementation
// Pruebas unitarias y Jest
// Manejo de excepciones (try-catch)
// Funciones asíncronas y async/await
// Mocks y espías (Jest mocks y jest.fn())
