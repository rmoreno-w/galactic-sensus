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
    let residentsElement = document.getElementById('planet-residents');

    const clickedPlanetName = event.target.innerHTML;

    const planetInfo = planetListArray.find((planet) => planet.name == clickedPlanetName);

    nameElement.innerHTML = planetInfo.name;
    populationElement.innerHTML = planetInfo.population;
    terrainElement.innerHTML = planetInfo.terrain;
    climateElement.innerHTML = planetInfo.climate;

    residentsElement.innerHTML = '<p>Residentes:</p>';
    const residentsArray = planetInfo.residents;
    residentsArray.forEach(async (resident) => {
        const residentInfo = await getResidentInfo(resident);

        console.log(residentInfo);
        const { name, birth_year } = residentInfo;

        const residentParagraph = document.createElement('p');
        residentParagraph.innerHTML = `<p>- ${name}, <span>nascido(a) em: ${birth_year}</span></p>`;

        residentsElement.appendChild(residentParagraph);
    });

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

async function getResidentInfo(residentURL) {
    const fetchResult = await fetch(residentURL);
    const residentInfo = await fetchResult.json();

    return residentInfo;
}

getPlanets();
