// Fonction pour afficher les lieux en fonction de la catégorie sélectionnée
function displayPlaces(data, type) {
    const tabContent = document.querySelector('#pills-tabContent');
    tabContent.innerHTML = '';

    let category = data.find(category => category.type === type);
    if (category) {
        category.places.forEach(place => {
            const section = document.createElement('section');
            section.classList.add('carte-lieu');

            section.innerHTML = `
                <img src="img/${type}/${place.image}" alt="${place.name}" class="image-lieu">
                <div class="contenu-lieu">
                    <h2 class="titre-lieu">${place.name}</h2>
                    <button class="bouton-informations" data-bs-toggle="modal" data-bs-target="#modal-${place.name.replace(/\s+/g, '-').toLowerCase()}">Afficher les informations</button>
                    <p class="description-lieu">${place.description}</p>
                    <p class="adresse-lieu"><i class="fa-solid fa-location-dot"></i> ${place.address}</p>
                </div>
            `;

            tabContent.appendChild(section);

            // Ajouter le modal pour chaque lieu
            const modal = document.createElement('div');
            modal.classList.add('modal', 'fade');
            modal.id = `modal-${place.name.replace(/\s+/g, '-').toLowerCase()}`;
            modal.tabIndex = -1;
            modal.setAttribute('aria-labelledby', 'exampleModalLabel');
            modal.setAttribute('aria-hidden', 'true');

            modal.innerHTML = `
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">${place.name}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <img src="img/${type}/${place.image}" class="img-cover">
                            <span><i class="fa-regular fa-message"></i> Description</span>
                            <p>${place.description}</p>
                            <span><i class="fa-solid fa-location-dot"></i> Localisation</span>
                            <p>${place.address}</p>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
        });
    }
}

// Écouteur d'événement pour DOMContentLoaded pour récupérer les données et configurer les boutons de navigation
document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('pills-resto-tab').addEventListener('click', () => {
                displayPlaces(data, 'Restaurant');
            });

            document.getElementById('pills-culture-tab').addEventListener('click', () => {
                displayPlaces(data, 'Lieux Culturels');
            });

            document.getElementById('pills-adresse-tab').addEventListener('click', () => {
                displayPlaces(data, 'Les Bonnes Adresses');
            });

            document.getElementById('pills-all-tab').addEventListener('click', () => {
                displayPlaces(data, 'Restaurant');
                displayPlaces(data, 'Lieux Culturels');
                displayPlaces(data, 'Les Bonnes Adresses');
            });

            document.getElementById('pills-all-types-tab').addEventListener('click', () => {
                data.forEach(category => {
                    displayPlaces(data, category.type);
                });
            });

            // Afficher la catégorie par défaut au chargement
            displayPlaces(data, 'Restaurant');
        })
        .catch(error => console.error('Erreur de chargement du JSON:', error));
});