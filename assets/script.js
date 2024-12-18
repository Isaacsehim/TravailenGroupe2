// il faut faire un fetch pour récupérer les données du fichier data.json
fetch('data.json')
  // on a un objet response qui contient les données de la requête
  .then(response => response.json())
  // on a un objet data qui contient les données du fichier data.json
  .then(data => {
    console.log(data) // nous affichons les données dans la console pour vérifier que tout est ok et pour verifier le contenu du tableau data
    // nous allons maintenant boucler sur les données pour les afficher dans le DOM
    for (item of data) { // data est un tableau d'objets, nous allons boucler sur ce tableau pour afficher chaque objet à l'aide de la syntaxe ${}
      // item étant un objet, nous pouvons accéder à ses propriétés en utilisant la syntaxe item.name, item.description, item.image
      document.querySelector('#pills-all').innerHTML += 
      `<img src="${place.image}" alt="${place.name}" class="image-lieu">
      <div class="contenu-lieu">
          <h2 class="titre-lieu">${place.name}</h2>
          <button class="bouton-informations" data-bs-toggle="modal" data-bs-target="#modal-${place.name.replace(/\s+/g, '-').toLowerCase()}">Afficher les informations</button>
          <p class="description-lieu">${place.description}</p>
          <p class="adresse-lieu"><i class="fa-solid fa-location-dot"></i> ${place.address}</p>
      </div>`;
      
    }

  })
  .catch(error => console.error(error)); // en cas d'erreur, nous affichons un message d'erreur dans la console.


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
                            <img src="${place.image}" class="img-cover">
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
                const allPlaces = data.reduce((acc, category) => acc.concat(category.places.map(place => ({ ...place, type: category.type }))), []);
                displayAllPlaces(allPlaces);
            });
            
            function displayAllPlaces(places) {
                const tabContent = document.querySelector('#pills-tabContent');
                tabContent.innerHTML = '';
                places.forEach(place => {
                    // Ajoutez ici le même code que dans displayPlaces pour créer des sections
                });
            }
            });

            // Afficher la catégorie par défaut au chargement
            displayPlaces(data, 'Restaurant');
        })
        .catch(error => console.error('Erreur de chargement du JSON:', error));
});