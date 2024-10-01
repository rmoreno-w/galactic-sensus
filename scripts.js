const planetList = document.getElementById('planet-list');

async function getPlanets() {
    const planetsURL = 'https://swapi.dev/api/planets/';

    const fetchResult = await fetch(planetsURL);
    const result = await fetchResult.json();

    const planets = result.results;

    console.log(planets);
}

getPlanets();
