const planetList = document.getElementById('planet-list');

async function getPlanets() {
    const planetsURL = 'https://swapi.dev/api/planets/';

    const fetchResult = await fetch(planetsURL);
    const result = await fetchResult.json();

    const planets = result.results;

    planets.forEach((planet) => {
        const planetButton = document.createElement('button');
        planetButton.innerHTML = planet.name;
        planetList.appendChild(planetButton); // console.log(planet);
    });
}

getPlanets();
