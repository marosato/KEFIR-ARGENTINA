// KEFIR WATER

// Lista de Lugares
const locations = [
    // Caseros
    { name: "Plaza Principal de Caseros", address: "Av. San Martín & Bonifacini, Caseros", postalCode: "1678" },
    { name: "Plaza de la Unidad Nacional", address: "Lisandro de la Torre & Moreno, Caseros", postalCode: "1678" },
    { name: "Plaza Mitre", address: "Tres de Febrero & Alberdi, Caseros", postalCode: "1678" },
    { name: "Plaza del Pueblo", address: "Av. Libertador & Güemes, Caseros", postalCode: "1678" },

    // Ciudadela
    { name: "Plaza El Resero", address: "Av. Rivadavia & Gral. Paz, Ciudadela", postalCode: "1702" },
    { name: "Plaza Ejército de los Andes", address: "Luis María Drago & Alianza, Ciudadela", postalCode: "1702" },
    { name: "Plaza San Martín", address: "Maipú & San Martín, Ciudadela", postalCode: "1702" },
    { name: "Plaza Las Américas", address: "Paz Soldán & Libertad, Ciudadela", postalCode: "1702" },

    // Loma Hermosa
    { name: "Plaza de los Trabajadores", address: "Libertad & Santa Mónica, Loma Hermosa", postalCode: "1657" },
    { name: "Plaza Soberanía Nacional", address: "El Parque & Primera Junta, Loma Hermosa", postalCode: "1657" },
    { name: "Plaza Vecinos Unidos", address: "Camacuá & Río de Janeiro, Loma Hermosa", postalCode: "1657" },
    { name: "Plaza Belgrano", address: "Belgrano & Maipú, Loma Hermosa", postalCode: "1657" },

    // Martín Coronado
    { name: "Plaza Giorello", address: "Marconi & Sgto. Cabral, Martín Coronado", postalCode: "1682" },
    { name: "Plaza Villa Herminia", address: "Pueyrredón & Vélez Sarsfield, Martín Coronado", postalCode: "1682" },
    { name: "Plaza Alem", address: "J. A. Roca & Alem, Martín Coronado", postalCode: "1682" },
    { name: "Plaza Libertad", address: "Libertad & Corrientes, Martín Coronado", postalCode: "1682" },

    // Sáenz Peña
    { name: "Plaza Altube", address: "Alfredo Bufano & G. Payró, Sáenz Peña", postalCode: "1674" },
    { name: "Plaza Emilio Mitre", address: "Juan B. Justo & Av. América, Sáenz Peña", postalCode: "1674" },
    { name: "Plaza América", address: "Av. América & De La Victoria, Sáenz Peña", postalCode: "1674" },
    { name: "Plaza Sáenz Peña", address: "Int. Alvear & Sáenz Peña, Sáenz Peña", postalCode: "1674" },

    // Santos Lugares
    { name: "Plaza de los Artilleros", address: "Rodríguez Peña & Alianza, Santos Lugares", postalCode: "1676" },
    { name: "Plaza Giorello", address: "Av. La Plata & Av. Rodríguez Peña, Santos Lugares", postalCode: "1676" },
    { name: "Plaza San Martín", address: "Gral. Paz & San Martín, Santos Lugares", postalCode: "1676" },
    { name: "Plaza Troilo", address: "Freyre & Ocampo, Santos Lugares", postalCode: "1676" },

    // Villa Bosch
    { name: "Plaza Murialdo", address: "Gaucho Cruz & Martín Fierro, Villa Bosch", postalCode: "1682" },
    { name: "Plaza Padre Elizalde", address: "Liniers & Bosch, Villa Bosch", postalCode: "1682" },
    { name: "Plaza José Ingenieros", address: "Las Heras & José Ingenieros, Villa Bosch", postalCode: "1682" },
    { name: "Plaza San Cayetano", address: "San Cayetano & Rawson, Villa Bosch", postalCode: "1682" }
];

// Función para mostrar la lista de lugares
function displayLocations(filteredLocations) {
    const locationList = document.getElementById('locationList');
    locationList.innerHTML = '';
    filteredLocations.forEach(location => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = `${location.name} - ${location.address} (Código postal: ${location.postalCode})`;
        locationList.appendChild(li);
    });
    // Mostrar la lista solo si hay resultados
    if (filteredLocations.length > 0) {
        locationList.style.display = 'block';
    } else {
        locationList.style.display = 'none';
    }
}

// Función para manejar la búsqueda
function handleSearch(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredLocations = locations.filter(location =>
        location.name.toLowerCase().includes(searchTerm) ||
        location.address.toLowerCase().includes(searchTerm) ||
        location.postalCode.includes(searchTerm)
    );
    displayLocations(filteredLocations);
}

function validateForm() {
    const searchInput = document.getElementById('searchInput').value;
    const errorMessage = document.getElementById('errorMessage');
    const locationList = document.getElementById('locationList');
    errorMessage.style.display = 'none';
    locationList.style.display = 'none';
    locationList.innerHTML = '';

    // Filtrar los lugares basados en la búsqueda
    const filteredLocations = locations.filter(location =>
        location.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        location.address.toLowerCase().includes(searchInput.toLowerCase()) ||
        location.postalCode.includes(searchInput)
    );

    // Comprobar si hay puntos de encuentro
    if (filteredLocations.length === 0) {
        errorMessage.innerText = 'No existen puntos de encuentro por esta zona.';
        errorMessage.style.display = 'block';
        return false;
    }

    // Mostrar los puntos de encuentro encontrados
    filteredLocations.forEach(location => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = `${location.name} - ${location.address} (Código postal: ${location.postalCode})`;
        locationList.appendChild(listItem);
    });

    locationList.style.display = 'block';

    return false;
}

document.getElementById('searchForm').addEventListener('submit', handleSearch);


// const places = [
//     { name: "Plaza Central", location: "Calle 1, Ciudad A", postalCode: "12345" },
//     { name: "Centro Cultural", location: "Avenida 2, Ciudad B", postalCode: "23456" },
//     { name: "Mercado Municipal", location: "Calle 3, Ciudad A", postalCode: "12345" },
//     { name: "Plaza de la Música", location: "Calle 4, Ciudad C", postalCode: "34567" },
//     { name: "Centro de Salud", location: "Avenida 5, Ciudad B", postalCode: "23456" },
//     { name: "Mercado de Agricultores", location: "Calle 6, Ciudad A", postalCode: "12345" },
// ];

// const searchInput = document.getElementById('search');
// const placeList = document.getElementById('place-list');

// function displayPlaces(filteredPlaces) {
//     placeList.innerHTML = '';
//     filteredPlaces.forEach(place => {
//         const placeItem = document.createElement('div');
//         placeItem.classList.add('place-item');
//         placeItem.innerText = `${place.name} - ${place.location} (Código Postal: ${place.postalCode})`;
//         placeList.appendChild(placeItem);
//     });
// }

// function filterPlaces() {
//     const query = searchInput.value.toLowerCase();
//     const filteredPlaces = places.filter(place => 
//         place.location.toLowerCase().includes(query) || 
//         place.postalCode.includes(query)
//     );
//     displayPlaces(filteredPlaces);
// }

// searchInput.addEventListener('input', filterPlaces);

// displayPlaces(places);