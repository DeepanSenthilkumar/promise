// Function to fetch Pokémon data for a given Pokémon ID
function fetchPokemonData(pokemonId) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(response => {
        // Check if response is ok
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .catch(error => {
        // Catch any errors during fetching and log them
        console.error(`Error fetching Pokemon data for ID ${pokemonId}:`, error);
        return null;
      });
  }
  
  // Function to fetch and display the first ten Pokémon
  function fetchAndDisplayFirstTenPokemon() {
    const promises = [];
    // Loop through the first ten Pokémon IDs
    for (let id = 1; id <= 10; id++) {
      // Fetch Pokémon data for each ID and push the promise to an array
      promises.push(fetchPokemonData(id));
    }
    // Once all promises are resolved, process the Pokémon data
    Promise.all(promises)
      .then(pokemonDataArray => {
        console.log("Fetched Pokemon data:", pokemonDataArray);
        // Get the card container element from the DOM
        const cardContainer = document.getElementById('cardContainer');
        if (!cardContainer) {
          console.error('Card container not found.');
          return;
        }
        // Clear existing cards from the container
        cardContainer.innerHTML = '';
        // Loop through the fetched Pokémon data array
        pokemonDataArray.forEach(pokemon => {
          // If Pokémon data is not null, create a card and populate it with Pokémon information
          if (pokemon !== null) {
            const card = document.createElement('div');
            card.classList.add('cardContainer');
  
            const name = document.createElement('h3');
            name.textContent = pokemon.name;
  
            const image = document.createElement('img');
            image.src = pokemon.sprites.front_default;
            image.alt = pokemon.name + ' image';
            image.classList.add('pokemonImage');
  
            const types = document.createElement('p');
            types.textContent = 'Types: ' + pokemon.types.map(type => type.type.name).join(', ');
  
            const abilities = document.createElement('p');
            abilities.textContent = 'Abilities: ' + pokemon.abilities.map(ability => ability.ability.name).join(', ');
  
            const weight = document.createElement('p');
            weight.textContent = 'Weight: ' + pokemon.weight;
  
            const moves = document.createElement('p');
            moves.textContent = 'Moves: ' + pokemon.moves.slice(0, 5).map(move => move.move.name).join(', ');
  
            // Append elements to the card
            card.appendChild(name);
            card.appendChild(image);
            card.appendChild(types);
            card.appendChild(weight);
            card.appendChild(abilities);
            card.appendChild(moves);
  
            // Append the card to the card container
            cardContainer.appendChild(card);
          }
        });
      })
      .catch(error => {
        // Catch any errors during fetching or displaying Pokémon data and log them
        console.error('Error fetching and displaying Pokemon data:', error);
      });
  }
  
  // Initial fetch and display of the first ten Pokémon
  fetchAndDisplayFirstTenPokemon();
  