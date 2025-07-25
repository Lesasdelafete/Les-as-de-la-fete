// === Panier : Ajouter un produit ===
function ajouterAuPanier(nom, prix) {
  const panier = JSON.parse(localStorage.getItem('panier')) || [];
  panier.push({ nom, prix });
  localStorage.setItem('panier', JSON.stringify(panier));
  alert(`${nom} ajouté au panier.`);
}

// === Panier : Afficher le contenu ===
function afficherPanier() {
  const panier = JSON.parse(localStorage.getItem('panier')) || [];
  const panierItem = document.getElementById('panier-items');
  const totalElement = document.getElementById('total-prix');

  if (!panierItem || !totalElement) return;

  panierItem.innerHTML = '';
  let total = 0;

  panier.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'panier-item';
    itemDiv.innerHTML = `
      <span>${item.nom} - ${item.prix}€</span>
      <button class="btn-supprimer" onclick="supprimerItem(${index})">❌</button>
    `;
    panierItem.appendChild(itemDiv);
    total += item.prix;
  });

  totalElement.textContent = `Total : ${total.toFixed(2)}€`;
}

// === Panier : Supprimer un article ===
function supprimerItem(index) {
  const panier = JSON.parse(localStorage.getItem('panier')) || [];
  panier.splice(index, 1);
  localStorage.setItem('panier', JSON.stringify(panier));
  afficherPanier();
}

// === Panier : Vider complètement ===
function viderPanier() {
  localStorage.removeItem('panier');
  afficherPanier();
}

// === Initialisation après chargement DOM ===
document.addEventListener('DOMContentLoaded', () => {
  // === Menu burger ===
  const burgerBtn = document.getElementById('burger-btn');
  const navLinks = document.querySelector('.nav-links');
  if (burgerBtn && navLinks) {
    burgerBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  // === Catalogue : Chargement dynamique depuis Firestore ===
  const catalogueContainer = document.getElementById('catalogue');
  if (catalogueContainer && typeof db !== 'undefined') {
    db.collection("produits").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const produit = doc.data();
        const div = document.createElement("div");
        div.className = "produit";
        div.innerHTML = `
          <img src="${produit.imageUrl}" alt="${produit.nom}" />
          <h2>${produit.nom}</h2>
          <p>${produit.description}</p>
          <p><strong>${produit.prix}€</strong></p>
          <button onclick="ajouterAuPanier('${produit.nom}', ${produit.prix})">Ajouter</button>
        `;
        catalogueContainer.appendChild(div);
      });
    });
  }

  // === Panier : Affichage si la page panier est présente ===
  if (document.getElementById('panier-items')) {
    afficherPanier();
  }
});
