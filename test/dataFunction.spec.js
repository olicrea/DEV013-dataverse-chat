import { data as fakeData } from "../src/data/exampleData.js";
import { filterData, sortData, computeStatsScore, computeStats } from "../src/lib/dataFunctions.js";

describe('filterData', () => {

  it('verifica si data es un arreglo, si es así regresa true', () => {
    expect(Array.isArray(fakeData)).toBe(true);
  });

  it('si data  es un arreglo y filterBy es "genreValue" y value es "thriller" debo recibir un arreglo con la propiedad name: "Hackers" ', () => {
    expect(filterData(fakeData, "genreValue", "thriller")[0]).toHaveProperty("name", "Hackers");
  });

  it('si data  es un arreglo y filterBy es "genreValue" y value es "tdocumental" debo recibir un arreglo con la propiedad name: "Indie Game: The Movie" ', () => {
    expect(filterData(fakeData, "genreValue", "documental")[0]).toHaveProperty("name", "Indie Game: The Movie");
  });
})


describe('sortData', () => {
  //En este test se quiere para el resultado que solo arroje el id de las películas ordenadas para no tener un resultado muy extenso.
  it('ordena ascendentemente los id en función de el año de la película: "yearMovie"', () => {
    const result = sortData(fakeData, "yearMovie", "asc").map(movie => movie.id);
    expect(result).toEqual([
      "short-circuit",
      "hackers",
      "indie-game-the-movie"
    ]);
  });


  it('sortBy es string como formato esperado', () => {
    const sortBy = { name: true, yearMovie: true };
    Object.keys(sortBy).forEach((key) => {
      expect(typeof key).toBe('string');
    });
  });
});


describe("computeStats", () => {

  it('el recuento de películas para un país específico es el esperado', () => {
    const result = computeStats(fakeData);
    const countryUsa = result["Estados Unidos"].count;
    expect(countryUsa).toEqual(2);
  });
})


describe("computeStatsScore", () => {

  it('devuelve un objeto con propiedades esperadas', () => {
    const result = computeStatsScore(fakeData);
    expect(typeof result).toBe('object');
    expect(result).toHaveProperty('scoreOut50');
    expect(result).toHaveProperty('scoreOut70');
    expect(result).toHaveProperty('scoreOut90');
  });
});

describe('Test de la función filterData', () => {

  it('La función filterData debe filtrar', () => {
    const result = filterData(fakeData, "genreValue", "thriller")[0];
    expect(result).toHaveProperty("name", "Hackers");
  });
  it('La función filterData es pura, criterio 1', () => {
    //No depende de variables externas es completamente independiente
    const result = filterData(fakeData, "productionCompany", "TriStar Pictures")[0];
    expect(result).toHaveProperty("name", "Short Circuit");
  });
  it('La función filterData es pura, criterio 2', () => {
    //Retorna el mismo resultado para los mismos argumentos
    const result1 = filterData(fakeData, "productionCompany", "MGM");
    const result2 = filterData(fakeData, "productionCompany", "MGM");
    expect(result1).toEqual(result2);
  });
  // Bloque de prueba
  describe('Verificación de filterData, no manipula directamente el DOM', () => {
    let createElementSpy;
    let appendChildSpy;

    beforeEach(() => {
      // Espía en las funciones relacionadas con el DOM
      createElementSpy = jest.spyOn(document, 'createElement');
      appendChildSpy = jest.spyOn(document.body, 'appendChild');
    });

    // Restablece los espías después de cada prueba
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('No debería manipular directamente el DOM', () => {
      const result = filterData(fakeData, "genreValue", "thriller")[0];
      expect(createElementSpy).not.toHaveBeenCalled();
      expect(appendChildSpy).not.toHaveBeenCalled();

      expect(result).toHaveProperty("name", "Hackers");
    });
  });

});

describe('Test de la función sortData', () => {
  const resultOrder = [fakeData[0], fakeData[2], fakeData[1]];
  describe('La función sortData debe ordenar de manera ascendente por nombre y año de producción', () => {
    it('Ascendente por string', () => {

      const result = sortData(fakeData, "name", "asc");
      expect(result).toEqual(resultOrder);
    });
    it('Ascendente por string', () => {
      const result = sortData(fakeData, "name", "desc");
      expect(result).toEqual(resultOrder.reverse());
    });
  })

})
