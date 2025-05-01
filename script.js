const btClear = document.querySelector('.btClear');
const list = document.querySelector('.list');
const counts = document.querySelector('.counts');

fetch('https://restcountries.com/v3.1/all') 
    .then((response) => response.json())
    .then((data) => {
        const inputSearch = document.querySelector('.input-Search');
        const btsearch = document.querySelector('.btsearch');

        btsearch.addEventListener('click', () => {
            const inputFill = inputSearch.value.toLowerCase().trim();

            const foundItem = data.find((item) => {
                return item.name.common.toLowerCase() === inputFill;
                
            });

            if (foundItem) {
                const id = `country-${foundItem.name.common.toLowerCase().replace(/\s+/g, '-')}`;
                const targetElement = document.getElementById(id);
                if (targetElement) {
                   targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                   })
                   inputSearch.value = '';
                }
            }else {
                inputSearch.value = 'There is no such country';
            }

        });

        btClear.addEventListener('click', () => {
            inputSearch.value = '';
        })

        function renderCountries() {
            counts.textContent = data.length;
            list.innerHTML = ``;

            data.forEach((item, index) => {
                const li = document.createElement('li');
                li.setAttribute('class', 'li-list');

                // Устанавливаем уникальный ID на основе названия страны
                const countryId = `country-${item.name.common.toLowerCase().replace(/\s+/g, '-')}`;
                li.setAttribute('id', countryId);

                const countries = document.createElement('span');
                countries.setAttribute('class', 'countris');

                const country = document.createElement('span');
                country.setAttribute('class', 'countrys');
                country.textContent = item.name.common;

                const imgs = document.createElement('img');
                imgs.setAttribute('class', 'flag');
                imgs.setAttribute('src', `${item.flags.png}`);

                const textpop = document.createElement('span');
                textpop.setAttribute('class', 'textpop');
                textpop.textContent = 'Population:';

                const population = document.createElement('span');
                population.setAttribute('class', 'population');
                population.textContent = item.population;

                const maps = document.createElement('a');
                maps.setAttribute('class', 'googleMaps');
                maps.setAttribute('href', item.maps.googleMaps);
                maps.setAttribute('target', '_blank');
                maps.textContent = 'GoogleMaps';

                const btclosed = document.createElement('button');
                btclosed.setAttribute('class', 'btclosed');
                btclosed.setAttribute('data-index', `${index}`);
                btclosed.textContent = `X`;

                list.appendChild(li);
                li.appendChild(countries);
                countries.appendChild(country);
                countries.appendChild(imgs);
                countries.appendChild(textpop);
                countries.appendChild(population);
                countries.appendChild(maps);
                li.appendChild(btclosed);
            });
        }
        renderCountries();


                       // Popup

    document.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');

        if(e.target.classList.contains('btclosed')) {
            data.splice(index, 1);
        }
        else if(e.target.classList.contains('countrys') || e.target.classList.contains('population') || e.target.classList.contains('flag') || e.target.classList.contains('textpop') || e.target.classList.contains('li-list')) {
            let card = e.target.closest('.li-list');
            let imgs = card.querySelector('.flag').src;
            let title = card.querySelector('.countrys').textContent;
            let populations = card.querySelector('.population').textContent;
            let map = card.querySelector('.googleMaps').href;

            const imgPopup = document.querySelector('.imgPopup');
            const titlePopup = document.querySelector('.titlePopup');
            const totalPopup = document.querySelector('.totalPopup');
            const googlePopup = document.querySelector('.googlePopup');

            imgPopup.src = imgs;
            titlePopup.textContent = title;
            totalPopup.textContent = `Population: ${populations}`;
            googlePopup.href = map;
            googlePopup.setAttribute('target', '_blank');
            googlePopup.textContent = 'GoogleMaps';

            document.querySelector('.bgpopup').classList.add('bgpopupclass');
            
        }

        document.querySelector('.btclosedPopup').addEventListener('click', () => {
            document.querySelector('.bgpopup').classList.remove('bgpopupclass');
        });
        
        renderCountries();

    })


});



const mobil = document.querySelector('.mobil');

mobil.addEventListener('click', () => {
    mobil.classList.toggle('open');
    document.querySelector('.search').classList.toggle('open');
})