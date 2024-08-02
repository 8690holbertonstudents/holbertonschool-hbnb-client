/* 
This is a SAMPLE FILE to get you started.
Please, follow the project instructions to complete the tasks.
*/

document.addEventListener('DOMContentLoaded', async () => {
  /*
  Init variables required for the script
  */
  const listAllPlaces = document.getElementById('places-list');
  const countryFilter = document.getElementById('country-filter');
  /*
  Function to fetch places data from /places endpoint
  */
  async function fetchAndDisplayPlaces(selectedCountryCode = null) {
    try {
      const response = await fetch('/places');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const places = await response.json();
      const filteredPlaces = selectedCountryCode
        ? places.filter((place) => place.country_code === selectedCountryCode)
        : places;
        displayPlaces(filteredPlaces);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  }
  /*
  Function to display places on index.html
  */
  function displayPlaces(places) {
    try {
      listAllPlaces.innerHTML = '';
      if (places.length === 0) {
        listAllPlaces.innerHTML = '<p>No places found.</p>';
        return;
      }
      places.forEach((place) => {
        const card = document.createElement('div');
        card.className = 'place-card';
        card.dataset.placeId = place.id;
        card.innerHTML = `
        <img src="${place.image_url}" class="place-img" alt="${place.description}">
        <br>
        <h2>${place.description}</h2>
        <br>
        <p>${place.price_per_night.toFixed(2)} per night</p>
        <br>
        <p>Location: ${place.city_name}, ${place.country_name}</p>
        <button class="details-button">View Details</button>`;
        listAllPlaces.appendChild(card);
        cardViewDetailsButton();
      });
    } catch (error) {
      console.error('Error displaying places:', error);
    }
  }
  /*
  Function to fetch countries
  */
  async function fetchCountries() {
    try {
      const response = await fetch('/countries');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const countries = await response.json();
      listCountryFilter(countries);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  }
  /*
  Function to complete the countries filter list
  */
  function listCountryFilter(countries) {
    countries.forEach((country) => {
      const option = document.createElement('option');
      option.value = country.code;
      option.textContent = country.name;
      countryFilter.appendChild(option);
    });
  }
  /*
  Handle event country filter change
  */
  countryFilter.addEventListener('change', () => {
    const selectedCountryCode = countryFilter.value;
    fetchAndDisplayPlaces(selectedCountryCode);
  });

  function cardViewDetailsButton() {
    const detailsButtons = document.querySelectorAll('.details-button');
  
    detailsButtons.forEach(button => {
      button.addEventListener('click', function () {
        // Retrieve the place ID from the data-id attribute of the parent element
        const placeId = this.closest('.place-card').dataset.placeId;
        // Redirect to place.html with the place ID as a query parameter
        window.location.href = `/place.html/${placeId}`;
      });
    });
  }  






  /*
  Init html page
  */
  await fetchCountries();
  await fetchAndDisplayPlaces();
});
