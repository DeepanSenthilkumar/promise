// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function() {
    // Get the container element where cards will be appended
    const cardContainer = document.getElementById('cardContainer');

    // Function to fetch country data from the API
    const fetchData = () => {
        return new Promise((resolve, reject) => {
            fetch('https://restcountries.com/v3.1/all')
            .then(response => {
                // Check if the response is successful
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse response data as JSON
            })
            .then(data => {
                resolve(data.slice(0, 3)); // Resolve the promise with the first 3 countries
            })
            .catch(error => {
                reject(error); // Reject the promise if there is an error
            });
        });
    };

    // Fetch data and create cards
    fetchData()
    .then(countries => {
        countries.forEach(country => {
            createCard(country); // Create card for each country
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

    // Function to create a card for each country
    function createCard(country) {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <div class="card-content">
                <h2 class="country-name">${country.name.common}</h2>
                <p><img src="${country.flags.png}" alt="Country Flag"></p>
                <p>Capital: <span>${country.capital}</span></p>
                <p>Region: <span>${country.region}</span></p>
                <p>Country Code: <span>${country.altSpellings[0]}</span></p>
            </div>
        `;

        cardContainer.appendChild(card); // Append the card to the container
    }
});
