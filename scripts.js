const planetListUL = document.getElementById('planet-list');
let modalElement = document.getElementById('modal');
let planetListArray = [];
let planetsToRenderArray = [];

async function getPlanets() {
    const planetsURL = 'https://swapi.dev/api/planets/';

    const fetchResult = await fetch(planetsURL);
    const result = await fetchResult.json();

    const planets = result.results;
    planets.forEach((planet) => {
        planetListArray.push(planet);
        planetsToRenderArray.push(planet);
    });

    renderPlanets();
}

function openModal(event) {
    let nameElement = document.getElementById('planet-name');
    let populationElement = document.getElementById('planet-population');
    let terrainElement = document.getElementById('planet-terrain');
    let climateElement = document.getElementById('planet-climate');

    const clickedPlanetName = event.target.innerHTML;

    const planetInfo = planetListArray.find((planet) => planet.name == clickedPlanetName);

    nameElement.innerHTML = planetInfo.name;
    populationElement.innerHTML = planetInfo.population;
    terrainElement.innerHTML = planetInfo.terrain;
    climateElement.innerHTML = planetInfo.climate;

    modalElement.showModal();
}

function onPlanetSearch() {
    const inputValue = document.getElementById('search-field').value;

    planetsToRenderArray = planetListArray.filter((planet) =>
        planet.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    renderPlanets();
}

function renderPlanets() {
    planetListUL.innerHTML = '';

    planetsToRenderArray.forEach((planet) => {
        const planetButton = document.createElement('button');
        planetButton.innerHTML = planet.name;
        planetButton.addEventListener('click', openModal);

        const listItem = document.createElement('li');
        listItem.appendChild(planetButton);
        planetListUL.appendChild(listItem);
    });
}

getPlanets();
