const planetListUL = document.getElementById('planet-list');
let modalElement = document.getElementById('modal');
let planetListArray = [];

async function getPlanets() {
    const planetsURL = 'https://swapi.dev/api/planets/';

    const fetchResult = await fetch(planetsURL);
    const result = await fetchResult.json();

    const planets = result.results;
    planets.forEach((planet) => {
        const planetButton = document.createElement('button');
        planetButton.innerHTML = planet.name;
        planetButton.addEventListener('click', openModal);

        const listItem = document.createElement('li');
        listItem.appendChild(planetButton);
        planetListUL.appendChild(listItem); // console.log(planet);

        planetListArray.push(planet);
    });
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

getPlanets();
