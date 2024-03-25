export const selectsComponent = () => {
  const selects = document.createElement("div");
  selects.className = "inputs";
  selects.innerHTML = `
            <label for="genre"><strong>Filtrar por género</strong></label>
            <select name="genre" id="genre" data-testid="select-filter">
                <option value="a" selected disabled>Selecciona filtro</option>
                <option value="fiction">Ciencia Ficción</option>
                <option value="animation">Animación</option>
                <option value="thriller">Thriller</option>
                <option value="documental">Documental</option>
                <option value="drama">Drama</option>
            </select>
    
            <label for="alfa"><strong>Ordenar alfabéticamente</strong></label>
            <select name="alfa" id="alfa" data-testid="select-sort">
                <option value="a" selected disabled>Selecciona orden</option>
                <option value="asc">A - Z</option>
                <option value="desc">Z - A</option>
            </select>

            <label for="year"><strong>Ordenar por año</strong></label>
            <select name="year" id="year" data-testid="select-sort-year">
                <option value="a" selected disabled>Selecciona orden</option>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>

            <label for="statistics"><strong>Estadísticas RT</strong></label>
            <select name="statistics" id="statistics">
                <option value="a" selected disabled>Estadísticas</option>
                <option value="score50">50% y 70% en RT</option>
                <option value="score70">70% y 90% en RT</option>
                <option value="score90">90% y 100% en RT</option>
            </select>
    
            <label for="statistics-country"><strong>Estadísticas por países</strong></label>
                <select name="statistics-country" id="statistics-country">
                <option value="a" selected disabled>Estadísticas</option>
                <option value="country">Películas por país</option>
            </select>

            <button id="btn" data-testid="button-clear">Limpiar</button>

        `;

  return selects;
};
//se puede llamar desde acá al home


// import { sortData, filterData, computeStats, computeStatsScore } from "./../lib/dataFunctions.js";
// import { data } from "./../data/dataset.js";

// export const renderMovieData = () => {
//   const renderItems = (data) => {
//     let html = '';
//     data.forEach(function (film) { 
//       html += `<li class="cards" itemscope itemtype="movie">
//                         <dl>
//                             <img src="${film.imageUrl}" alt=Imagen de la película: ${film.name} />
//                             <dt></dt><dd class="name-movie" itemprop="name"><strong>${film.name}</strong></dd>
//                             <dt></dt><dd class="year-movie" itemprop="yearMovie"><strong>(${film.facts.yearMovie})</strong></dd>
//                             <dt></dt><dd class= "info-movie" itemprop="shortDescription">${film.shortDescription}</dd>
//                             <dt></dt><dd itemprop="genreMovie"><strong>Género: </strong>${film.facts.genreMovie}</dd>
//                         </dl>
//                     </li>`;
//     });
        
//     html = '<ul>' + html + '</ul>';
//     return html;
//   };
    
//   const renderItemsStadistics = (data,title,percent) => {
//     let html = '';
//     data.forEach(function (film) { 
//       html += `
//                         <li class="cards" itemscope itemtype="movie">
//                         <dl>
//                             <img src="${film.imageUrl}" alt=${film.name} />
//                             <dt></dt><dd class="tittle" itemprop="name"><strong>${film.name}</strong></dd>
//                             <dt></dt><dd class="tittle" itemprop="year"><strong>(${film.facts.yearMovie})</strong></dd>
//                             <dt></dt><dd class= "info-movie" itemprop="shortDescription">${film.shortDescription}</dd>
//                             <dt></dt><dd itemprop="genreMovie"><strong>Género: </strong>${film.facts.genreMovie}</dd>
//                             <dt></dt><dd itemprop="rottenTomatoesScore"><strong>Puntuación: </strong>${film.extraInfo.rottenTomatoesScore}</dd>
//                         </dl>
//                     </li>`;
//     });
        
//     html = `<h2>${title}</h2>
//                     <h4>Estas películas representan el ${percent}% de la data de MovieDev:</h4> 
//                     <ul>${html}</ul>`;
//     return html;
//   };

//   const selectsComponent = () => {
//     const selects = document.createElement("div");
//     selects.id = "inputs";
//     selects.innerHTML = `
//                     <label for="genre"><strong>Filtrar por género</strong></label>
//                     <select name="genre" id="genre" data-testid="select-filter">
//                         <option value="a" selected disabled>Selecciona filtro</option>
//                         <option value="fiction">Ciencia Ficción</option>
//                         <option value="animation">Animación</option>
//                         <option value="thriller">Thriller</option>
//                         <option value="documental">Documental</option>
//                         <option value="drama">Drama</option>
//                     </select>
            
//                     <label for="alfa"><strong>Ordenar alfabéticamente</strong></label>
//                     <select name="alfa" id="alfa" data-testid="select-sort">
//                         <option value="a" selected disabled>Selecciona orden</option>
//                         <option value="asc">A - Z</option>
//                         <option value="desc">Z - A</option>
//                     </select>

//                     <label for="year"><strong>Ordenar por año</strong></label>
//                     <select name="year" id="year" data-testid="select-sort-year">
//                         <option value="a" selected disabled>Selecciona orden</option>
//                         <option value="asc">Ascendente</option>
//                         <option value="desc">Descendente</option>
//                     </select>

//                     <label for="statistics"><strong>Estadísticas RT</strong></label>
//                     <select name="statistics" id="statistics">
//                         <option value="a" selected disabled>Estadísticas</option>
//                         <option value="score50">50% y 70% en RT</option>
//                         <option value="score70">70% y 90% en RT</option>
//                         <option value="score90">90% y 100% en RT</option>
//                     </select>
            
//                     <label for="statistics-country"><strong>Estadísticas por países</strong></label>
//                         <select name="statistics-country" id="statistics-country">
//                         <option value="a" selected disabled>Estadísticas</option>
//                         <option value="country">Películas por país</option>
//                     </select>

//                     <button id="btn" data-testid="button-clear">Limpiar</button>

//                 `;

//     return selects;
//   };

//   let currentMovies = [...data];
//   let cardDiv;
//   let statistics;
//   const statisticsCountrySelect = document.querySelector("#statistics-country");

//   const toggleMovieCards = () => {
//     const movieCards = document.querySelector(".cards");
//     movieCards.classList.toggle("cards-menu");
//   };

//   const renderAndAppendToRoot = (data) => {
//     const rootElement = document.querySelector('#root');
//     if (rootElement) {
//       const renderedHTML = renderItems(data);
//       rootElement.innerHTML = renderedHTML;
//     }
//   };
//   renderAndAppendToRoot(data);

//   const renderAndAppendToRootStadistics = (data, title, percent) => {
//     const rootElement = document.querySelector('#root');
//     if (rootElement) {
//       const renderedHTML = renderItemsStadistics(data, title, percent);
//       rootElement.innerHTML = renderedHTML;
//     }
//   };

//   const resetCardDiv = () => {
//     if (statisticsCountrySelect) {
//       statisticsCountrySelect.selectedIndex = "";
//     }
//     if (cardDiv) {
//       cardDiv.style.display = 'none';
//       const removeChild = cardDiv.removeChild;
//       while (cardDiv.firstChild) {
//         removeChild.call(cardDiv, cardDiv.firstChild);
//       }
//     }
//   };

//   const resetViewport = () => {
//     currentMovies = [];
//     renderAndAppendToRoot(currentMovies);
//   };

//   selectsComponent();

//   const btnFilterGenre = document.getElementById("genre");
//   btnFilterGenre.addEventListener("change", (e) => {
//     const filterGenre = filterData(data, "genreValue", e.target.value);
//     currentMovies = [...filterGenre];
//     renderAndAppendToRoot(filterGenre);
//     resetCardDiv();
//     toggleMovieCards();
//   });

//   const btnOrdenName = document.getElementById("alfa");
//   btnOrdenName.addEventListener("change", (e) => {
//     const orderedData = sortData(currentMovies, "name", e.target.value);
//     currentMovies = [...orderedData];
//     renderAndAppendToRoot(orderedData);
//     resetCardDiv();
//     toggleMovieCards();
//   });

//   const btnOrderYear = document.getElementById("year");
//   btnOrderYear.addEventListener("change", (e) => {
//     const orderYear = sortData(currentMovies, "yearMovie", e.target.value);
//     currentMovies = [...orderYear];
//     renderAndAppendToRoot(orderYear);
//     resetCardDiv();
//     toggleMovieCards();
//   });

//   const btn = document.querySelector("#btn");
//   const resetfilters = () => {
//     resetCardDiv();
//     const genreSelect = document.getElementById("genre");
//     const alfaSelect = document.getElementById("alfa");
//     const yearSelect = document.getElementById("year");
//     const statisticsSelect = document.getElementById("statistics");

//     if (genreSelect) {
//       genreSelect.selectedIndex = "";
//     }

//     if (alfaSelect) {
//       alfaSelect.selectedIndex = "";
//     }

//     if (yearSelect) {
//       yearSelect.selectedIndex = "";
//     }

//     if (statisticsSelect) {
//       statisticsSelect.selectedIndex = "";
//     }

//     if (statisticsCountrySelect) {
//       statisticsCountrySelect.selectedIndex = "";
//     }

//     currentMovies = [...data];
//     renderAndAppendToRoot(data);
//     toggleMovieCards();
//   };

//   btn.addEventListener("click", resetfilters);

//   const openMenu = document.querySelector(".open-menu");
//   let menuOpen = false;
//   openMenu.addEventListener("click", function () {
//     const menuInputs = document.querySelector(".inputs");
//     toggleMovieCards();

//     if (!menuOpen) {
//       menuInputs.style.display = "flex";
//       menuOpen = true;
//     } else {
//       menuInputs.style.display = "none";
//       menuOpen = false;
//     }
//   });

//   const btnStatistics = document.querySelector("#statistics-country");
//   btnStatistics.addEventListener("change", () => {
//     resetViewport();
//     cardDiv = document.createElement("div");
//     cardDiv.className = "cards-two";

//     if (cardDiv) {
//       cardDiv.style.display = 'block'; 
//     }
//     statistics = computeStats(data);

//     const countryTitleParagraph = document.createElement("p");
//     countryTitleParagraph.innerHTML = "<strong>Películas tecnológicas por país en la data MovieDev:</strong>";
//     cardDiv.appendChild(countryTitleParagraph);

//     const keys = Object.keys(statistics);
//     for (let i = 0; i < keys.length; i++) {
//       const countryMovie = keys[i];
//       const countryInfo = statistics[countryMovie];

//       const countryInfoParagraph = document.createElement("p");
//       countryInfoParagraph.textContent = `${countryMovie}: ${countryInfo.count}`;

//       cardDiv.appendChild(countryInfoParagraph);
//     }
//     const inputsElement = document.querySelector(".inputs");

//     if (inputsElement && inputsElement.parentNode) {
//       inputsElement.parentNode.insertBefore(cardDiv, inputsElement.nextSibling);
//     }
//     currentMovies = [...data];
//   });

//   let orderData = [];
//   const selectStadistics = document.querySelector("#statistics");
//   selectStadistics.addEventListener('change', (e) => {
//     resetCardDiv();
//     orderData = [];
//     if (e.target.value === "score50") {
//       orderData = computeStatsScore(data);
//       return renderAndAppendToRootStadistics(orderData.scoreOut50, "Puntuación entre 50% y 70% de aprobación.", orderData.perOut50);
//     } else if (e.target.value === "score70") {
//       orderData = computeStatsScore(data);
//       return renderAndAppendToRootStadistics(orderData.scoreOut70, "Puntuación entre 70% y 90% de aprobación.", orderData.perOut70);
//     } else if (e.target.value === "score90") {
//       orderData = computeStatsScore(data);
//       return renderAndAppendToRootStadistics(orderData.scoreOut90, "Puntuación entre 90% y 100% de aprobación.", orderData.perOut90);
//     }
//   });
// };

