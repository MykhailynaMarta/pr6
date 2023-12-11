const requestURL = 'https://semegenkep.github.io/json/example.json';
const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function () {
    const superHeroes = request.response;
    populateHeader(superHeroes);
    showHeroes(superHeroes);
};

function populateHeader(data) {
    const header = document.createElement('header');

    const squadName = document.createElement('h1');
    squadName.textContent = data.squadName;
    header.appendChild(squadName);

    const homeTown = document.createElement('p');
    homeTown.innerHTML = `Home Town: <span>${data.homeTown} // Formed: <span>${data.formed}</span></span>`;
    header.appendChild(homeTown);

    document.body.appendChild(header);
}

function showHeroes(data) {
    const heroesSection = document.createElement('section');
    heroesSection.id = 'heroesSection';

    const heroGrid = document.createElement('div');
    heroGrid.classList.add('hero-grid');
    heroGrid.style.display = 'grid';
    heroGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    heroGrid.style.gap = '20px'; // Adjust as needed

    data.members.forEach(hero => {
        const heroCard = document.createElement('div');
        heroCard.classList.add('hero-card');

        heroCard.innerHTML = `
            <h2>${hero.name}</h2>
            <p>Age: ${hero.age}</p>
            <p>Secret Identity: ${hero.secretIdentity}</p>
            <p>Powers:</p>
            <ul>
                ${hero.powers.map(power => `<li>${power}</li>`).join('')}
            </ul>
        `;

        heroGrid.appendChild(heroCard);
    });

    heroesSection.appendChild(heroGrid);
    document.body.appendChild(heroesSection);
}
