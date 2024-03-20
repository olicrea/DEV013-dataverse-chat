import { headerComponent } from "./../components/header.js";
import { data } from "./../data/dataset.js";
import { footerComponent } from "./../components/footer.js";
import { navigateTo } from "../router.js";
import { filterData, sortData, computeStatsScore, computeStats } from "./../lib/dataFunctions.js";
import { selectsComponent } from "./../components/menuSelects.js";

//renderizado general
export const renderItems = (data) => {
  let html = "";

  data.forEach(function (film) {
    html += `<li class="cards" id="${film.id}" itemscope itemtype="movie">
                <dl>
                  <img src="${film.imageUrl}" alt=Imagen de la película: ${film.name} />
                  <dt></dt><dd class="name-movie" itemprop="name"><strong>${film.name}</strong></dd>
                  <dt></dt><dd class="year-movie" itemprop="yearMovie"><strong>(${film.facts.yearMovie})</strong></dd>
                  <dt></dt><dd class= "info-movie" itemprop="shortDescription">${film.shortDescription}</dd>
                  <dt></dt><dd itemprop="genreMovie"><strong>Género: </strong>${film.facts.genreMovie}</dd>
                </dl>
              </li>`;
  });

  const filmsList = document.createElement("ul");
  filmsList.className = "cards-home";
  filmsList.innerHTML = html;

  return filmsList;
};

export const renderItemsStadistics = (data, title, percent) => {
  let html = "";
  data.forEach(function (film) {
    html += `
              <li class="cards" itemscope itemtype="movie">
              <dl>
                <img src="${film.imageUrl}" alt=${film.name} />
                <dt></dt><dd class="tittle" itemprop="name"><strong>${film.name}</strong></dd>
                <dt></dt><dd class="tittle" itemprop="year"><strong>(${film.facts.yearMovie})</strong></dd>
                <dt></dt><dd class= "info-movie" itemprop="shortDescription">${film.shortDescription}</dd>
                <dt></dt><dd itemprop="genreMovie"><strong>Género: </strong>${film.facts.genreMovie}</dd>
                <dt></dt><dd itemprop="rottenTomatoesScore"><strong>Puntuación: </strong>${film.extraInfo.rottenTomatoesScore}</dd>
              </dl>
              </li>`;
  });

  html = `<h2>${title}</h2>
          <h4>Estas Películas Representan el ${percent}% de la web</h4> 
            <ul>${html}</ul>`;
  const ulElement = document.createElement("ul");
  ulElement.innerHTML = html;

  return ulElement;
};

export const renderItemsStadisticsCountry = (data, keys) => {
  const cardDiv = document.createElement("div");
  cardDiv.className = "cards-two";

  if (cardDiv) {
    cardDiv.style.display = "block";
  }
  // Crear un título para la data dentro del div
  const countryTitleParagraph = document.createElement("p");
  countryTitleParagraph.innerHTML =
    "<strong>Películas tecnológicas por país en la data MovieDev:</strong>";
  cardDiv.appendChild(countryTitleParagraph);

  // Iterar sobre los resultados de computeStats para acumular películas por países
  for (let i = 0; i < keys.length; i++) {
    const countryMovie = keys[i];
    const countryInfo = data[countryMovie];

    // Crear un párrafo para cada país
    const countryInfoParagraph = document.createElement("p");
    countryInfoParagraph.textContent = `${countryMovie}: ${countryInfo.count}`;

    // Añadir el párrafo al div
    cardDiv.appendChild(countryInfoParagraph);
  }
  return cardDiv;
};


export const home = () => {
  const root = document.createElement("div");

  const viewHeader = headerComponent();
  root.appendChild(viewHeader);

  const menuSelects = selectsComponent();
  menuSelects.style.display = "none"; 
  root.appendChild(menuSelects);

  const container = document.createElement("div");
  container.className="container-cards"
  root.appendChild(container);

  let orderData = [];
  if(orderData.length === 0){
    orderData = data;
  }

  let viewCards;


  const selectFilter = menuSelects.querySelector("#genre");
  const selectElementAlfa = menuSelects.querySelector("#alfa");
  const selectElementYear = menuSelects.querySelector("#year");
  const selectStadistics = menuSelects.querySelector("#statistics");
  const selectStadisticsCountry = menuSelects.querySelector("#statistics-country");
  const button = menuSelects.querySelector('button[data-testid="button-clear"]');

  selectFilter.addEventListener("change", () => {
    const selected = findSelects(selectFilter);
    orderData = filterData(data, "genreValue", selected.selectedValue);
    renderViewCards(orderData); // Utilizamos una función separada para renderizar las cartas
    root.appendChild(footer); // Agregamos el footer nuevamente después de renderizar las cartas
  });

  selectElementAlfa.addEventListener("change", () => {
    const selected = findSelects(selectElementAlfa);
    orderData = sortData(orderData, "name", selected.selectedValue);
    renderViewCards(orderData);
    root.appendChild(footer);
  });

  selectElementYear.addEventListener("change", () => {
    const selected = findSelects(selectElementYear);
    orderData = sortData(orderData, "yearMovie", selected.selectedValue);
    renderViewCards(orderData);
    root.appendChild(footer);
  });

  selectStadistics.addEventListener("change", () => {
    orderData = [...data];
    const selected = findSelects(selectStadistics);
    const resultComputStats = computeStatsScore(orderData);
    let dato;
    let title;
    let percent;

    if (selected.selectedValue === "score50") {
      orderData = resultComputStats.scoreOut50;
      dato = resultComputStats.scoreOut50;
      title = "Puntuación Entre 50% y 70% de Aprobación";
      percent = resultComputStats.perOut50;
    } else if (selected.selectedValue === "score70") {
      orderData = resultComputStats.scoreOut70;
      dato = resultComputStats.scoreOut70;
      title = "Puntuación Entre 70% y 90% de Aprobación";
      percent = resultComputStats.perOut70;
    } else if (selected.selectedValue === "score90") {
      orderData = resultComputStats.scoreOut90;
      dato = resultComputStats.scoreOut90;
      title = "Puntuación Entre 90% y 100% de Aprobación";
      percent = resultComputStats.perOut90;
    }
    renderStadistics(dato, title, percent);
    root.appendChild(footer);
  });

  selectStadisticsCountry.addEventListener("change", () => {
    container.removeChild(viewCards);
    orderData = computeStats(data);
    const keys = Object.keys(orderData);
    viewCards = renderItemsStadisticsCountry(orderData, keys);
    container.appendChild(viewCards);
    root.appendChild(footer);
  });

  // Renderiza las cartas al inicio
  renderViewCards(data);

  // Función para renderizar las cartas
  function renderViewCards(data) {
    if (viewCards) {
      container.removeChild(viewCards); // Elimina las cartas anteriores si existen
    }
    viewCards = renderItems(data);
    container.appendChild(viewCards);
  }

  function renderStadistics(data, title, percent) {
    if (viewCards) {
      container.removeChild(viewCards); // Elimina las cartas anteriores si existen
    }
    viewCards = renderItemsStadistics(data, title, percent);
    container.appendChild(viewCards);
  }

  const footer = footerComponent(); // Crear el footer después de renderizar las cartas
  root.appendChild(footer); // Agregar el footer al final

  const cards = root.querySelectorAll(".cards");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const cardId = card.getAttribute("id");
      navigateTo(`/description`, { name: cardId });
    });
  });


  // Función del botón para limpiar los select y renderizar los datos
  button.addEventListener("click", () => {
    menuSelects.querySelectorAll("select").forEach((select) => {
      select.value = "a";
    });
    renderViewCards(data);
    root.appendChild(footer)
  });

  return root;
};

//Función general para obtener el valor visible e interno
function findSelects(select) {
  const selectedIndex = select.selectedIndex;
  const selectedValue = select.options[selectedIndex].value;
  const selectedText = select.options[selectedIndex].text;
  return { selectedValue, selectedText };
}
