// Functie om een success bericht te laten zien met Toastify
function successMessage(message) {
  Toastify({
    text: message,
    close: true,
    duration: 1000,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
      fontFamily: 'font-family: Cantarell, "Open Sans";',
    },
  }).showToast();
}

// Functie om een error bericht te laten zien met Toastify
function errorMessage(message) {
  Toastify({
    text: message,
    close: true,
    duration: 1000,
    style: {
      background: "#b3322d",
      fontFamily: 'font-family: Cantarell, "Open Sans";',
    },
  }).showToast();
}

// Verkrijg alle landen van de Express server met een GET request
function getCountries() {
  fetch("http://localhost:3000/").then((response) => {
    response.json().then((data) => {
      if (data.error) {
        // Als er een error is, log deze dan in de console
        console.log(data.error);
      } else {
        // Anders log de data in de console en laat deze zien in de HTML tabel
        console.log(data);
        data.forEach((country) => {
          document.querySelector("tbody").innerHTML += `
          <tr>
            <td>${country.id}</td>
            <td>${country.land}</td>
            <td>${country.hoofdstad}</td>
            <td class="last" style="text-align: center">
                <!-- Verwijder icoon knop -->
                <svg onclick="deleteCountry(${country.id})" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 delete-icon">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </td>
          </tr>
        `;
        });
      }
    });
  });
}

// Roep de functie getCountries() aan zodra de pagina is geladen
window.addEventListener("load", getCountries);
window.addEventListener("load", successMessage("Data is geladen"));

// Functie om een land te verwijderen, met een DELETE request
function deleteCountry(id) {
  fetch(`http://localhost:3000/${id}`, {
    method: "DELETE",
  }).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        // Als er een error is, log deze dan in de console
        console.log(data.error);
      } else {
        // Anders log de data in de console en verwijder de HTML tabel
        console.log(data);
        // Ververs de tabel met de nieuwe data
        getCountries();
        errorMessage("Land is verwijderd");
      }
    });
  });
}

// Functie om een land toe te voegen, met een POST request
function insertCountry() {
  // Haal de data op uit de input velden
  const country = document.querySelector("#country-insert").value;
  const capital = document.querySelector("#capital-insert").value;

  // Maak een object van de data
  const data = {
    land: country,
    hoofdstad: capital,
  };

  // Voeg een land toe met een POST request
  fetch("http://localhost:3000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        // Als er een error is, log deze dan in de console
        console.log(data.error);
      } else {
        // Anders log de data in de console en voeg de HTML tabel toe
        console.log(data);
        // Ververs de tabel met de nieuwe data
        getCountries();
        successMessage("Land is toegevoegd");
      }
    });
  });
}

function updateCountry() {
  // Haal de data op uit de input velden
  const country = document.querySelector("#country-update").value;
  const capital = document.querySelector("#capital-update").value;
  const id = document.querySelector("#id-update").value;

  // Maak een object van de data
  const data = {
    land: country,
    hoofdstad: capital,
  };

  // Voeg een land toe met een PUT request
  fetch(`http://localhost:3000/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        // Als er een error is, log deze dan in de console
        console.log(data.error);
      } else {
        // Anders log de data in de console en voeg de HTML tabel toe
        console.log(data);
        // Ververs de tabel met de nieuwe data
        getCountries();
        successMessage("Land is aangepast");
      }
    });
  });
}

function searchCountry() {
  // Haal de query op uit de input
  const query = document.querySelector("#search").value.toLowerCase();

  // Als er geen query is, haal dan alle landen op
  if (!query) {
    getCountries();
    return;
  }

  // Zoek naar landen met een GET request
  fetch(`http://localhost:3000/search/${query}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.querySelector("tbody").innerHTML = "";
      data.forEach((country) => {
        document.querySelector("tbody").innerHTML += `
        <tr>
          <td>${country.id}</td>
          <td>${country.land}</td>
          <td>${country.hoofdstad}</td>
          <td class="last" style="text-align: center">
              <!-- Verwijder icoon knop -->
              <svg onclick="deleteCountry(${country.id})" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 delete-icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
          </td>
        </tr>
      `;
      });
    });
}

function removeInput() {
  document.querySelector("#search").value = "";
  // Ververs de tabel met de nieuwe data
  getCountries();
}
