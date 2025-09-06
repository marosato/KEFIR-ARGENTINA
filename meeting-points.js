// MEETING POINTS

// Lista de Lugares
const locations = [
    // Villa Bosch
    { name: "Plaza Murialdo", address: "Gaucho Cruz & Martín Fierro, Villa Bosch", postalCode: "1682" },
    { name: "Plaza Padre Elizalde", address: "Liniers & Bosch, Villa Bosch", postalCode: "1682" },
    { name: "Plaza José Ingenieros", address: "Las Heras & José Ingenieros, Villa Bosch", postalCode: "1682" },
    { name: "Plaza San Cayetano", address: "San Cayetano & Rawson, Villa Bosch", postalCode: "1682" },

    // Caseros
    { name: "Plaza Principal de Caseros", address: "Av. San Martín & Bonifacini, Caseros", postalCode: "1678" },
    { name: "Plaza de la Unidad Nacional", address: "Lisandro de la Torre & Moreno, Caseros", postalCode: "1678" },
    { name: "Plaza Mitre", address: "Tres de Febrero & Alberdi, Caseros", postalCode: "1678" },
    { name: "Plaza del Pueblo", address: "Av. Libertador & Güemes, Caseros", postalCode: "1678" },

    // Santos Lugares
    { name: "Plaza de los Artilleros", address: "Rodríguez Peña & Alianza, Santos Lugares", postalCode: "1676" },
    { name: "Plaza Giorello", address: "Av. La Plata & Av. Rodríguez Peña, Santos Lugares", postalCode: "1676" },
    { name: "Plaza San Martín", address: "Gral. Paz & San Martín, Santos Lugares", postalCode: "1676" },
    { name: "Plaza Troilo", address: "Freyre & Ocampo, Santos Lugares", postalCode: "1676" },

    // Martín Coronado
    { name: "Plaza Giorello", address: "Marconi & Sgto. Cabral, Martín Coronado", postalCode: "1682" },
    { name: "Plaza Villa Herminia", address: "Pueyrredón & Vélez Sarsfield, Martín Coronado", postalCode: "1682" },
    { name: "Plaza Alem", address: "J. A. Roca & Alem, Martín Coronado", postalCode: "1682" },
    { name: "Plaza Libertad", address: "Libertad & Corrientes, Martín Coronado", postalCode: "1682" },

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

    // Sáenz Peña
    { name: "Plaza Altube", address: "Alfredo Bufano & G. Payró, Sáenz Peña", postalCode: "1674" },
    { name: "Plaza Emilio Mitre", address: "Juan B. Justo & Av. América, Sáenz Peña", postalCode: "1674" },
    { name: "Plaza América", address: "Av. América & De La Victoria, Sáenz Peña", postalCode: "1674" },
    { name: "Plaza Sáenz Peña", address: "Int. Al vear & Sáenz Peña, Sáenz Peña", postalCode: "1674" },
];

function validateForm() {
    const locationField = document.getElementById("inputLocation");
    const typeField = document.getElementById("inputType");

    // Validar el primer campo: Localidad/Código Postal
    if (locationField.value.trim() === "") {
        locationField.setCustomValidity("Introduce tu localidad o código postal para buscar puntos cercanos.");
        locationField.reportValidity();
        return false;
    } else {
        locationField.setCustomValidity("");
    }

    // Validar Tipo de Kéfir
    if (typeField.value === "") {
        typeField.setCustomValidity("Debes elegir un tipo de kéfir.");
        typeField.reportValidity();
        return false;
    } else {
        typeField.setCustomValidity("");
    }

    searchLocations();
    return false;
}

function searchLocations() {
    const locationField = document.getElementById("inputLocation").value.trim().toLowerCase();
    const locationsUl = document.getElementById("locationsUl");
    const locationList = document.getElementById("locationList");

    locationsUl.innerHTML = "";

    // Filtrar lugares por localidad, dirección o código postal
    const filteredLocations = locations.filter(location => {
        const locationName = location.name.toLowerCase();
        const locationAddress = location.address.toLowerCase();
        const locationPostalCode = location.postalCode.toLowerCase();

        // Búsqueda insensible a mayúsculas/minúsculas
        const nameMatch = locationName.includes(locationField);
        const addressMatch = locationAddress.includes(locationField);
        const postalCodeMatch = locationPostalCode.includes(locationField);

        return nameMatch || addressMatch || postalCodeMatch;
    });

    if (filteredLocations.length > 0) {
        filteredLocations.forEach(location => {
            const li = document.createElement("li");
            li.classList.add("list-group-item");
            li.textContent = `${location.name} - ${location.address} (Código Postal: ${location.postalCode})`;
            locationsUl.appendChild(li);
        });
        locationList.style.display = "block";
    } else {
        locationList.style.display = "none";
        alert("No se encontraron puntos cercanos.");
    }
}